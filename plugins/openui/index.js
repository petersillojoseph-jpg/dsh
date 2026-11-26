import { openuiRoutes } from './src/openui.js'
export const inject = ['webServer', 'credentials']
export function apply(ctx) {
  ctx.effect(() => {
    const disposers = openuiRoutes(ctx, console).map(route => ctx.webServer.register(route))
    return async () => { for (const dispose of disposers) await dispose() }
  }, 'dsh-openui.routes')
}
