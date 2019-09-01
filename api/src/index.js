import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { ApolloServer, AuthenticationError } from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, { connectDb } from "./models";
import "./services/passport";

import authRoutes from "./routes/authRoutes";

// read more about JWT and passport here https://www.sitepoint.com/spa-social-login-google-facebook/
// AFTER: add nginx or express proxy to manage same client and server localhost PORT

const app = express();
app.use(cors());

authRoutes(app);

const getMe = async req => {
	const token = req.headers["x-token"];

	if (token) {
		try {
			return await jwt.verify(token, process.env.SECRET);
		} catch (error) {
			throw new AuthenticationError("Your session expired. Sign in again");
		}
	}
};

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: async ({ req }) => {
		const me = await getMe(req);

		return {
			models,
			me
		};
	}
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
