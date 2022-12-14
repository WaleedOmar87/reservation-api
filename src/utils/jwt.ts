import jwt from "jsonwebtoken";
import { Config } from "@/config/index";
import { log } from "@/utils/logger";

// Get JWT Config
const jwtConfig = Config.jwt;

// Sign a new token
export const signJWT = (
	payload: Object,
	keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
	options?: jwt.SignOptions | undefined
) => {
	try {
		// Get and sign private key
		const signedKey = Buffer.from(jwtConfig[keyName]).toString("ascii");
		return jwt.sign(payload, signedKey, {
			...(options && options),
			algorithm: "RS256",
		});
	} catch (error: any) {
		log.error(`JWT Sign Error ${error}`);
		return null;
	}
};

// Validate JWT
export const validateJWT = <T>(
	token: string,
	keyName: "accessTokenPublicKey" | "refreshTokenPrivateKey"
): T | null => {
	// Get and decode public key
	const publicKey = Buffer.from(jwtConfig[keyName]).toString("ascii");
	// Verify decoded key
	try {
		let decodedKey = jwt.verify(token, publicKey);
		return decodedKey as T;
	} catch (error: any) {
		log.error(`JWT Validation Error ${error}`);
		return null;
	}
};
