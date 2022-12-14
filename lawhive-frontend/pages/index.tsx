import { Container, Loader, Stack } from "@mantine/core"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import JobsList from "../components/JobPostings/JobsList/JobsList"
import { FormDataTypes, JobListingTypes } from "../utils/types"

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [settlementError, setSettlementError] = useState("")
	const [jobs, setJobs] = useState<JobListingTypes[]>([])

	useEffect(() => {
		getJobs()
	}, [])

	async function getJobs() {
		try {
			setError(false)
			setLoading(true)
			const response = await fetch(`http://localhost:4000/api/joblist`)
			const data = await response.json()
			if (!response.ok) throw new Error(data)
			setJobs(data.items)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			setError(true)
			console.error(error)
		}
	}

	async function formDataHandler(formData: FormDataTypes) {
		try {
			const response = await fetch(`http://localhost:4000/api/joblist`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
			const data = await response.json()
			if (!response.ok) throw new Error(data)
			getJobs()
		} catch (error) {
			console.error(error)
		}
	}

	async function payfixedFeeHandler(id: string) {
		try {
			const response = await fetch(`http://localhost:4000/api/job/pay/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			})
			const data = await response.json()
			if (!response.ok) throw new Error(data)
			getJobs()
		} catch (error) {
			console.error(error)
		}
	}

	async function paySettlementHandler(id: string, settlementAmount: string) {
		try {
			setSettlementError("")
			const response = await fetch(`http://localhost:4000/api/job/pay/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					settlementAmount: settlementAmount,
				}),
			})
			const data = await response.json()
			if (!response.ok) throw new Error(data.message)
			getJobs()
		} catch (error) {
			console.log(error)
			const err = error as Error
			setSettlementError(err.message)
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
						<JobsList
							resetError={() => setSettlementError("")}
							error={settlementError}
							paySettlementHandler={paySettlementHandler}
							payfixedFeeHandler={payfixedFeeHandler}
							data={jobs}
						/>
					)}
				</Stack>
			</Container>
		</>
	)
}

export default Home
