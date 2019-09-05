import React, { Fragment } from "react";
import Container from "./Container";
import Header from "./Header";
import Meta from "./Meta";

export default ({ children, customStyles }) => (
	<Fragment>
		<Meta />
		<Header />
		<Container customStyles={customStyles}>{children}</Container>
	</Fragment>
);
