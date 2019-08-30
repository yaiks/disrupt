import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import mq from "../utils/breakpoints";

const Container = styled.div`
	max-width: 1100px;
	min-width: 320px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 10px;
	padding-right: 10px;
	${props => props.customStyle};
	${mq[1]} {
		padding-left: 15px;
		padding-right: 15px;
	}
`;

export default ({ children, customStyle }) => (
	<Container customStyle={customStyle}>{children}</Container>
);
