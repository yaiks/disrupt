import React, { useEffect } from "react";
import Router from "next/router";
import { css } from "@emotion/core";
import { Content, Layout } from "../components";
import mq from "../utils/breakpoints";

const customStyles = css`
	margin-top: 20px;
	${mq[1]} {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 30px;
	}
`;

export default () => {
	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get("token");
		if (token) {
			window.localStorage.setItem("token", token);
			Router.push({
				pathname: "/"
			});
		}
	});

	return (
		<Layout customStyles={customStyles}>
			<Content></Content>
		</Layout>
	);
};
