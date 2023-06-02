import bcrypt from 'bcrypt'
import { type NextFunction, type Request, type Response } from 'express'
import { GraphQLError } from 'graphql'
import { type JwtPayload, sign, verify } from 'jsonwebtoken'
import { type Context } from '../../context'
import user, { type UserAttributes } from '../../database/models/user'
import drawingparticipation from '../../database/models/drawingparticipation'

const APP_SECRET = 'FOR-DEVELOPMENT-PURPOSE-ONLY'

const saltRounds = 10

export async function getEncryptedPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds)
}

export async function isPasswordValid(
  password: string,
  encryptedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword)
}

export function ensureUserLoggedIn(context: Context): void {
  if (!context.currentUser) {
    throw new GraphQLError('You are not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    })
  }
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

export const isAuthorizedToUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await getUserFromJwt(req.get('Authorization') as string)

  if (user === undefined || req.query?.contestId === undefined) {
    const err = new Error('Not authorized')
    next(err)
  } else {
    const drawingParticipation = await drawingparticipation.findOne({
      where: {
        userId: user?.id,
        contestId: (req.query as { contestId: string }).contestId,
      },
    })

    if (drawingParticipation === null) {
      const err = new Error('User is not registered to this contest')
      next(err)
    } else {
      res.locals.drawingParticipation = drawingParticipation
      next()
    }
  }
}

export function getTokenPayload(token: string): JwtPayload | string {
  const removedBearerToken = token.replace('Bearer ', '')

  return verify(removedBearerToken, APP_SECRET)
}

export function createToken(userId: number): string {
  return sign({ userId }, APP_SECRET)
}
