require("dotenv").config();

export const mailerConfig = {
	user: "j5xd4klzk6t6t45z@ethereal.email",
	password: "Xs12NR5CwnqsyhywYz",
	host: "smtp.ethereal.email",
	port: 587,
	secure: false,
};

export const jwtConfig: Object = {
	accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
	accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
	refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
	refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
};
