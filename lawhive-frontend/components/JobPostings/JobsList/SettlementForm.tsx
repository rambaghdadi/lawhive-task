import { Button, Group, TextInput } from "@mantine/core"

interface SettlementFormProps {
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	settlementValue: string
}

const SettlementForm: React.FC<SettlementFormProps> = ({
	settlementValue,
	onChange,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<Group>
				<TextInput
					name="settlementAmount"
					value={settlementValue}
					onChange={onChange}
					size="xs"
					placeholder="Settlement Amount"
					withAsterisk
					type={"number"}
					required
				/>
				<Button color="violet" uppercase type="submit" size="xs">
					Confirm
				</Button>
			</Group>
		</form>
	)
}

export default SettlementForm
