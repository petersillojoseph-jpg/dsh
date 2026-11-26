/**
 * Small pure helpers shared by the Grokbot host half: text sanitizing, slugs,
 * logger facade, and safe package loading for DSH's own packages.
 *
 * This file has no side effects so it can be unit-tested with plain node.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

/** Control characters stripped from every user-supplied string (tab/LF keep). */
const CONTROL_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g

/**
 * Sanitize one user-supplied string: strip control characters, trim, cap.
 * @param {unknown} value raw value from JSON
 * @param {number} max maximum length in UTF-16 code units
 * @returns {string}
 */
export function cleanText(value, max) {
  if (typeof value !== 'string') return ''
  const text = value.replace(CONTROL_RE, '').trim()
  return text.length > max ? text.slice(0, max) : text
}

/**
 * Sanitize one user-supplied glyph cluster: strips control chars/whitespace and
 * keeps at most a few code points so an emoji stays a single visible glyph.
 * @param {unknown} value raw value from JSON
 * @param {number} [maxCodePoints] maximum number of Unicode code points
 * @returns {string}
 */
export function cleanGlyph(value, maxCodePoints = 4) {
  if (typeof value !== 'string') return ''
  const glyphs = Array.from(value.replace(CONTROL_RE, '').replace(/\s+/g, ' ').trim())
  return glyphs.slice(0, maxCodePoints).join('')
}

/**
 * Collapse a string to one trimmed line.
 * @param {string} value
 * @returns {string}
 */
export function oneLine(value) {
  return value.replace(/\s+/g, ' ').trim()
}

/**
 * Turn a display name into a filesystem/preset-safe slug.
 * @param {unknown} value raw value
 * @param {number} [max] maximum slug length
 * @returns {string} lowercase `[a-z0-9-]` slug, possibly empty
 */
export function slugify(value, max = 32) {
  if (typeof value !== 'string') return ''
  const slug = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug.slice(0, max).replace(/-+$/g, '')
}

/**
 * Neutralize persona template syntax so bot instructions containing `{{...}}`
 * cannot make the prompt registry's strict interpolation throw.
 * @param {string} text
 * @returns {string}
 */
export function neutralizeTemplate(text) {
  return text.replace(/\{\{/g, '{ {').replace(/\}\}/g, '} }')
}

/**
 * Escape a literal for use inside a regular expression.
 * @param {string} text
 * @returns {string}
 */
export function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Resolve a per-fiber logger, tolerating a missing or unusual logger shape.
 * @param {any} ctx cordis context
 * @returns {{info: Function, warn: Function, error: Function}}
 */
export function createLogger(ctx) {
  let logger = null
  try {
    logger = typeof ctx?.logger === 'function' ? ctx.logger('grokbot-ui') : ctx?.logger
  } catch {
    logger = null
  }
  if (!logger || typeof logger.info !== 'function') logger = ctx?.logger
  const call = (level) => (...args) => {
    try {
      logger?.[level]?.(...args)
    } catch {
      /* logging must never take the host down */
    }
  }
  return { info: call('info'), warn: call('warn'), error: call('error') }
}

/**
 * Read the `main` entry of a package directory.
 * @param {string} dir package directory
 * @returns {string} absolute entry path
 */
function packageEntry(dir) {
  let main = 'lib/index.js'
  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
    if (typeof manifest.main === 'string' && manifest.main.length > 0) main = manifest.main
  } catch {
    /* keep the conventional DSH entry */
  }
  return path.join(dir, main)
}

/**
 * Candidate `package.json` paths for a DSH package, derived only from trusted
 * runtime locations (this module, cwd, the node binary, ctx.baseUrl).
 * @param {string} name package name
 * @param {any} ctx cordis context
 * @returns {string[]}
 */
export function candidateManifests(name, ctx) {
  const starts = []
  try {
    if (process.argv[1]) starts.push(path.dirname(fs.realpathSync(process.argv[1])))
  } catch {
    /* argv is advisory */
  }
  starts.push(path.dirname(process.execPath))
  starts.push(process.cwd())
  try {
    if (process.argv[1]) starts.push(path.dirname(process.argv[1]))
  } catch {
    /* ignore */
  }
  try {
    const base = ctx?.baseUrl ?? ctx?.loader?.baseUrl
    if (typeof base === 'string' && base.startsWith('file:')) {
      starts.push(path.dirname(new URL(base).pathname))
    }
  } catch {
    /* baseUrl is advisory */
  }

  const out = []
  const seen = new Set()
  const add = (candidate) => {
    if (!candidate || seen.has(candidate)) return
    seen.add(candidate)
    out.push(candidate)
  }
  const nodeModules = path.join('node_modules', name, 'package.json')

  for (const start of starts) {
    let dir = path.resolve(start)
    for (let depth = 0; depth < 48; depth += 1) {
      add(path.join(dir, nodeModules))
      // A package may vendor its dependencies below its own node_modules.
      add(path.join(dir, 'node_modules', '@deepseek-ai', 'dsh', nodeModules))
      const parent = path.dirname(dir)
      if (parent === dir) break
      dir = parent
    }
  }
  // Node's global install layout: <prefix>/bin/node -> <prefix>/lib/node_modules/<name>.
  // The DSH install keeps its dependency tree nested under @deepseek-ai/dsh.
  const prefix = path.resolve(path.dirname(process.execPath), '..')
  const globalModules = path.join(prefix, 'lib', 'node_modules')
  add(path.join(globalModules, name, 'package.json'))
  add(path.join(globalModules, '@deepseek-ai', 'dsh', 'node_modules', name, 'package.json'))
  add(path.join(globalModules, '@deepseek-ai', 'dsh', 'node_modules', '@deepseek-ai', 'dsh', 'node_modules', name, 'package.json'))
  for (const entry of String(process.env.NODE_PATH ?? '').split(path.delimiter)) {
    if (entry.trim()) add(path.join(entry.trim(), name, 'package.json'))
  }
  return out
}

/** Cache of package-name -> module namespace (or null when unreachable). */
const moduleCache = new Map()

/**
 * Import one DSH package by name from host code.
 *
 * Host code of a bundle installed outside the DSH install tree cannot see
 * `@deepseek-ai/*` through Node's default resolution, so this tries (1) the
 * normal specifier, (2) the host's `pluginPackages` resolver, (3) trusted
 * absolute locations derived from the running process.
 *
 * @param {string} name package name
 * @param {any} ctx cordis context
 * @returns {Promise<object|null>} module namespace, or null when not found
 */
export async function importDshPackage(name, ctx) {
  if (moduleCache.has(name)) return moduleCache.get(name)
  const fail = () => {
    moduleCache.set(name, null)
    return null
  }

  try {
    const mod = await import(name)
    moduleCache.set(name, mod)
    return mod
  } catch {
    /* fall through to explicit resolution */
  }

  try {
    const packages = typeof ctx?.get === 'function' ? ctx.get('pluginPackages') : undefined
    const base = String(ctx?.baseUrl ?? ctx?.loader?.baseUrl ?? import.meta.url)
    const pkg = packages?.packageOf?.(name, base)
    if (pkg?.dir) {
      const mod = await import(pathToFileURL(packageEntry(pkg.dir)).href)
      moduleCache.set(name, mod)
      return mod
    }
  } catch {
    /* fall through */
  }

  for (const manifest of candidateManifests(name, ctx)) {
    try {
      if (!fs.existsSync(manifest)) continue
      const mod = await import(pathToFileURL(packageEntry(path.dirname(manifest))).href)
      moduleCache.set(name, mod)
      return mod
    } catch {
      /* try the next candidate */
    }
  }
  return fail()
}
