import React, { Fragment } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import Aside from "./Aside";
import mq from "../utils/breakpoints";

const Main = styled.main`
	${mq[1]} {
		flex: 1;
		min-width: 0;
	}
`;

const ContentBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	margin: 0 0 30px;
`;

const SectionHeader = styled.div`
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

const AnchorTag = styled.a`
	border-bottom: 1px solid #e8e8e8;
	padding: 20px 104px 20px 20px;
	display: flex;
	text-decoration: none;
	background-color: transparent;
	cursor: pointer;
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

const Name = styled.div`
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

const VoteButtonWrapper = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 20px;
`;

const VoteButton = styled.button`
	width: 64px;
	height: 74px;
	margin-left: 12px;
	padding: 0 8px;
	border-radius: 3px;
	border: 1px solid #e8e8e8;
	background: #fff;
`;

const products = [
	{
		name: "Disrupt",
		description: "A better way to find new products",
		image: ""
	},
	{
		name: "Quinto Andar",
		description: "Buy your new apartment easily",
		image: ""
	},
	{
		name: "Conta Azul",
		description: "Manage your finance with ease",
		image: ""
	}
];

const ProductLink = ({ children, name }) => (
	<Link href='/product/[name]' as={`/product/${name}`}>
		<AnchorTag>{children}</AnchorTag>
	</Link>
);

export default () => (
	<Fragment>
		<Main>
			<div>
				<ContentBlock>
					<SectionHeader>
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
					</SectionHeader>
					<Content>
						{products.map((product, index) => (
							<ProductItem key={index}>
								<ProductLink name={product.name}>
									<div style={{ marginRight: "10px", position: "relative" }}>
										<ProductImage image={product.image} />
									</div>
									<ProductContent>
										<Name>{product.name}</Name>
										<Description>{product.description}</Description>
									</ProductContent>
								</ProductLink>
								<VoteButtonWrapper>
									<VoteButton>
										<span>click</span>
									</VoteButton>
								</VoteButtonWrapper>
							</ProductItem>
						))}
					</Content>
				</ContentBlock>
			</div>
		</Main>
		<Aside />
	</Fragment>
);
