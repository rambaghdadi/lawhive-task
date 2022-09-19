export interface formDataTypes {
	title: string
	description: string
	feeStructure: string
	feeAmount: string
	feePercentage: string
	expectedSettlementAmount: string
}

export interface jobListingTypes {
	_id: string
	title: string
	description: string
	state: string
	feeStructure: string
	feePercentage: string
	feeAmount: string
	settlementAmount: string
	amountPaid: string
}
