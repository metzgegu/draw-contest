import user from './database/models/user'
import contest from './database/models/contest'

export interface Context {
  database: {
    user: typeof user
    contest: typeof contest
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const createContext = async (): Promise<Context> =>  ({
  database: {
    user,
    contest
  }
})
