export type RegisterPayroll = {
	typePayment: string
	startDate: Date
	endDate: Date
	hours: number
	amount: number
	// token
	idClient: number
	// if typePayment is CHEQUE
	paymentDate: string
}
