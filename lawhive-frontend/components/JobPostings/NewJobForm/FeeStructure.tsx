import { Select, TextInput } from "@mantine/core"
import React from "react"
import { FeeStructureEnum } from "../../../utils/types"

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
					{ value: FeeStructureEnum.NoWinNoFee, label: "No-Win-No-Fee" },
					{ value: FeeStructureEnum.FixedFee, label: "Fixed-Fee" },
				]}
			/>
			{feeStructureValue === FeeStructureEnum.FixedFee && (
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
			{feeStructureValue === FeeStructureEnum.NoWinNoFee && (
				<TextInput
					name="feePercentage"
					value={feePercentage}
					onChange={onChange}
					type={"number"}
					max={"100"}
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
