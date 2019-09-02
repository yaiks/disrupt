import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import mq from "../utils/breakpoints";

const Aside = styled.aside`
	display: none;
	${mq[2]} {
		display: block;
		width: 330px;
		margin-left: 20px;
	}
`;

const FirstAside = styled.div`
	margin: 14px 0;
	display: flex;
	align-items: stretch;
	flex-direction: column;
`;

const FirstAsideTitle = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

const FirstAsideContent = styled.div`
	background-color: #fff;
	padding: 20px;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	position: relative;
`;

export default () => (
	<Aside>
		<FirstAside>
			<FirstAsideTitle>
				<span style={{ fontWeight: "600" }}>What is new today?</span>
			</FirstAsideTitle>
			<FirstAsideContent></FirstAsideContent>
		</FirstAside>
		<FirstAside>
			<FirstAsideTitle>
				<span style={{ fontWeight: "600" }}>Do something awesome!</span>
			</FirstAsideTitle>
			<FirstAsideContent></FirstAsideContent>
		</FirstAside>
		<FirstAside>
			<FirstAsideTitle>
				<span style={{ fontWeight: "600" }}>Get to know other products</span>
			</FirstAsideTitle>
			<FirstAsideContent></FirstAsideContent>
		</FirstAside>
	</Aside>
);
