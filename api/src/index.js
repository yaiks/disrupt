import express from "express";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";

const app = express();
app.use(cors());

const typeDefs = gql`
	type Query {
		me: User
		user(id: ID!): User
		users: [User!]
		product(id: ID!): Product
		products: [Product!]
	}

	type User {
		id: ID!
		username: String!
		products: [Product!]
	}

	type Product {
		name: String!
		catchline: String!
		description: String!
		user: User!
	}
`;

const users = {
	1: {
		id: "1",
		name: "Ricardo",
		lastName: "Han"
	},
	2: {
		id: "2",
		name: "Stella",
		lastName: "Kim"
	}
};

const products = {
	1: {
		name: "quinto andar",
		catchline: "supercool 1",
		description: "descrição 1",
		userId: "1"
	},
	2: {
		name: "conta azul",
		catchline: "supercool 2",
		description: "descrição 2",
		userId: "1"
	},
	3: {
		name: "produto da stella",
		catchline: "stella is cool",
		description: "stella description",
		userId: "2"
	}
};

const resolvers = {
	Query: {
		me: () => {
			return users[1];
		},
		user: (parent, { id }) => {
			return users[id];
		},
		users: () => {
			return Object.values(users);
		},
		product: (parent, { id }) => {
			return products[id];
		},
		products: () => {
			return Object.values(products);
		}
	},
	User: {
		username: parent => {
			return `${parent.name} ${parent.lastName}`;
		},
		products: parent => {
			return Object.values(products).filter(
				product => product.userId === parent.id
			);
		}
	},
	Product: {
		user: parent => {
			return users[parent.userId];
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
	console.log("Apollo Server on http://localhost:8000/graphql");
});
