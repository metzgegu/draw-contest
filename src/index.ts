import { ApolloServer } from '@apollo/server'

import { expressMiddleware } from '@apollo/server/express4'

import cors from 'cors'
import http from 'http'

import { json } from 'body-parser'

import express from 'express'

import User from './user/schema'
import UserDB, { UserAttributes } from './database/models/user'
import DrawingContest from './drawing-contest/schema'
import Vote from './vote/schema'
import Contest from './contest/schema'
import { createToken, getEncryptedPassword, isPasswordValid } from './user/auth'

// instance before passing the instance to `expressMiddleware`
const main = async (): Promise<void> => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs: [...User, ...Contest, ...Vote, ...DrawingContest],
    resolvers: {
      Query: {
        user: async (_, { id }: { id: string }) => {
          return await UserDB.findOne({
            where: {
              id,
            },
          })
        },
        contest: (_, { id }: { id: string }) => ({
          id,
          name: 'Contest numero uno',
        }),
        vote: (_, { id }: { id: string }) => ({ id, userId: '1' }),
        drawingContest: (_, { id }: { id: string }) => ({
          id,
          userId: '1',
          contestId: '2',
        }),
      },
      Mutation: {
        signup: async (_, user: UserAttributes) => {
          const newUser = await UserDB.create({
            ...user,
            password: await getEncryptedPassword(user.password),
          })

          const token = createToken(newUser.id!)

          return {
            token,
            user: newUser,
          }
        },
        login: async (
          _,
          { email, password }: { email: string; password: string }
        ) => {
          const user = await UserDB.findOne({ where: { email } })

          if (!user) {
            throw new Error('No such user found')
          }

          const valid = await isPasswordValid(password, user.password)
          if (!valid) {
            throw new Error('Invalid password')
          }

          const token = createToken(user.id!)

          return {
            token,
            user,
          }
        },
      },
    },
  })

  await server.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  )
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3000 }, resolve)
  )
  console.log('🚀 Server ready at http://localhost:3000/')
}

main().catch((error) => {
  console.log('Crash', error)
})
