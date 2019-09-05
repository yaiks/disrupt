import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Layout } from "../components";
import Google from "../static/google.svg";
import fetch from "unfetch";

const customStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: calc(100vh - 85px);
`;

const LoginWrapper = styled.div`
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: center;
`;

const LoginTitle = styled.h1`
	font-size: 2rem;
	color: #333;
	margin-bottom: 25px;
`;

const SocialAuthLink = styled.a`
	display: inline-flex;
	align-items: center;
	color: #fff;
	border-radius: 5px;
	width: 240px;
	height: 40px;
	line-height: 1.5;
	padding-left: 35px;
	cursor: pointer;
`;

const GoogleAuthLink = styled(SocialAuthLink)`
	background: #d50f25;
	margin-bottom: 10px;
`;

const GoogleSVG = styled(Google)`
	width: 20px;
	height: 20px;
	margin-right: 15px;
`;

export default () => (
	<Layout customStyles={customStyles}>
		<LoginWrapper>
			<LoginTitle>Faça o login</LoginTitle>
			<GoogleAuthLink href='/auth/google'>
				<GoogleSVG />
				<p style={{ fontWeight: 500, fontSize: "0.9rem" }}>Login com Google</p>
			</GoogleAuthLink>
		</LoginWrapper>
	</Layout>
);
