import express from "express"
import { Job } from "../models/job.js"

const router = express.Router()

router.get("/joblist", async (req, res) => {
	try {
		const jobs = await Job.find()
		res.status(200).json({ message: "Fetched succesfully", items: jobs })
	} catch (error) {
		res.status(500).json({ message: error.toString() })
	}
})

router.post("/joblist", async (req, res) => {
	let job
	try {
		job = new Job({
			title: req.body.title,
			description: req.body.description,
			feeStructure: req.body.feeStructure,
			feeAmount: req.body.feeAmount,
			feePercentage: req.body.feePercentage,
			state: "started",
		})
		const result = await job.save()
		res.status(201).json({ message: "Item added successfully", item: result })
	} catch (error) {
		res.status(500).json({ message: error.toString(), item: job })
	}
})

router.put("/job/pay/:jobId", async (req, res) => {
	try {
		const id = req.params.jobId
		const job = await Job.findById(id)
		if (job.feeStructure === "fixedFee") {
			job.amountPaid = job.feeAmount
		} else {
			job.amountPaid = req.body.settlementAmount * (job.feePercentage / 100)
		}
		job.state = "Paid"
		const result = await job.save()
		res.status(200).json({ message: "Job Updated", job: result })
	} catch (error) {
		res.status(422).json({ message: error.toString() })
	}
})

export default router
