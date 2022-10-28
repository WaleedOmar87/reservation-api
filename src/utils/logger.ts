import logger from "pino";
export const log = logger({
	transport: {
		target: "pino-pretty",
	},
	level: "info",
	base: {
		pid: false,
	},
	timestamp: () => `, "time" : "${Date.now()}"`,
});
