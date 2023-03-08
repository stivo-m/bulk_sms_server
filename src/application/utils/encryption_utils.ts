import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getPublicAndPrivateKeys = () => {
	const publicKey = Buffer.from(process.env.PUBLIC_KEY!, "base64").toString(
		"ascii",
	);
	const privateKey = Buffer.from(process.env.PRIVATE_KEY!, "base64").toString(
		"ascii",
	);
	return {
		publicKey,
		privateKey,
	};
};

export const randomFixedInteger = function (length: number) {
	return Math.floor(
		Math.pow(10, length - 1) +
			Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
	);
};

function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
	const { privateKey } = getPublicAndPrivateKeys();

	return jwt.sign(object, privateKey, {
		...(options && options),
		algorithm: "RS256",
	});
}
const verifyJWT = <T>(token: string): T | null => {
	const { publicKey } = getPublicAndPrivateKeys();
	try {
		const decoded = jwt.verify(token, publicKey);
		return decoded as T;
	} catch (error) {
		return null;
	}
};

const comparePasswords = async (p1: string, p2: string): Promise<boolean> => {
	const result = await bcrypt.compare(p1, p2);
	return result;
};

const generateHashedPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hashSync(password, salt);
};

export { comparePasswords, verifyJWT, signJWT, generateHashedPassword };
