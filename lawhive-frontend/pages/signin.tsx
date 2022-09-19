import { Button, PasswordInput, TextInput } from "@mantine/core"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { At, Hash } from "tabler-icons-react"
import Header from "../components/Header/Header"
import { useAuth } from "../contexts/authContext"

export default function Signup() {
	const router = useRouter()
	const email = useRef<HTMLInputElement>(null)
	const password = useRef<HTMLInputElement>(null)
	const { userToken, signin } = useAuth()

	async function formHandler(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			if (email.current && password.current) {
				const formData = {
					email: email.current.value,
					password: password.current.value,
				}
				const response = await fetch(`http://localhost:4000/api/signin`, {
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				})
				const data = await response.json()
				signin(data.token, data.userId)
			}
		} catch (error) {
			console.error(error)
		} finally {
			router.push("/")
		}
	}

	return (
		<div className="signin">
			<h1>Sign In</h1>
			<form onSubmit={formHandler}>
				<TextInput
					icon={<At size={14} />}
					placeholder="Your Email"
					label="Email"
					required
					type="email"
					id="email"
					ref={email}
				/>
				<PasswordInput
					icon={<Hash size={14} />}
					placeholder="Password"
					label="Password"
					ref={password}
					id="password"
					required
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}
