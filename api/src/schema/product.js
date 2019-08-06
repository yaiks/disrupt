import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		product(id: ID!): Product
		products: [Product!]
	}

	extend type Mutation {
		createProduct(
			name: String!
			catchline: String!
			description: String!
		): Product!
		deleteProduct(productId: ID!): Boolean!
		updateProduct(
			productId: ID!
			name: String!
			catchline: String!
			description: String!
		): Product!
	}

	type Product {
		productId: ID!
		name: String!
		catchline: String!
		description: String!
		user: User!
		comments: [Comment!]
	}
`;
