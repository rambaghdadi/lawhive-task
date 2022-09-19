import { Badge, Button, Card, Group, Space, Stack, Text } from "@mantine/core"
import { useState } from "react"
import {
	FeeStructureEnum,
	JobListingTypes,
	StateEnum,
} from "../../../utils/types"
import SettlementForm from "./SettlementForm"

interface JobProps {
	job: JobListingTypes
	payfixedFeeHandler: (id: string) => void
	paySettlementHandler: (id: string, settlementAmount: string) => void
	error: string
	resetError: () => void
}

const Job: React.FC<JobProps> = ({
	job,
	payfixedFeeHandler,
	paySettlementHandler,
	error,
	resetError,
}) => {
	const [payStatus, setPayStatus] = useState(false)
	const [settlementValue, setSettlementValue] = useState("")

	const isFixedFee = job.feeStructure === FeeStructureEnum.FixedFee
	const isNoWinNoFee = job.feeStructure === FeeStructureEnum.NoWinNoFee
	const isJobPaid = job.state === StateEnum.PAID

	return (
		<Card style={{ minHeight: 220 }} shadow="sm" p="lg" radius="md" withBorder>
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
						{isFixedFee ? `£${job.feeAmount}` : `${job.feePercentage}%`}
					</Badge>
					{job.expectedSettlementAmount && (
						<Badge color="cyan" variant="light">
							{`Expected SA £${job.expectedSettlementAmount}`}
						</Badge>
					)}
				</Group>
				{isFixedFee && !isJobPaid ? (
					<Button
						onClick={() => payfixedFeeHandler(job._id)}
						color="violet"
						compact
						uppercase
					>
						Pay Now
					</Button>
				) : isFixedFee && isJobPaid ? (
					<Text color={"dimmed"} size={"sm"} weight={500}>
						Amount Paid: £{job.amountPaid}
					</Text>
				) : null}
				{isNoWinNoFee && !isJobPaid ? (
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
				) : isNoWinNoFee && isJobPaid ? (
					<Text color={"dimmed"} size={"sm"} weight={500}>
						Amount Paid: £{job.amountPaid}
					</Text>
				) : null}
			</Stack>
		</Card>
	)
}

export default Job
