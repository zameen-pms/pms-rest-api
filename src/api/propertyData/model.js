const { Schema, model } = require("mongoose");

const propertyDataSchema = new Schema(
	{
		provider: {
			listingOffice: {
				name: { type: String, default: "" },
				phoneNumber: { type: String, default: "" },
			},
			listingMember: {
				name: { type: String, default: "" },
				phoneNumber: { type: String, default: "" },
			},
			sellingMember: {
				name: { type: String, default: "" },
				phoneNumber: { type: String, default: "" },
			},
		},
		generalInformation: {
			county: { type: String, default: "" },
			residentialType: { type: String, default: "" },
			listPrice: {
				amount: { type: Number, default: 0 },
				perSqft: { type: Number, default: 0 },
			},
			salePrice: {
				amount: { type: Number, default: 0 },
				perSqft: { type: Number, default: 0 },
			},
			numberBeds: { type: Number, default: 0 },
			numberBaths: {
				full: { type: Number, default: 0 },
				half: { type: Number, default: 0 },
			},
			subdivision: { type: String, default: "" },
			yearBuilt: { type: Number, default: 2000 },
			totalAcres: { type: Number, default: 0 },
			variableAcres: { type: String, default: "" },
			inCityLimits: { type: String, default: "" },
			roadFrontage: { type: String, default: "" },
			zoning: { type: String, default: "" },
			taxes: {
				assessed: { type: String, default: "" },
				type: { type: String, default: "" },
				total: { type: Number, default: 0 },
			},
			parcelNumber: { type: String, default: "" },
		},
		features: {
			interiorFeatures: { type: String, default: "" },
			exteriorFeatures: { type: String, default: "" },
			appliances: { type: String, default: "" },
			style: { type: String, default: "" },
			basement: { type: String, default: "" },
			foundation: { type: String, default: "" },
			garageParking: { type: String, default: "" },
			heating: { type: String, default: "" },
			cooling: { type: String, default: "" },
			flooring: { type: String, default: "" },
			fencing: { type: String, default: "" },
			financing: { type: String, default: "" },
			roof: { type: String, default: "" },
			exteriorFinish: { type: String, default: "" },
			utilities: { type: String, default: "" },
			porchPatioDeck: { type: String, default: "" },
			attic: { type: String, default: "" },
			possession: { type: String, default: "" },
			fireplace: { type: String, default: "" },
			lotDescription: { type: String, default: "" },
			lockboxLocation: { type: String, default: "" },
			levels: { type: String, default: "" },
		},
		purchaseData: {
			listingDate: { type: Date, default: Date.now() },
			soldDate: { type: Date, default: Date.now() },
			statusChangeDate: { type: Date, default: Date.now() },
			pendingDate: { type: Date, default: Date.now() },
			originalListPrice: { type: Number, default: 0 },
			soldPrice: { type: Number, default: 0 },
			howSold: { type: String, default: "" },
			closingCosts: { type: String, default: "" },
		},
		rooms: [
			{
				name: String,
				level: String,
				dimensions: {
					length: Number,
					width: Number,
				},
				appliances: {
					type: String,
					default: "<p>No appliances yet</p>",
				},
			},
		],
		notes: { type: String, default: "<p>No notes yet.</p>" },
		assets: [
			{
				type: { type: String, enum: ["image", "video"] },
				source: { type: String },
			},
		],
	},
	{
		timestamps: true,
	}
);

const PropertyData = model("PropertyData", propertyDataSchema);

module.exports = {
	propertyDataSchema,
	PropertyData,
};
