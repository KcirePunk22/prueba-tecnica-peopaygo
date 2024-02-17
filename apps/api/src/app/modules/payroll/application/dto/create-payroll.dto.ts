import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreatePayrollDTO {
	idClient: number
	amount: number
	startDate: string
	endDate: string
	hours: number
	state: string
	typePayment: string
	paymentDate: string
	notes?: string
}
