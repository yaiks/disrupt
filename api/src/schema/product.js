import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		product(id: ID!): Product
		products: [Product!]
	}

	input ProductInput {
		name: String!
		catchline: String!
		description: String!
	}

	extend type Mutation {
		createProduct(input: ProductInput!): Product!
		deleteProduct(productId: ID!): Boolean!
		updateProduct(productId: ID!, input: ProductInput!): Product!
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
