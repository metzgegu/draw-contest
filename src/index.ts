import { ApolloServer } from '@apollo/server';

import { expressMiddleware } from '@apollo/server/express4';

import cors from 'cors';
import http from 'http'

import { json } from 'body-parser';

import express from 'express';

import User from './user/schema'
import DrawingContest from './drawing-contest/schema'
import Vote from './vote/schema'
import Contest from './contest/schema'


// instance before passing the instance to `expressMiddleware`
const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: [...User, ...Contest, ...Vote, ...DrawingContest],
    resolvers: {
      Query: {
        user: (_, { id }) => {
          return { id, name: 'hello' }
        },
        contest: (_, { id }) => ({ id, name: 'Contest numero uno' }),
        vote: (_, { id }) => ({ id, userId: '1' }),
        drawingContest: (_, { id }) => ({ id, userId: '1', contestId: '2' }),
      }
    },
  });

  await server.start();

  app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server))
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000/`)
}

main()
