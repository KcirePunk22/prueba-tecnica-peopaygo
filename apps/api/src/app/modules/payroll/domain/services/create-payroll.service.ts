import { PayrollRepository } from '@ocmi/api/payroll/domain/repositories/payroll.repository'
import { PayrollState, TypePayment } from '../enum/payroll.enum'
import { CreatePayrollHoursCommand } from '../models/command/create-payroll-hours'
import { CreatePayrollPaycheckCommand } from '../models/command/create-payroll-paycheck'
import { CreatePayrollCommand } from '../models/command/create-payroll'

export class CreatePayrollService {
	constructor(private readonly payrollRepository: PayrollRepository) {}

	async registerPayroll(dto: CreatePayrollCommand, idClient: number) {
		if (dto.typePayment === TypePayment.HOURS) {
			const commandObj = new CreatePayrollHoursCommand(
				dto.typePayment,
				dto.hours,
				dto.amount,
				dto.startDate as string,
				dto.endDate,
				PayrollState.CREADO,
				idClient,
			)
			await this.payrollRepository.registerPayroll(commandObj, idClient)
		}

		if (dto.typePayment === TypePayment.PAYCHECK) {
			const commandObj = new CreatePayrollPaycheckCommand(
				dto.typePayment,
				dto.paymentDate,
				480,
				PayrollState.CREADO,
				idClient,
			)
			await this.payrollRepository.registerPayroll(commandObj, idClient)
		}
	}
}
