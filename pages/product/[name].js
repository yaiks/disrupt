import React from "react";
import { useRouter } from "next/router";
import Container from "../../components/Container";

export default function Product() {
	const router = useRouter();

	return (
		<Container>
			<h1>{router.query.name}</h1>
			<p>The product's page!</p>
		</Container>
	);
}
