import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { connectDb } from "./models";

const app = express();
app.use(cors());

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: {
		models,
		me: models.users[1]
	}
});

server.applyMiddleware({ app, path: "/graphql" });

connectDb().then(async () => {
	app.listen(process.env.PORT, () => {
		console.log(
			`Apollo Server on http://localhost:${process.env.PORT}/graphql`
		);
	});
});
