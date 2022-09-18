import { Button, Stack, Textarea, TextInput } from "@mantine/core"
import { useState } from "react"
import { formDataTypes } from "../../../utils/types"

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
	})

	function onChangeHandler(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setFormData((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
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
					// minLength={6}
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
