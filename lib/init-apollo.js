import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

const getTokenFromBrowser = () => document && document.cookie;
const getTokenFromServer = headers => headers.cookie;

function create(initialState, headers) {
	const isBrowser = typeof window !== "undefined";

	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors)
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
				)
			);
		if (networkError) console.log(`[Network error]: ${networkError}`);
	});

	const httpLink = createHttpLink({
		uri: process.env.API_URL,
		credentials: "include",
		fetch: !isBrowser && fetch
	});

	const link = ApolloLink.from([errorLink, httpLink]);

	const request = async operation => {
		let token = process.browser
			? getTokenFromBrowser()
			: getTokenFromServer(headers);

		operation.setContext({
			headers: {
				cookies: token
			}
		});
	};

	const cache = new InMemoryCache().restore(initialState || {});

	return new ApolloClient({
		link,
		request,
		cache
	});
}

export default function initApollo(initialState, headers) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (typeof window === "undefined") {
		console.log("called create on server");
		return create(initialState, headers);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		console.log("called create on client");
		apolloClient = create(initialState, headers);
	}

	return apolloClient;
}
