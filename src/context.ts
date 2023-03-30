import user, { type UserAttributes } from './database/models/user'
import contest from './database/models/contest'
import { type ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4'
import drawingParticipation from './database/models/drawingparticipation'
import { getUserFromJwt } from './domains/user/auth'

export interface Context {
  database: {
    user: typeof user
    contest: typeof contest
    drawingParticipation: typeof drawingParticipation
  }
  currentUser: UserAttributes | undefined
}

// eslint-disable-next-line @typescript-eslint/require-await
export const createContext = async ({
  req,
}: ExpressContextFunctionArgument): Promise<Context> => ({
  database: {
    user,
    contest,
    drawingParticipation,
  },
  currentUser: await getUserFromJwt(req.headers.authorization as string),
})
