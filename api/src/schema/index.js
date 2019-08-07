import { gql } from "apollo-server-express";

import userSchema from "./user";
import productSchema from "./product";
import commentSchema from "./comment";

const linkSchema = gql`
	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;

export default [linkSchema, userSchema, productSchema, commentSchema];
