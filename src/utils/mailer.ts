import nodemailer, { SendMailOptions } from "nodemailer";
import { Config } from "@/config/index";
import { log } from "./logger";

// Create and store nodemailer transporter
const mailerConfig = Config.get("email");
const transporter = nodemailer.createTransport({
	...mailerConfig,
	auth: {
		user: mailerConfig.user,
		pass: mailerConfig.password,
	},
});

// Send email
export const sendMail = async (payload: SendMailOptions) => {
	// Send mail
	transporter.sendMail(payload, (error, info) => {
		// Log error if mail failed
		if (error) {
			log.error(`Error sending email , ${error}`);
			return;
		}
		// Log mail preview url
		log.info(`Preview : ${nodemailer.getTestMessageUrl(info)}`);
	});
};
