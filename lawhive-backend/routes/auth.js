import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

//TODO add validation
const router = express.Router()

async function signUpUser(email, password) {
	const hashedPassword = await bcrypt.hash(password, 12)
	const user = new User({
		email: email,
		password: hashedPassword,
	})
	await user.save()
}

router.post("/signin", async (req, res) => {
	try {
		const email = req.body.email
		const password = req.body.password
		let user = await User.findOne({ email: email })
		if (!user) {
			await signUpUser(email, password)
			user = await User.findOne({ email: email })
		}
		const passwordEncryption = await bcrypt.compare(password, user.password)
		if (!passwordEncryption) throw new Error("Wrong password entered.")
		const token = jwt.sign(
			{ email: user.email, userId: user._id.toString() },
			"secret",
			{ expiresIn: "24h" }
		)
		res.status(200).json({ token: token, userId: user._id.toString() })
	} catch (error) {
		res.status(401).json({ message: error.toString() })
	}
})

//TODO Secret needs to be changed and in ENV var
//TODO exlain rationale behind this

export default router
