import { type Context } from '../../context'
import {
  type UserAttributes,
  type UserInstance,
} from '../../database/models/user'
import { createToken, getEncryptedPassword, isPasswordValid } from './auth'

async function user(
  _: any,
  { id }: { id: string },
  context: Context
): Promise<UserInstance | null> {
  return await context.database.user.findOne({
    where: {
      id,
    },
  })
}

async function signup(
  _: any,
  user: UserAttributes,
  context: Context
): Promise<{ token: string; user: UserInstance }> {
  const newUser = await context.database.user.create({
    ...user,
    password: await getEncryptedPassword(user.password),
  })

  const token = createToken(newUser.id!)

  return {
    token,
    user: newUser,
  }
}

async function login(
  _: any,
  { email, password }: { email: string; password: string },
  context: Context
): Promise<{ token: string; user: UserInstance }> {
  const user = await context.database.user.findOne({ where: { email } })

  if (user === null) {
    throw new Error('No such user found')
  }

  console.log(await getEncryptedPassword(password))

  const valid = await isPasswordValid(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = createToken(user.id!)

  return {
    token,
    user,
  }
}

export const mutations = { signup, login }

export const queries = { user }
