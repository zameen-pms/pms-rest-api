const jwt = require("jsonwebtoken");
const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const comparePasswords = async (target, password) => {
	return compare(target, password);
};

const encryptPassword = async (password) => {
	return hash(password, 10);
};

const jwtSign = ({ payload, secret, options }) => {
	return sign(payload, secret, options);
};

const jwtVerify = (refreshToken, user) => {
	const result = {
		userNotFound: false,
		accessToken: null,
	};

	try {
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err || user.email !== decoded.user.email) {
					result.userNotFound = true;
				}
				const accessToken = sign(
					{
						email: decoded.email,
						createdAt: decoded.createdAt,
						updatedAt: decoded.updatedAt,
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "15d" }
				);
				result.accessToken = accessToken;
			}
		);

		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const verify = ({ token, secret, options = {} }) => {
	try {
		return jwt.verify(token, secret, options);
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	comparePasswords,
	encryptPassword,
	jwtSign,
	jwtVerify,
	verify,
};
