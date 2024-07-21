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
		const { subject, body, recipients } = req.body;

		if (!subject || !body || !recipients || !Array.isArray(recipients)) {
			return res
				.status(400)
				.json("subject, body, and recipients are required.");
		}

		const sendEmailPromises = recipients.map(async (recipient) => {
			const params = {
				Source: `Zameen Management <${process.env.AWS_SENDER_EMAIL}>`,
				Destination: {
					ToAddresses: [recipient],
				},
				Message: {
					Subject: { Data: subject },
					Body: {
						Html: { Data: body },
					},
				},
			};
			const command = new SendEmailCommand(params);
			return sesClient.send(command);
		});
		await Promise.all(sendEmailPromises);

		res.json({ ok: true });
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	sendEmail,
};
