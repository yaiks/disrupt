import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { connectDb } from "./models";
import "./services/passport";

import authRoutes from "./routes/authRoutes";

// now we are passing the JWT to the client.
// read more about JWT and passport here https://www.sitepoint.com/spa-social-login-google-facebook/
// the client will pass the jwt in every request.
// we should handle the jwt verification in resolvers? Authorization matter.

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
