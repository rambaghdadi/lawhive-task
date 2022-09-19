import { Button, Group, TextInput } from "@mantine/core"

interface SettlementFormProps {
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	cancelOnClick: () => void
	settlementValue: string
	error: string
}

const SettlementForm: React.FC<SettlementFormProps> = ({
	settlementValue,
	onChange,
	onSubmit,
	error,
	cancelOnClick,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<Group>
				<TextInput
					name="settlementAmount"
					value={settlementValue}
					onChange={onChange}
					error={error}
					size="xs"
					placeholder="Settlement Amount"
					withAsterisk
					type={"number"}
					required
				/>
				<Button color="violet" uppercase type="submit" size="xs">
					Confirm
				</Button>
				<Button onClick={cancelOnClick} color="red" uppercase size="xs">
					Cancel
				</Button>
			</Group>
		</form>
	)
}

export default SettlementForm
