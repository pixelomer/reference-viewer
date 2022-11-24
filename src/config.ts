import fs from "fs";

interface ConfigFile {
	port: number,
	paths: string[]
}

export const CONFIG_PATH = process.env.CONFIG_PATH || "./config.json";

let config: ConfigFile;

try {
	config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}
catch (err) {
	console.error("[!!] Failed to open configuration file. Is CONFIG_PATH " +
		"set correctly?");
	throw err;
}


export const PARSED_CONFIG = config;
export const PORT = config.port;
export const IMAGE_DIRS = config.paths;