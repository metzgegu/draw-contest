import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from "@apollo/server/express4";

import cors from "cors";
import http from "http";

import { json } from "body-parser";

import express from "express";

import User from "./user/schema";
import UserDB from "./database/models/user";
import DrawingContest from "./drawing-contest/schema";
import Vote from "./vote/schema";
import Contest from "./contest/schema";

// instance before passing the instance to `expressMiddleware`
const main = async (): Promise<void> => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: [...User, ...Contest, ...Vote, ...DrawingContest],
    resolvers: {
      Query: {
        user: (_, { id }: { id: string }) => {
          return { id, name: "hello" };
        },
        contest: (_, { id }: { id: string }) => ({
          id,
          name: "Contest numero uno",
        }),
        vote: (_, { id }: { id: string }) => ({ id, userId: "1" }),
        drawingContest: (_, { id }: { id: string }) => ({
          id,
          userId: "1",
          contestId: "2",
        }),
      },
      Mutation: {
        createUser: async (_, { name }: { name: string }) => {
          return await UserDB.create({ name, email: "", password: "" });
        },
      },
    },
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3000 }, resolve)
  );
  console.log("🚀 Server ready at http://localhost:3000/");
};

main().catch((error) => {
  console.log("Crash", error);
});
