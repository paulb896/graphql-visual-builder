import { ApolloServer, makeExecutableSchema, addMockFunctionsToSchema } from 'apollo-server-koa';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import { koa as voyagerMiddleware } from 'graphql-voyager/middleware';
import * as bodyParser from 'koa-bodyparser';

const PORT = process.env.SERVER_PORT || 5000;
const VOYAGER_PATH = '/voyager'

const typeDefs = `
  type User {
    name: String
    person: Person
  }
  type Person {
    name: String
    isOnline: Boolean
  }
  type Query {
    users: [User]
    dependenciesAlive: Boolean
  }
`;

const resolvers = {
  Query: {
    dependenciesAlive: () => true
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
    requireResolversForAllFields: false,
    allowResolversNotInSchema: true
  }
});
addMockFunctionsToSchema({ schema, preserveResolvers: true });

const server = new ApolloServer({
  schema
});
const app = new Koa();

app.use(bodyParser({enableTypes: ['text', 'json', 'form']}));
server.applyMiddleware({ app });

// Configure Graph Visualization Routes.
const router = new KoaRouter();
router.all(VOYAGER_PATH, voyagerMiddleware({
  endpointUrl: '/graphql'
}));
app.use(router.routes());
app.use(router.allowedMethods());

// Start Koa Server with Apollo GraphQL middleware.
app.listen({ port: PORT }, () =>
  {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`GraphQL Schema Explorer ready at http://localhost:${PORT}${VOYAGER_PATH}`);
  }
);