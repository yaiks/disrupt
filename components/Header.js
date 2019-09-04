import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Container from "./Container";

const customStyle = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;

const Header = styled.header`
	background: #fff;
	border-bottom: 1px solid #e8e8e8;
	height: 66px;
	position: relative;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
`;

const LeftSection = styled.div`
	display: flex;
	flex-direction: row;
	min-width: 0;
	min-height: 0;
	max-width: 65%;
	overflow-y: auto;
	height: 100%;
`;

const RightSection = styled.div`
	display: flex;
	flex-direction: row;
	min-width: 0;
	min-height: 0;
	align-items: center;
	justify-content: flex-end;
	position: relative;
`;

const List = styled.ul`
	display: flex;
	flex-direction: row;
	min-width: 0;
	min-height: 0;
	align-items: center;
	list-style: none;
	height: 100%;
`;

const Item = styled.li`
	position: relative;
	white-space: nowrap;
	z-index: 1;
`;

const Anchor = styled.a`
	color: #999;
	font-size: 0.75rem;
	text-transform: uppercase;
	height: 2.625rem;
	line-height: 2.625rem;
	padding: 0 0.625rem;
	display: flex;
	text-decoration: none;
`;

const items = ["startup jobs", "recruit", "invest", "blog", "more"];

export default () => (
	<Header>
		<Container customStyle={customStyle}>
			<LeftSection>
				<a
					style={{ display: "flex", marginRight: "10px", alignItems: "center" }}
				>
					Logo
				</a>
				<nav>
					<List>
						{items.map((item, index) => (
							<Item key={index}>
								<Anchor>{item}</Anchor>
							</Item>
						))}
					</List>
				</nav>
			</LeftSection>
			<RightSection>
				<a href='/auth/google'>Login</a>
			</RightSection>
		</Container>
	</Header>
);

// criar o custom server com reverse proxy, só pra dev environment
// https://github.com/zeit/next.js/blob/master/examples/with-custom-reverse-proxy/server.js

// mudar o back pra passar o token por query string
// pegar a query no front, botar no localStorage e refresh to '/', tudo isso no componentDidMount (useEffect)
// https://hackernoon.com/m-e-r-n-stack-application-using-passport-for-authentication-920b1140a134
