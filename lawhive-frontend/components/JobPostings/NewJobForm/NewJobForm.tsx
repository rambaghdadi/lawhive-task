import { Button, Stack, Textarea, TextInput } from "@mantine/core"
import { useState } from "react"
import { formDataTypes } from "../../../utils/types"
import FeeStructure from "./FeeStructure"

interface NewJobFormProps {
	formDataHandler: (formData: formDataTypes) => void
	closeModal: () => void
}

const NewJobForm: React.FC<NewJobFormProps> = ({
	formDataHandler,
	closeModal,
}) => {
	const [titleError, setTitleError] = useState("")
	const [formData, setFormData] = useState<formDataTypes>({
		title: "",
		description: "",
		feeStructure: "",
		fee: "",
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

	function inputDataValidation(title: formDataTypes["title"]): boolean {
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
		const data: formDataTypes = {
			title: formData.title.trim(),
			description: formData.description.trim(),
			feeStructure: formData.feeStructure,
			fee: formData.fee,
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
					feeValue={formData.fee}
					onChange={onChangeHandler}
				/>
				<Button color={"pink"} type="submit" uppercase>
					Submit
				</Button>
			</Stack>
		</form>
	)
}

//TODO validation
//TODO onChange vs useRef

export default NewJobForm
