import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import fetch from "unfetch";

let apolloClient = null;

function create(initialState, token) {
	const isBrowser = typeof window !== "undefined";

	return new ApolloClient({
		connectToDevTools: isBrowser,
		ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
		link: new HttpLink({
			uri: process.env.API_URL, // Server URL (must be absolute)
			headers: {
				"x-token": token
			}, // Additional fetch() options like `credentials` or `headers`
			// Use fetch() polyfill on the server
			fetch: !isBrowser && fetch
		}),
		cache: new InMemoryCache().restore(initialState || {})
	});
}

export default function initApollo(initialState) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (typeof window === "undefined") {
		return create(initialState);
	}

	const token = localStorage.getItem("token");

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(initialState, token);
	}

	return apolloClient;
}