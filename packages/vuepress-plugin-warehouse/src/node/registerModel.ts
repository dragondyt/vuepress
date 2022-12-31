import * as models from './model/index.js'

export const registerModel = (ctx: { database: any; config: any }): void => {
  for (const key of Object.keys(models)) {
    ctx.database.model(key, models[key](ctx))
  }
}
