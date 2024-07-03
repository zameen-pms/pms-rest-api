const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const sendEmail = async (req, res) => {
	try {
		const { to, subject, message } = req.body;

		if (!to || !subject || !message) {
			return res
				.status(400)
				.json("to, subject, and message are required.");
		}

		const params = {
			Source: `Zameen Management <${process.env.AWS_SENDER_EMAIL}>`,
			Destination: {
				ToAddresses: [to],
			},
			Message: {
				Body: {
					Html: { Data: message },
				},
				Subject: { Data: subject },
			},
		};
		const command = new SendEmailCommand(params);
		const data = await sesClient.send(command);

		res.json(data);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	sendEmail,
};
