import jwt from "jsonwebtoken";
import { jwtConfig } from "@/config/index";
import { log } from "@/utils/logger";

// Sign a new token
export const signJWT = (
	payload: object,
	keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
	options: jwt.SignOptions | undefined
) => {
	// Get and sign private key
	const signedKey = Buffer.from(jwtConfig.get(keyName), "base64").toString(
		"ascii"
	);

	return jwt.sign(payload, signedKey, {
		...(options && options),
		algorithm: "RS256",
	});
};

// Validate JWT
export const validateJWT = <T>(
	token: string,
	keyName: "accessTokenPublicsKey" | "refreshTokenPublicKey"
): T | null => {
	// Get and decode public key
	const publicKey = Buffer.from(
		jwtConfig.get<string>(keyName),
		"base64"
	).toString("ascii");

	// Verify decoded key
	try {
		let decodedKey = jwt.verify(token, publicKey);
		return decodedKey as T;
	} catch (error: any) {
		log.error(error);
		return null;
	}
};
