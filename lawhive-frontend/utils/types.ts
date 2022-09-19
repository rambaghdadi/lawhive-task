export interface FormDataTypes {
	title: string
	description: string
	feeStructure: string
	feeAmount: string
	feePercentage: string
	expectedSettlementAmount: string
}

export interface JobListingTypes {
	_id: string
	title: string
	description: string
	state: string
	feeStructure: string
	feePercentage: string
	feeAmount: string
	settlementAmount: string
	amountPaid: string
	expectedSettlementAmount: string
}

export enum StateEnum {
	STARTED = "started",
	PAID = "Paid",
}

export enum FeeStructureEnum {
	NoWinNoFee = "noWinNoFee",
	FixedFee = "fixedFee",
}
