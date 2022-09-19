import {
	Badge,
	Button,
	Card,
	Grid,
	Group,
	Space,
	Stack,
	Text,
} from "@mantine/core"
import { useState } from "react"
import { jobListingTypes } from "../../../utils/types"
import SettlementForm from "./SettlementForm"

interface JobsListProps {
	data: jobListingTypes[]
	payfixedFeeHandler: (id: string) => void
	paySettlementHandler: (id: string, settlementAmount: string) => void
	error: string
	resetError: () => void
}

const JobsList: React.FC<JobsListProps> = ({
	data,
	payfixedFeeHandler,
	paySettlementHandler,
	error,
	resetError,
}) => {
	const [payStatus, setPayStatus] = useState(false)
	const [settlementValue, setSettlementValue] = useState("")

	if (data.length < 1)
		return <p>There's no job listings currently available. Come back soon!</p>

	return (
		<Grid>
			{data.map((job: jobListingTypes) => (
				<Grid.Col key={job._id} span={6}>
					<Card
						style={{ minHeight: 220 }}
						shadow="sm"
						p="lg"
						radius="md"
						withBorder
					>
						<Group position="apart" mt="md" mb="xs">
							<Text weight={500}>{job.title}</Text>
							<Badge color="pink" variant="light">
								{job.state}
							</Badge>
						</Group>

						<Text size="sm" color="dimmed">
							{job.description}
						</Text>
						<Stack>
							<Space h={"lg"} />
							<Group>
								<Badge color="cyan" variant="light">
									{job.feeStructure.split(/(?=[A-Z])/).join("-")}
								</Badge>
								<Badge color="cyan" variant="light">
									{job.feeStructure === "fixedFee"
										? `£${job.feeAmount}`
										: `${job.feePercentage}%`}
								</Badge>
							</Group>

							{job.feeStructure === "fixedFee" && job.state !== "Paid" ? (
								<Button
									onClick={() => payfixedFeeHandler(job._id)}
									color="violet"
									compact
									uppercase
								>
									Pay Now
								</Button>
							) : job.feeStructure === "fixedFee" && job.state === "Paid" ? (
								<Text color={"dimmed"} size={"sm"} weight={500}>
									Amount Paid: £{job.amountPaid}
								</Text>
							) : null}

							{job.feeStructure === "noWinNoFee" && job.state !== "Paid" ? (
								<>
									{!payStatus ? (
										<Button
											color="violet"
											compact
											uppercase
											onClick={() => {
												setPayStatus(!payStatus)
											}}
										>
											Pay Now
										</Button>
									) : (
										<SettlementForm
											error={error}
											cancelOnClick={() => {
												setPayStatus(!payStatus)
												setSettlementValue("")
												resetError()
											}}
											onSubmit={(e) => {
												e.preventDefault()
												paySettlementHandler(job._id, settlementValue)
											}}
											onChange={(e) => {
												e.preventDefault()
												setSettlementValue(e.target.value)
												resetError()
											}}
											settlementValue={settlementValue}
										/>
									)}
								</>
							) : job.feeStructure === "noWinNoFee" && job.state === "Paid" ? (
								<Text color={"dimmed"} size={"sm"} weight={500}>
									Amount Paid: £{job.amountPaid}
								</Text>
							) : null}
						</Stack>
					</Card>
				</Grid.Col>
			))}
		</Grid>
	)
}

export default JobsList
