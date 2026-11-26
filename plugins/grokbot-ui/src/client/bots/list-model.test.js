import test from 'node:test'
import assert from 'node:assert/strict'
import { conversationCountLabel, filterBots, filterRooms, filterSessions, isActiveTab } from './list-model.js'

test('session visible list excludes blanks and searches supported fields', () => {
  const sessions = [
    { id: 'a', title: 'Alpha', workspaceName: 'Studio', agentPreset: 'grokbot-a' },
    { id: 'b', title: 'Beta', workspaceName: 'Work', blank: true },
    { id: 'c', title: 'Gamma', workspaceName: 'Studio' },
  ]
  assert.deepEqual(filterSessions(sessions).map(({ id }) => id), ['a', 'c'])
  assert.deepEqual(filterSessions(sessions, ' GROKBOT-A ').map(({ id }) => id), ['a'])
  assert.deepEqual(filterSessions(sessions, 'studio').map(({ id }) => id), ['a', 'c'])
  assert.deepEqual(filterSessions(sessions, 'missing'), [])
})

test('visible bots and rooms are searched case-insensitively', () => {
  assert.deepEqual(filterBots([{ name: 'Willow', tagline: 'Research' }, { name: 'AJ' }], 'research').map((bot) => bot.name), ['Willow'])
  assert.deepEqual(filterRooms([{ name: 'Planning' }, { name: 'Lounge' }], 'LOUN').map((room) => room.name), ['Lounge'])
})

test('active tab state and visible conversation count are explicit', () => {
  assert.equal(isActiveTab('chats', 'chats'), true)
  assert.equal(isActiveTab('rooms', 'chats'), false)
  assert.equal(conversationCountLabel(1), '1 conversation')
  assert.equal(conversationCountLabel(3, true), '3 conversations found')
})
