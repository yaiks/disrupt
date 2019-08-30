import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Container from "./Container";

const customStyle = css`
	margin-top: 20px;
`;

const ContentBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	margin: 0 0 30px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

const Content = styled.div`
	background-color: #fff;
	position: relative;
	border-radius: 5px;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const ProductItem = styled.div`
	overflow: hidden;
	position: relative;
`;

const ProductLink = styled.a`
	border-bottom: 1px solid #e8e8e8;
	padding: 15px;
	display: flex;
	text-decoration: none;
	background-color: transparent;
`;

const ProductImage = styled.img`
	width: 80px;
	height: 80px;
	background: pink;
	margin-right: 15px;
	/* flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center; */
`;

const ProductContent = styled.div``;

const Title = styled.div`
	color: #6f6f6f;
	line-height: 32px;
	font-weight: 300;
	font-size: 20px;
`;

const Description = styled.div`
	line-height: 20px;
	font-size: 13px;
	font-weight: 400;
	display: flex;
	flex-grow: 1;
	align-items: center;
`;

const products = [
	{
		title: "Disrupt",
		description: "A better way to find new products",
		image: ""
	},
	{
		title: "Quinto Andar",
		description: "Buy your new apartment easily",
		image: ""
	},
	{
		title: "Conta Azul",
		description: "Manage your finance with ease",
		image: ""
	}
];

export default () => (
	<Container customStyle={customStyle}>
		<main>
			<div>
				<ContentBlock>
					<Header>
						<span
							style={{
								lineHeight: "32px",
								fontWeight: "600",
								fontSize: "20px"
							}}
						>
							Products
						</span>
						<span
							style={{
								lineHeight: "20px",
								fontWeight: "400",
								fontSize: "13px",
								marginLeft: "5px",
								marginTop: "3px"
							}}
						>
							{" "}
							powered by Disrupt
						</span>
					</Header>
					<Content>
						{products.map((product, index) => (
							<ProductItem key={index}>
								<ProductLink>
									<ProductImage image={product.image} />
									<ProductContent>
										<Title>{product.title}</Title>
										<Description>{product.description}</Description>
									</ProductContent>
								</ProductLink>
							</ProductItem>
						))}
					</Content>
				</ContentBlock>
			</div>
		</main>
	</Container>
);
