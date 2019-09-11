import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { Layout } from "../../components";

const FETCH_ME = gql`
	query fetchMe {
		me {
			id
			username
		}
	}
`;

export default function Product() {
	const router = useRouter();
	const { loading, error, data } = useQuery(FETCH_ME);

	if (loading) console.log("loading", loading);
	if (error) console.log("error", error);
	if (data) console.log("data", data);

	return (
		<Layout>
			<h1>{router.query.name}</h1>
			<p>The product's page!</p>
		</Layout>
	);
}
