import 'reflect-metadata';

import { Application } from 'express';
import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { InvestmentResolver } from '@resolvers/investment.resolver';

export async function init(app: Application): Promise<ApolloServer | null> {
  const schema = await buildSchema({
    resolvers: [InvestmentResolver],
    container: Container,
    emitSchemaFile: true,
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  apolloServer.applyMiddleware({ app });

  return apolloServer;
}
