import mongoose from "mongoose"

const Schema = mongoose.Schema
const jobSchema = new Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		state: {
			type: String,
		},
		feeStructure: {
			type: String,
		},
		feeAmount: {
			type: String,
		},
		feePercentage: {
			type: String,
		},
		settlementAmount: {
			type: String,
		},
		amountPaid: {
			type: String,
		},
	},
	{ timestamps: true }
)

export const Job = mongoose.model("Job", jobSchema)
