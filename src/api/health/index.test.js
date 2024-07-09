const express = require("express");
const request = require("supertest");

const app = express();
app.use("/", require("./route"));

describe("Health Endpoint", () => {
	it("should respond with status 200 and { ok: true }", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ ok: true });
	});
});
