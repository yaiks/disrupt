/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { Layout } from "../components";
import mq from "../utils/breakpoints";

const customStyles = css`
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 30px;
`;

const Form = styled.form`
	flex: 1;
	max-width: 525px;
`;

const FormContent = styled.div`
	padding: 20px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) 0 2px 2px rgba(0, 0, 0, 0.15) 0 4px
		4px rgba(0, 0, 0, 0.15) 0 8px 8px rgba(0, 0, 0, 0.15);
`;

const FormField = ({ label, placeholder }) => (
	<label
		css={css`
			display: block;
			margin-bottom: 20px;
		`}
	>
		<div
			css={css`
				display: flex;
				flex-flow: row;
				align-items: center;
				margin-bottom: 10px;
			`}
		>
			<span
				css={css`
					flex: 1;
					font-weight: 700;
					font-size: 14px;
				`}
			>
				{label}
			</span>
		</div>
		<div>
			<input
				css={css`
					padding: 10px;
					border-radius: 3px;
					border: 1px solid #e8e8e8;
					outline: none;
					height: 35px;
					width: 100%;
				`}
				placeholder={placeholder}
			/>
		</div>
	</label>
);

const list = [
	{ label: "Name of the product", placeholder: "insert value" },
	{ label: "Description", placeholder: "insert value" },
	{ label: "Tags", placeholder: "insert value" },
	{ label: "Webiste url", placeholder: "insert value" }
];

export default () => (
	<Layout customStyles={customStyles}>
		<Form>
			<FormContent>
				{list.map((each, index) => (
					<FormField
						key={index}
						label={each.label}
						placeholder={each.placeholder}
					/>
				))}
			</FormContent>
		</Form>
	</Layout>
);
