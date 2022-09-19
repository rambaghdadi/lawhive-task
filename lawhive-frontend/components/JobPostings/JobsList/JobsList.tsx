import { Grid } from "@mantine/core"
import { JobListingTypes } from "../../../utils/types"
import Job from "./Job"

interface JobsListProps {
	data: JobListingTypes[]
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
	if (data.length < 1)
		return <p>There's no job listings currently available. Come back soon!</p>

	return (
		<Grid>
			{data.map((job: JobListingTypes) => (
				<Grid.Col key={job._id} span={6}>
					<Job
						job={job}
						payfixedFeeHandler={payfixedFeeHandler}
						paySettlementHandler={paySettlementHandler}
						error={error}
						resetError={resetError}
					/>
				</Grid.Col>
			))}
		</Grid>
	)
}

export default JobsList
