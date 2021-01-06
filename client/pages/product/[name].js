import React from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components";

export default function Product() {
	const router = useRouter();

	return (
		<Layout>
			<h1>{router.query.name}</h1>
			<p>The product's page!</p>
		</Layout>
	);
}
