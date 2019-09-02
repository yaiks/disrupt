/** @jsx jsx */
import React from "react";
import Head from "next/head";
import { jsx, css, Global } from "@emotion/core";
import { Header, Content } from "../components";

const globalStyles = css`
	html,
	body {
		background: #f3f3f3;
		min-height: 100%;
		font-family: Helvetica, Arial, sans-serif;
		font-size: 16px;
	}
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`;

export default () => {
	return (
		<React.Fragment>
			<Head>
				<title>Disrupt - Descubra novos produtos e serviços</title>
			</Head>
			<Global styles={globalStyles} />
			<div
				css={css`
					width: 100%;
					height: 100%;
				`}
			>
				<Header></Header>
				<Content></Content>
			</div>
		</React.Fragment>
	);
};
