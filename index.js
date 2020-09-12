import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './src/schemas/GraphQL/schema.graphql';
import Query from './src/resolvers/Query';
import User from './src/resolvers/User';
import Article from './src/resolvers/Article';
import Vote from './src/resolvers/Vote';
import Comment from './src/resolvers/Comment';
import Mutation from './src/resolvers/Mutation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query,
    Article,
    Comment,
    User,
    Vote,
    Mutation,
  },
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

apolloServer.applyMiddleware({ app });
const httpPort = process.env.HTTP_PORT ?? 3000;
app.listen(httpPort, () =>
  console.log(`HTTP server running on port ${httpPort}`)
);
