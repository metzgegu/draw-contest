import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

import cors from 'cors'
import http from 'http'
import { json } from 'body-parser'
import express from 'express'

import { mutations, queries, typeDefs } from './domains'
import { Context, createContext } from './context'
import { isAuthorizedToUpload } from './domains/user/auth'
import { upload } from './aws/upload'

// instance before passing the instance to `expressMiddleware`
const main = async (): Promise<void> => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer<Context>({
    typeDefs: typeDefs,
    resolvers: {
      Query: queries,
      Mutation: mutations,
    },
  })

  await server.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, { context: createContext })
  )

  app.post(
    '/upload',
    isAuthorizedToUpload,
    upload.array('image'),
    function (req, res, next) {
      res.send('Successfully uploaded')
    }
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3000 }, resolve)
  )

  console.log('🚀 Server ready at http://localhost:3000/')
}

main().catch((error) => {
  console.log('Crash', error)
})
