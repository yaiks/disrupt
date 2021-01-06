import React from "react";
import Head from "next/head";
import { css, Global } from "@emotion/core";

export default () => (
	<React.Fragment>
		<Head>
			<title>Disrupt - Descubra novos produtos e serviços</title>
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta charSet='utf-8' />
		</Head>
		<Global
			styles={css`
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
			`}
		/>
	</React.Fragment>
);
