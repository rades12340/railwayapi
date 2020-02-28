import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { createConnection } from "typeorm";

const startServer = async () => {
    try {
        const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }: any) => ({ req, res }) });

        await createConnection();

        const app = express();
        server.applyMiddleware({ app });

        app.listen({ port: 4000 }, () =>
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
        );
    } catch (err) {
        console.log(err)
    }

}

startServer()