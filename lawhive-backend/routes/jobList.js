import express from "express"
import { JobList } from "../models/jobList.js"

const router = express.Router()

router.get("/joblist", async (req, res) => {
	try {
		const jobList = await JobList.find()
		res.status(200).json({ message: "Fetched succesfully", items: jobList })
	} catch (error) {
		res.status(500).json({ message: error.toString() })
	}
})

router.post("/joblist", async (req, res) => {
	let joblist
	try {
		joblist = new JobList({
			title: req.body.title,
			description: req.body.description,
			state: "started",
		})
		const result = await joblist.save()
		res.status(201).json({ message: "Item added successfully", item: result })
	} catch (error) {
		res.status(500).json({ message: error.toString(), item: joblist })
	}
})

export default router
