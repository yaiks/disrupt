import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		comments: [Comment]
	}

	extend type Mutation {
		createComment(text: String, productId: ID): Comment!
	}

	type Comment {
		text: String
		product: Product
	}
`;
