const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");
const { v4: uuid } = require("uuid");

const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const upload = multer();

const generateKeyName = (filename) => {
	const originalFilename = uuid();
	const fileExtension = filename.split(".").pop();
	return `${originalFilename}.${fileExtension}`;
};

const uploadAsset = async (req, res) => {
	try {
		const file = req.file;
		if (!file) {
			return res.status(404).json("File not found.");
		}
		const bucketName = process.env.AWS_S3_BUCKET_NAME;
		const keyName = generateKeyName(file.originalname);

		const params = {
			Bucket: bucketName,
			Key: keyName,
			Body: file.buffer,
		};
		const command = new PutObjectCommand(params);
		await s3Client.send(command);

		res.json(keyName);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getAsset = async (req, res) => {
	try {
		const { key } = req.params;
		if (!key) {
			return res.status(400).json("Key is required.");
		}

		const params = {
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: key,
		};

		const command = new GetObjectCommand(params);
		const url = await getSignedUrl(s3Client, command, {
			expiresIn: 3600,
		});

		res.json(url);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getRedirectUrl = async (req, res) => {
	try {
		const { key } = req.params;
		if (!key) {
			return res.status(400).json("Key is required.");
		}

		const params = {
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: key,
		};

		const command = new GetObjectCommand(params);
		const url = await getSignedUrl(s3Client, command, {
			expiresIn: 3600,
		});

		res.redirect(url);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteAssetByKey = async (req, res) => {
	try {
		const { key } = req.params;
		const bucketName = process.env.AWS_S3_BUCKET_NAME;

		const params = {
			Bucket: bucketName,
			Key: key,
		};
		const command = new DeleteObjectCommand(params);
		await s3Client.send(command);

		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	upload,
	uploadAsset,
	getAsset,
	getRedirectUrl,
	deleteAssetByKey,
};
