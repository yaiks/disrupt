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
		createProduct(product: ProductInput!): Product!
		deleteProduct(productId: ID!): Boolean!
		updateProduct(productId: ID!, product: ProductInput!): Product!
	}

	type Product {
		id: ID!
		name: String!
		catchline: String!
		description: String!
		user: User!
		comments: [Comment]
	}
`;
