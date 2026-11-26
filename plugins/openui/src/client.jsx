import React from 'react'
import { OpenUIQuick } from '../../plugin/package/src/client/bots/OpenUI.jsx'
import styles from './style.css'
export const inject = ['slots']
export function apply(ctx) {
  ctx.slots.inject('conversation.input.right', () => ctx.slots.register(
    { name:'conversation.input.right', id:'dsh-openui-quick', order:80 },
    () => <><style>{styles}</style><OpenUIQuick /></>,
  ))
}
