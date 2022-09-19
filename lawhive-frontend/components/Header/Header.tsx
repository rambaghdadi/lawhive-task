import { Button, Group, Modal } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "../../contexts/authContext"
import { FormDataTypes } from "../../utils/types"
import NewJobForm from "../JobPostings/NewJobForm/NewJobForm"
import classes from "./Header.module.css"

interface HeaderProps {
	formDataHandler: (formData: FormDataTypes) => void
}

const Header: React.FC<HeaderProps> = (props) => {
	const [opened, setOpened] = useState(false)
	const { userToken, signout } = useAuth()

	return (
		<>
			<Modal opened={opened} onClose={() => setOpened(false)}>
				<NewJobForm closeModal={() => setOpened(false)} {...props} />
			</Modal>

			<header className={classes.header}>
				<div></div>
				<h1>lawhive</h1>
				{userToken ? (
					<Group>
						<Button
							uppercase
							onClick={() => setOpened(true)}
							color="pink"
							variant="light"
						>
							New Job
						</Button>
						<Button onClick={signout} color="red" variant="light" uppercase>
							Sign Out
						</Button>
					</Group>
				) : (
					<Link href={"/signin"}>
						<Button color="pink" variant="light">
							Sign In
						</Button>
					</Link>
				)}
			</header>
		</>
	)
}

export default Header
