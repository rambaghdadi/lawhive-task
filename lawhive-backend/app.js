import express from "express"
import mongoose from "mongoose"
import jobListRoutes from "./routes/jobList.js"
import authRoutes from "./routes/auth.js"

const app = express()

app.use(express.json())
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
	)
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
	next()
})

app.use("/api", jobListRoutes)
app.use("/api", authRoutes)

mongoose
	.connect(`mongodb://root:root@localhost:27017/`)
	.then(() => {
		app.listen(4000)
	})
	.catch((err) => {
		console.log(err)
	})
