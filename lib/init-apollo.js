import ApolloClient, { InMemoryCache } from "apollo-boost";
import fetch from "unfetch";

let apolloClient = null;

function getTokenFromBrowser() {
	return document && document.cookie;
}
function getTokenFromServer(headers) {
	return headers.cookie;
}

function create(initialState, headers) {
	const isBrowser = typeof window !== "undefined";

	return new ApolloClient({
		uri: process.env.API_URL,
		credentials: "include",
		request: async operation => {
			let token = process.browser
				? getTokenFromBrowser()
				: getTokenFromServer(headers);
			operation.setContext({
				headers: {
					cookies: token
				}
			});
		},
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
