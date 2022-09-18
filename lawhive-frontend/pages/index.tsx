import { Container, Loader, Stack } from "@mantine/core"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import JobsList from "../components/JobPostings/JobsList/JobsList"
import NewJobForm from "../components/JobPostings/NewJobForm/NewJobForm"
import { formDataTypes, jobListingTypes } from "../utils/types"

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [jobs, setJobs] = useState<jobListingTypes[]>([])

	useEffect(() => {
		getJobs()
	}, [])

	async function getJobs() {
		try {
			setError(false)
			setLoading(true)
			const response = await fetch(`http://localhost:4000/api/joblist`)
			const data = await response.json()
			setJobs(data.items)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			setError(true)
			console.error(error)
		}
	}

	async function formDataHandler(formData: formDataTypes) {
		try {
			const response = await fetch(`http://localhost:4000/api/joblist`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
			const data = await response.json()
			getJobs()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<Header formDataHandler={formDataHandler} />
			<Container>
				<Stack spacing="xl">
					{loading ? (
						<Loader />
					) : error ? (
						<p>Error. Please try again later.</p>
					) : (
						<JobsList data={jobs} />
					)}
				</Stack>
			</Container>
		</>
	)
}

export default Home
