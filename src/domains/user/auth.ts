import bcrypt from 'bcrypt'
import { type JwtPayload, sign, verify } from 'jsonwebtoken'

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

export function getTokenPayload(token: string): JwtPayload | string {
  return verify(token, APP_SECRET)
}

export function createToken(userId: string): string {
  return sign({ userId }, APP_SECRET)
}
