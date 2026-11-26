/**
 * The child plugin rows of a Grokbot agent preset.
 *
 * Copied from the shipped `@deepseek-ai/dsh-web-app` standard preset
 * (`presets/standard.patch.yml`), keeping the full local coding toolset and
 * dropping Windows-only / UI-market rows. The persona row is the only row that
 * differs per bot: its `config.prefix` carries the bot's custom instructions.
 *
 * Plain objects only — no `!!js` expressions, so the definition is data the
 * preset registry can mount directly.
 */
import { neutralizeTemplate } from './util.js'

/**
 * Persona prefix: identity + custom instructions + bot-network guidance +
 * harness framing.
 *
 * @param {object} bot
 * @param {object[]} [allBots] every stored bot, so each persona knows which
 *   other local bots it can delegate to (their preset ids are the handles).
 */
export function buildPersonaPrefix(bot, allBots = []) {
  // Only user-controlled text is template-neutralized; the framing below keeps
  // the intentional {{model}} variable the standard preset interpolates.
  const label = bot.name
  const identity = neutralizeTemplate(
    `You are ${label}, a local AI bot created by the user and living inside their DSH Web GUI on this machine.`,
  )
  const guidance =
    neutralizeTemplate(bot.instructions).trim() ||
    'You are a friendly, curious local bot who enjoys helping the user with code and conversation.'
  const others = (Array.isArray(allBots) ? allBots : []).filter(
    (candidate) => candidate && candidate.id !== bot.id,
  )
  const network = []
  if (others.length > 0) {
    const directory = others
      .map((candidate) => `${candidate.name} -> agent_preset "grokbot-${candidate.id}"`)
      .join('\n')
    network.push(
      'You work alongside other local bots on this machine; each one is a full local agent with its own instructions and tools.',
      'To talk to another bot, call the `subagent` tool with that bot\'s `agent_preset` and a complete prompt. The other bot does not see this conversation, so include the goal, the relevant decisions, and exactly what you want back. It runs in the background and its completion notice returns its real answer to you.',
      'Bot directory (name -> preset):\n' + directory,
      'When a bot is doing part of the work, do not do its job yourself. Wait for its completion notice before telling the user it is done, and relay what it actually said.',
      'If you need to continue with a bot you already started, use its `agent_id` (the id returned by `subagent`) with `send_message` instead of starting over.',
      'Never invent another bot\'s reply. If the user must approve a plan or decision, ask the user in your reply and stop; after they answer, forward their decision to the responsible bot.',
      'The user may talk to any bot directly. Keep handoffs concise, explicit, and in character.',
    )
  }
  const framing =
    'You are a coding agent powered by the {{model}} model. When the user chats with you directly, use your local workspace tools as needed.'
  return [identity, guidance, ...network, framing].filter(Boolean).join('\n\n')
}

/** Plan-mode section text, copied verbatim from the shipped standard preset. */
const PLAN_MODE_SECTION = `You are in plan mode. Stay in plan mode until the user approves your plan through exit_plan_mode or switches the session mode. Imperative language to implement changes means plan the implementation, not execute it. A user's conversational agreement — including an answer confirming something you asked — approves nothing and does not end plan mode; fold the confirmed decision into the plan and submit it through exit_plan_mode.

Explore first. Use non-mutating reads, searches, static analysis, and checks to ground the plan in the actual repository. Do not edit or write files, change configuration, run formatters or code generation that rewrites tracked files, commit, or otherwise carry out the plan. Prefer existing functions and patterns over new machinery.

The tool catalog stays the same across modes for request-cache stability. These plan-mode rules override any later tool description or guidance that suggests using mutation tools; those tools remain listed to keep the tool catalog unchanged. Do not use todo_write to track this planning phase: it tracks implementation after an approved plan, while the plan itself belongs in exit_plan_mode.

Resolve discoverable facts by inspection. Use ask_user_question only for user-owned choices or material ambiguity that inspection cannot answer. Do not ask the user where code lives or how current behavior works when you can find out.

Make the plan decision-complete: state the goal and success criteria; group implementation changes by subsystem; identify public API, schema, and data-flow changes; cover edge cases, failure modes, tests, acceptance criteria, and explicit assumptions. Keep it concise enough to review but detailed enough that another engineer can implement it without making design decisions.

When ready, call exit_plan_mode with the complete plan markdown, starting with a # title. Make exit_plan_mode the only and final tool call in that assistant response: it presents the plan for approval, and implementation begins only in a later step after approval. Do not paste the final plan as a plain reply or ask "should I proceed?" through prose or ask_user_question. If review rejects it, incorporate the feedback and present again. If the review channel is unavailable or aborted, stay in plan mode and ask the user to switch modes manually; do not proceed with implementation.`

/**
 * Build the preset's child plugin rows for one bot.
 *
 * @param {object} bot normalized bot record
 * @returns {object[]} Cordis entry options accepted by the preset registry
 */
export function buildPresetPlugins(bot, allBots = []) {
  return [
    {
      id: 'persona',
      name: '@deepseek-ai/dsh-persona',
      config: { prefix: buildPersonaPrefix(bot, allBots) },
    },
    {
      id: 'agent-instructions',
      name: '@deepseek-ai/dsh-agent-instructions',
      config: { maxBytes: 65536 },
    },
    { id: 'time-context', name: '@deepseek-ai/dsh-time-context' },
    { id: 'tool-bash', name: '@deepseek-ai/dsh-tool-bash' },
    {
      id: 'tool-fs',
      name: '@deepseek-ai/dsh-tool-fs',
      config: { applyPatch: false },
    },
    {
      id: 'tool-fs-search',
      name: '@deepseek-ai/dsh-tool-fs-search',
      config: { sampleOverCapGlobResults: false },
    },
    { id: 'tool-jobs', name: '@deepseek-ai/dsh-tool-jobs' },
    { id: 'tool-schedule', name: '@deepseek-ai/dsh-tool-schedule' },
    { id: 'skill-filesystem', name: '@deepseek-ai/dsh-skill-filesystem' },
    { id: 'tool-skill', name: '@deepseek-ai/dsh-tool-skill' },
    { id: 'command-goal', name: '@deepseek-ai/dsh-command-goal' },
    { id: 'tool-goal', name: '@deepseek-ai/dsh-tool-goal' },
    {
      id: 'planning',
      name: 'cordis:group',
      group: true,
      isolate: { planMode: true },
      config: [
        {
          id: 'plan-mode',
          name: '@deepseek-ai/dsh-plan-mode',
          config: { section: PLAN_MODE_SECTION },
        },
      ],
    },
    {
      id: 'compaction',
      name: 'cordis:group',
      group: true,
      isolate: { compaction: true, toolResultPruner: true },
      config: [
        { id: 'compaction-basic', name: '@deepseek-ai/dsh-compaction-basic' },
        { id: 'command-compact', name: '@deepseek-ai/dsh-command-compact' },
        {
          id: 'tool-result-pruner',
          name: '@deepseek-ai/dsh-compaction-tool-result-pruner',
          config: { thresholdChars: 8192, headChars: 4096, tailChars: 1024 },
        },
      ],
    },
    {
      id: 'delegation',
      name: 'cordis:group',
      group: true,
      isolate: { workflowEngine: true },
      config: [
        { id: 'tool-subagent-control', name: '@deepseek-ai/dsh-tool-subagent-control' },
        {
          id: 'tool-subagent',
          name: '@deepseek-ai/dsh-tool-subagent',
          config: {
            provider: 'spawn',
            toolName: 'subagent',
            modelSelection: true,
            modelDiscovery: true,
            // Let a bot hand work to any other bot, with enough depth for the
            // coordinator -> planner -> builder -> checker -> publisher chain.
            ...(allBots.filter((candidate) => candidate && candidate.id !== bot.id).length
              ? {
                  allowedAgentPresets: allBots
                    .filter((candidate) => candidate && candidate.id !== bot.id)
                    .map((candidate) => presetIdFor(candidate.id)),
                  maxDepth: 8,
                }
              : {}),
          },
        },
        {
          id: 'tool-subagent-fork',
          name: '@deepseek-ai/dsh-tool-subagent',
          config: { provider: 'fork', toolName: 'subagent_fork' },
        },
        {
          id: 'workflow-ptc',
          name: '@deepseek-ai/dsh-workflow-ptc',
          config: { provider: 'spawn' },
        },
        { id: 'tool-workflow', name: '@deepseek-ai/dsh-tool-workflow' },
      ],
    },
    { id: 'tool-ask-user', name: '@deepseek-ai/dsh-tool-ask-user' },
    {
      id: 'tool-todo',
      name: '@deepseek-ai/dsh-tool-todo',
      config: { allowParallelInProgress: true },
    },
    {
      id: 'tool-web',
      name: '@deepseek-ai/dsh-tool-web',
      config: { fetch: true, searchTimeoutMs: 60000 },
    },
    { id: 'present', name: '@deepseek-ai/dsh-tool-present' },
    // Bots do not manage the plugin profile; keep the row inert rather than
    // letting a chat session rewrite the user's installs.
    {
      id: 'tool-plugin-manager',
      name: '@deepseek-ai/dsh-plugin-manager/tools',
      disabled: true,
    },
  ]
}

/**
 * Build one complete preset definition for a bot.
 *
 * @param {object} bot normalized bot record
 * @param {number} [order] display order in the preset picker
 * @returns {{id: string, name: string, description: string, order: number, plugins: object[]}}
 */
export function buildPresetDefinition(bot, order = 100, allBots = []) {
  return {
    id: `grokbot-${bot.id}`,
    name: bot.name,
    description: bot.tagline || `Chat with ${bot.name}, a local Grokbot.`,
    order,
    plugins: buildPresetPlugins(bot, allBots),
  }
}

/** Preset id for one bot id. */
export function presetIdFor(botId) {
  return `grokbot-${botId}`
}
