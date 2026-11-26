/**
 * HTTP plumbing for the Grokbot API: JSON responses, capped request bodies,
 * method checks, and one error boundary so no route can crash the host.
 */
import { HttpError } from './error.js'

/** Request bodies larger than this are rejected (bytes). */
export const MAX_BODY_BYTES = 1024 * 1024

/**
 * Build a `Response` for GET/HEAD resource routes.
 * @param {unknown} value JSON-serializable payload
 * @param {number} [status]
 * @returns {Response}
 */
export function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  })
}

/**
 * Write one JSON response to a raw node response.
 * @param {import('node:http').ServerResponse} res
 * @param {number} status
 * @param {unknown} value
 */
export function sendJson(res, status, value) {
  let body
  try {
    body = JSON.stringify(value)
  } catch {
    status = 500
    body = JSON.stringify({ error: 'internal error: response was not serializable' })
  }
  if (res.writableEnded) return
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.setHeader('cache-control', 'no-store')
  res.setHeader('x-content-type-options', 'nosniff')
  res.setHeader('content-length', Buffer.byteLength(body))
  res.end(body)
}

/**
 * Answer one failure with `{ error }` and the right status. Unknown errors are
 * reported as 500 without leaking internals.
 * @param {import('node:http').ServerResponse} res
 * @param {unknown} error
 * @param {{warn?: Function}} [log]
 */
export function sendError(res, error, log) {
  const status =
    error instanceof HttpError
      ? error.status
      : Number.isInteger(error?.status) && error.status >= 400 && error.status < 600
        ? error.status
        : 500
  const message =
    status >= 500
      ? 'internal error'
      : typeof error?.message === 'string' && error.message
        ? error.message
        : 'request failed'
  if (status >= 500) log?.warn?.(error)
  sendJson(res, status, { error: message })
}

/**
 * Read and parse a JSON request body with a hard byte cap.
 * @param {import('node:http').IncomingMessage} req
 * @param {number} [limit]
 * @returns {Promise<object>} parsed JSON object (never null/array)
 */
export function readJsonBody(req, limit = MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    let oversized = false
    req.on('data', (chunk) => {
      if (oversized) return
      size += chunk.length
      if (size > limit) {
        oversized = true
        chunks.length = 0
        return
      }
      chunks.push(chunk)
    })
    req.on('error', (error) => reject(new HttpError(400, `could not read request body: ${error?.message ?? 'error'}`)))
    req.on('end', () => {
      if (oversized) {
        reject(new HttpError(413, `request body exceeds ${limit} bytes`))
        return
      }
      const raw = Buffer.concat(chunks).toString('utf8').trim()
      if (!raw) {
        resolve({})
        return
      }
      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch {
        reject(new HttpError(400, 'request body is not valid JSON'))
        return
      }
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
        reject(new HttpError(400, 'request body must be a JSON object'))
        return
      }
      resolve(parsed)
    })
  })
}

/**
 * Wrap a POST route body so the handler only deals with parsed input and a
 * return value; this wrapper owns method checks, the body, JSON output, and
 * the error boundary.
 *
 * @param {(body: object, req: import('node:http').IncomingMessage) => Promise<unknown>|unknown} handler
 * @param {{warn?: Function}} [log]
 * @returns {(req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => Promise<void>}
 */
export function postRoute(handler, log) {
  return async (req, res) => {
    try {
      if (req.method !== 'POST') {
        res.setHeader('allow', 'POST')
        throw new HttpError(405, 'method not allowed; use POST')
      }
      const body = await readJsonBody(req)
      const result = await handler(body, req)
      sendJson(res, 200, result ?? { ok: true })
    } catch (error) {
      sendError(res, error, log)
    }
  }
}
