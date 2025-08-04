import fs from "fs";

interface ConfigFile {
	port: number,
	paths: string[]
}

const configPath = process.env.CONFIG_PATH;

let config: ConfigFile;

if (configPath != null) {
	try {
		config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
	}
	catch (err) {
		console.error("[!!] Failed to open configuration file. Is CONFIG_PATH " +
			"set correctly?");
		throw err;
	}
}
else {
	config = {
		port: +(process.env.PORT ?? "8011"),
		paths: process.env.REFERENCE_PATHS?.split(",")
			?.filter((item) => item.length > 0)
	}
}

if (typeof config?.port !== 'number' || isNaN(config.port) ||
	!Array.isArray(config.paths) || config.paths.length === 0 ||
	!config.paths.every((item) => typeof item === 'string'))
{
	console.error("[!!] Invalid configuration, refusing to start");
	process.exit(1);
}

export const PORT = config.port;
export const IMAGE_DIRS = config.paths;
