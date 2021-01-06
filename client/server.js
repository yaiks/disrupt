const express = require("express");
const next = require("next");

const devProxy = {
	"/auth/google": {
		target: "http://localhost:8080/auth/google",
		pathRewrite: { "^/auth/google": "/" },
		changeOrigin: true
	}
};

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
	dir: ".",
	dev
});

const handle = app.getRequestHandler();

let server;

app
	.prepare()
	.then(() => {
		server = express();

		// Set up proxy
		if (dev && devProxy) {
			const proxyMiddleware = require("http-proxy-middleware");
			Object.keys(devProxy).forEach(function(context) {
				server.use(proxyMiddleware(context, devProxy[context]));
			});
		}

		// Default catch-all handler to allow Next.js to handle all other routes
		server.all("*", (req, res) => handle(req, res));

		server.listen(port, err => {
			if (err) {
				throw err;
			}
			console.log(`> Ready on port ${port} [${process.env.NODE_ENV}]`);
		});
	})
	.catch(err => {
		console.log("An error occurred, unable to start the server");
		console.log(err);
	});
