import { Button, Stack, Textarea, TextInput } from "@mantine/core"
import { useState } from "react"
import { FeeStructureEnum, FormDataTypes } from "../../../utils/types"
import FeeStructure from "./FeeStructure"

interface NewJobFormProps {
	formDataHandler: (formData: FormDataTypes) => void
	closeModal: () => void
}

const NewJobForm: React.FC<NewJobFormProps> = ({
	formDataHandler,
	closeModal,
}) => {
	const [titleError, setTitleError] = useState("")
	const [formData, setFormData] = useState<FormDataTypes>({
		title: "",
		description: "",
		feeStructure: FeeStructureEnum.NoWinNoFee,
		feeAmount: "",
		feePercentage: "",
		expectedSettlementAmount: "",
	})

	function onChangeHandler(
		e: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null
	) {
		let keyName: string, keyValue: string
		//Select Element in MantineUI is not a valid HTML select element thus requires the below code
		if (typeof e === "string") {
			keyName = "feeStructure"
			keyValue = e
		} else if (e !== null) {
			keyName = e.target.name
			keyValue = e.target.value
		} else return
		setFormData((prev) => {
			return {
				...prev,
				[keyName]: keyValue,
			}
		})
	}

	function inputDataValidation(title: FormDataTypes["title"]): boolean {
		if (title.length < 6) {
			setTitleError("Min number of characters is 6.")
			return false
		}
		if (title.length > 20) {
			setTitleError("Max number of characters is 20.")
			return false
		}

		return true
	}

	function formSubmitHandler(e: React.ChangeEvent<HTMLFormElement>): void {
		e.preventDefault()
		const data: FormDataTypes = {
			title: formData.title.trim(),
			description: formData.description.trim(),
			feeStructure: formData.feeStructure,
			feeAmount: formData.feeAmount,
			feePercentage: formData.feePercentage,
			expectedSettlementAmount: formData.expectedSettlementAmount,
		}
		if (!inputDataValidation(data.title)) return
		formDataHandler(data)
		closeModal()
		e.target.reset()
	}

	return (
		<form onSubmit={formSubmitHandler}>
			<Stack>
				<TextInput
					name="title"
					error={titleError}
					value={formData.title}
					onChange={onChangeHandler}
					placeholder="Job Title"
					label="Title"
					withAsterisk
					required
				/>
				<Textarea
					name="description"
					minLength={6}
					onChange={onChangeHandler}
					value={formData.description}
					placeholder="Job Description"
					label="Description"
					withAsterisk
					required
				/>
				<FeeStructure
					feeStructureValue={formData.feeStructure}
					feePercentage={formData.feePercentage}
					feeValue={formData.feeAmount}
					onChange={onChangeHandler}
				/>
				{formData.feeStructure === FeeStructureEnum.NoWinNoFee && (
					<TextInput
						name="expectedSettlementAmount"
						type={"number"}
						value={formData.expectedSettlementAmount}
						onChange={onChangeHandler}
						placeholder="Amount"
						label="Expected Settlement Amount"
						withAsterisk
						required
					/>
				)}
				<Button color={"pink"} type="submit" uppercase>
					Submit
				</Button>
			</Stack>
		</form>
	)
}

export default NewJobForm
