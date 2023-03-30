import user, { type UserAttributes } from './database/models/user'
import contest from './database/models/contest'
import { type JwtPayload } from 'jsonwebtoken'
import { getTokenPayload } from './domains/user/auth'
import { type ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4'
import drawingParticipation from './database/models/drawingparticipation'

export interface Context {
  database: {
    user: typeof user
    contest: typeof contest
    drawingParticipation: typeof drawingParticipation
  }
  currentUser: UserAttributes | undefined
}

export const getUserFromJwt = async (
  token: string
): Promise<UserAttributes | undefined> => {
  try {
    const userId = (getTokenPayload(token) as JwtPayload).userId as string

    return (
      await user.findOne({
        where: {
          id: userId,
        },
      })
    )?.toJSON()
  } catch {
    return undefined
  }
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
