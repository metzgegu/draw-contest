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
import DrawingParticipation from './database/models/drawingparticipation'
import { clientCloudFront } from './aws/clientS3'
import { CreateDistributionCommand, CreateDistributionCommandInput } from '@aws-sdk/client-cloudfront'

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

  app.use(cors());

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
    upload.single('image'),
    async function (req, res, next) {
      ;(res.locals.drawingParticipation as DrawingParticipation).update({
        s3link: (req.file as any as { location: string })?.location,
      })

      res.send('Successfully uploaded')
    }
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 8000 }, resolve)
  )

  console.log('🚀 Server ready at http://localhost:8000/')
}

main().catch((error) => {
  console.log('Crash', error)
})
