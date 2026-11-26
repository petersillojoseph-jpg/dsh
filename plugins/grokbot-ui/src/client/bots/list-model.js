/** Pure list helpers shared by the sidebar and its lightweight Node tests. */
export function filterSessions(sessions, query = '') {
  const needle = String(query).trim().toLowerCase()
  const visible = (Array.isArray(sessions) ? sessions : []).filter((session) => session && !session.blank)
  if (!needle) return visible
  return visible.filter((session) =>
    `${session.title || ''} ${session.displayTitle || ''} ${session.workspaceName || ''} ${session.agentPreset || ''}`
      .toLowerCase().includes(needle),
  )
}

export function filterBots(bots, query = '') {
  const needle = String(query).trim().toLowerCase()
  const visible = Array.isArray(bots) ? bots : []
  if (!needle) return visible
  return visible.filter((bot) => `${bot.name || ''} ${bot.tagline || ''}`.toLowerCase().includes(needle))
}

export function filterRooms(rooms, query = '') {
  const needle = String(query).trim().toLowerCase()
  const visible = Array.isArray(rooms) ? rooms : []
  if (!needle) return visible
  return visible.filter((room) => String(room.name || '').toLowerCase().includes(needle))
}

export function isActiveTab(activeTab, candidate) {
  return activeTab === candidate
}

export function conversationCountLabel(count, searching = false) {
  return `${count} ${count === 1 ? 'conversation' : 'conversations'}${searching ? ' found' : ''}`
}
