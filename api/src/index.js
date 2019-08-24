import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { connectDb } from "./models";
// passport should come after models import
import "./services/passport";

import authRoutes from "./routes/authRoutes";

// need express session??
// authenticate graphql resolvers

const app = express();
app.use(cors());

authRoutes(app);

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
			models.Product.deleteMany({}),
			models.Comment.deleteMany({})
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
