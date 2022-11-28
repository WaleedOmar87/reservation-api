require("dotenv").config();
export const Config: any = {
	email: {
		user: "j5xd4klzk6t6t45z@ethereal.email",
		password: "Xs12NR5CwnqsyhywYz",
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
	},
	jwt: {
		accessTokenPrivateKey: "something",
		accessTokenPublicKey: "something",
		refreshTokenPrivateKey: "something_else",
		refreshTokenPublicKey: "something_else",
	},
	cors: {
		origin: `${process.env.WEB_SERVER}:${process.env.PORT}`,
	},
};
