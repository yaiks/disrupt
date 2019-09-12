import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const FETCH_ME = gql`
	query fetchMe {
		me {
			id
			username
			email
			imageUrl
		}
	}
`;

const AuthContext = React.createContext();

function AuthProvider(props) {
	const { loading, error, data } = useQuery(FETCH_ME);
	let user = null;

	if (data) {
		user = data.me;
	}

	return <AuthContext.Provider value={{ ...user }} {...props} />;
}

function useAuth() {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider`);
	}
	return context;
}

export { AuthProvider, useAuth };
