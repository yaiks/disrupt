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
	return (
		<Layout customStyles={customStyles}>
			<Content></Content>
		</Layout>
	);
};
