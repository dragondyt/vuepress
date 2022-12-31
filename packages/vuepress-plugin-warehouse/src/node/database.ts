import type { Service } from './types.js'

export default class DatabaseInstance {
  private database: any
  constructor(database) {
    this.database = database
  }

  model<T extends Service>(modelName: string): T {
    return this.database.model(modelName)
  }
}
