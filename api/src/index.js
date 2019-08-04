import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const app = express();

const typeDefs = gql`
	type Query {
		me: User
	}

	type User {
		username: String!
	}
`;

const resolvers = {
	Query: {
		me: () => ({
			username: "Ricardo Han"
		})
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
	console.log("Apollo Server on http://localhost:8000/graphql");
});
