import { Select, TextInput } from "@mantine/core"
import React from "react"

interface FeeStructureProps {
	onChange: (e: string | React.ChangeEvent<HTMLInputElement> | null) => void
	feeValue: string
	feePercentage: string
	feeStructureValue: string
}

const FeeStructure: React.FC<FeeStructureProps> = ({
	onChange,
	feeStructureValue,
	feeValue,
	feePercentage,
}) => {
	return (
		<>
			<Select
				value={feeStructureValue}
				onChange={onChange}
				label="Fee Structure"
				placeholder="Pick one"
				withAsterisk
				name="feeStructure"
				required
				data={[
					{ value: "noWinNoFee", label: "No-Win-No-Fee" },
					{ value: "fixedFee", label: "Fixed-Fee" },
				]}
			/>
			{feeStructureValue === "fixedFee" && (
				<TextInput
					name="feeAmount"
					value={feeValue}
					onChange={onChange}
					type={"number"}
					min={"0"}
					placeholder={"Fee Amount"}
					label={"Fee Amount"}
					variant="filled"
					withAsterisk
					required
				/>
			)}
			{feeStructureValue === "noWinNoFee" && (
				<TextInput
					name="feePercentage"
					value={feePercentage}
					onChange={onChange}
					type={"number"}
					min={"0"}
					placeholder={"Fee Percentage"}
					label={"Fee Percentage"}
					variant="filled"
					withAsterisk
					required
				/>
			)}
		</>
	)
}

export default FeeStructure
