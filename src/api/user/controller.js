const GenericRepository = require("../../repository");
const { encryptPassword } = require("../auth/useCases");
const { User } = require("./model");
const userValidationSchema = require("./validate");

const userRepo = new GenericRepository(User);

const createUser = async (req, res) => {
	try {
		const { error } = userRepo.validate(userValidationSchema, req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const { email, password } = req.body;
		const userExists = await userRepo.findByEmail(email);
		if (userExists) {
			return res.status(400).json("User already exists.");
		}

		let user;
		if (password) {
			const hashedPassword = await encryptPassword(password);
			user = await userRepo.create({
				...req.body,
				password: hashedPassword,
			});
		} else {
			user = await userRepo.create({
				...req.body,
			});
		}

		res.json(user);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await User.find(req.query);
		res.json(users);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkUserExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const user = await userRepo.findById(id);
		if (!user) {
			return res.status(404).json("User not found.");
		}

		req.user = user;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getUserById = async (req, res) => {
	try {
		res.json(req.user);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateUserById = async (req, res) => {
	try {
		const { _id: id } = req.user;
		const user = await userRepo.updateById(id, req.body);
		res.json(user);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteUserById = async (req, res) => {
	try {
		const { _id: id } = req.user;

		await userRepo.remove(id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createUser,
	getUsers,
	checkUserExists,
	getUserById,
	updateUserById,
	deleteUserById,
};
