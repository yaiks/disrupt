import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import fetch from "unfetch";

let apolloClient = null;

const getTokenFromBrowser = () => document && document.cookie;
const getTokenFromServer = headers => headers.cookie;

function create(initialState, headers) {
	const isBrowser = typeof window !== "undefined";

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

	return new ApolloClient({
		uri: process.env.API_URL,
		credentials: "include",
		request,
		fetch: !isBrowser && fetch,
		cache: new InMemoryCache().restore(initialState || {})
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
