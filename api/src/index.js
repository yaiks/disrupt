import "dotenv/config";
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
	context: async () => ({
		models,
		me: await models.User.findByLogin("ricardohan")
	})
});

server.applyMiddleware({ app, path: "/graphql" });

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
	if (eraseDatabaseOnSync) {
		await Promise.all([
			models.User.deleteMany({}),
			models.Product.deleteMany({})
		]);

		seedDatabase();
	}

	app.listen(process.env.PORT, () => {
		console.log(
			`Apollo Server on http://localhost:${process.env.PORT}/graphql`
		);
	});
});

const seedDatabase = async () => {
	const user1 = new models.User({
		username: "ricardohan"
	});

	await user1.save();
};
