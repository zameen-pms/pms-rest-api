const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDb = require("./config/db");
const verifyJwt = require("./middleware/verifyJwt");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3000;
const app = express();
connectDb();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./api/health"));
app.use("/applications", require("./api/application"));
app.use("/assets", require("./api/assets"));
app.use("/auth", require("./api/auth"));
app.use("/properties", require("./api/property"));
app.use("/users", require("./api/user"));
// app.use(verifyJwt);
app.use("/comments", require("./api/comment"));
app.use("/documents", require("./api/document"));
app.use("/email", require("./api/email"));
app.use("/workOrders", require("./api/workOrder"));

app.use((err, _req, res, _next) => {
	res.status(500).json({ error: "Internal Server Error", details: err });
});

app.listen(PORT, (err) => {
	if (!err) {
		console.log(`Server running on port ${PORT}`);
	} else {
		console.log(`Error occured: ${err}`);
	}
});
