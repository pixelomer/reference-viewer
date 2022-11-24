import express from "express";
import compression from "compression";
import { routes } from "./routes";
import path from "path";

export function createApp() {
	const app = express();

	app.disable('x-powered-by');
	app.set('view engine', 'pug');
	app.set('query parser', 'simple');

	app.use(compression());
	app.use(express.static( path.join(__dirname, "..", "static") ));

	for (const route of routes) {
		app.use(route);
	}

	return app;
}