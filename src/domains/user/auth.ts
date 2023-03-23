import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'
import { type JwtPayload, sign, verify } from 'jsonwebtoken'
import { type Context } from '../../context'

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
  if (context.currentUser === null) {
    throw new GraphQLError('You are not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
}

export function getTokenPayload(token: string): JwtPayload | string {
  return verify(token, APP_SECRET)
}

export function createToken(userId: string): string {
  return sign({ userId }, APP_SECRET)
}
