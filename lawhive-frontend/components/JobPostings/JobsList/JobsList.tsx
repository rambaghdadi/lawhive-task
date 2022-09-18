import { Badge, Card, Grid, Group, Space, Text } from "@mantine/core"
import { jobListingTypes } from "../../../utils/types"

interface JobsListProps {
	data: jobListingTypes[]
}

const JobsList: React.FC<JobsListProps> = ({ data }) => {
	if (data.length < 1)
		return <p>There's no job listings currently available. Come back soon!</p>

	return (
		<Grid>
			{data.map((job: jobListingTypes, i: number) => (
				<Grid.Col key={i} span={6}>
					<Card
						style={{ minHeight: 180 }}
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
						<Space h={"lg"} />
						<Group>
							<Badge color="cyan" variant="light">
								{job.feeStructure.split(/(?=[A-Z])/).join("-")}
							</Badge>
							<Badge color="cyan" variant="light">
								{job.feeStructure === "fixedFee"
									? `£${job.fee}`
									: `${job.fee}%`}
							</Badge>
						</Group>
					</Card>
				</Grid.Col>
			))}
		</Grid>
	)
}

export default JobsList
