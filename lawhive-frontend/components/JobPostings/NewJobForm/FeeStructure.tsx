import { Select, TextInput } from "@mantine/core"
import React from "react"

interface FeeStructureProps {
	onChange: (e: string | React.ChangeEvent<HTMLInputElement> | null) => void
	feeValue: string
	feeStructureValue: string
}

const FeeStructure: React.FC<FeeStructureProps> = ({
	onChange,
	feeStructureValue,
	feeValue,
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
			{feeStructureValue && (
				<TextInput
					name="fee"
					value={feeValue}
					onChange={onChange}
					type={"number"}
					min={"0"}
					placeholder={
						feeStructureValue === "noWinNoFee" ? "Fee Percentage" : "Fee Amount"
					}
					label={
						feeStructureValue === "noWinNoFee" ? "Fee Percentage" : "Fee Amount"
					}
					variant="filled"
					withAsterisk
					required
				/>
			)}
		</>
	)
}

export default FeeStructure
