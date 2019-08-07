import mongoose from "mongoose";

import User from "./user";
import Product from "./product";
import Comment from "./comment";

const connectDb = () => {
	if (process.env.TEST_DATABASE_URL) {
		return mongoose.connect(process.env.TEST_DATABASE_URL, {
			useNewUrlParser: true
		});
	}

	if (process.env.DATABASE_URL) {
		return mongoose.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true
		});
	}
};

const models = { User, Product, Comment };

export { connectDb };

export default models;
