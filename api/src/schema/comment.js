import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		comments(productId: ID!): [Comment!]
	}

	extend type Mutation {
		createComment(productId: ID!, text: String!): Comment!
	}

	type Comment {
		text: String
		userId: ID
		productId: ID
	}
`;
