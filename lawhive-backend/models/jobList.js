import mongoose from "mongoose"

const Schema = mongoose.Schema
const jobListSchema = new Schema(
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
		fee: {
			type: String,
		},
		feeStructure: {
			type: String,
		},
	},
	{ timestamps: true }
)

export const JobList = mongoose.model("JobList", jobListSchema)
