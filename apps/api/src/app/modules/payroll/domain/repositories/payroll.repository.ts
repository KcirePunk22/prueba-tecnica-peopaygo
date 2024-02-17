import { PayrollState } from '../enum/payroll.enum'
import { CreatePayrollHoursCommand } from '../models/command/create-payroll-hours'
import { CreatePayrollPaycheckCommand } from '../models/command/create-payroll-paycheck'
import { ResponsePayrollQuery } from '../models/query/response-payroll.query'

export interface PayrollRepository {
	findPayrollById(id: number): Promise<ResponsePayrollQuery>
	registerPayroll(
		command: CreatePayrollHoursCommand | CreatePayrollPaycheckCommand,
		idUser: number,
	): Promise<void>
	addNotesPayroll(id: number, notes: string): Promise<void>
	changeStatus(id: number, state: PayrollState): Promise<void>
}
