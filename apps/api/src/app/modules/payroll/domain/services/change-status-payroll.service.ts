import { PayrollRepository } from '@ocmi/api/payroll/domain/repositories/payroll.repository'
import { PayrollState } from '@ocmi/api/payroll/domain/enum/payroll.enum'

export class ChangeStatusPayrollService {
	constructor(private readonly payrollRepository: PayrollRepository) {}

	async assignStatus(id: number, state: PayrollState) {
		const payroll = await this.payrollRepository.findPayrollById(id)

		if (!payroll) throw new Error('No existe una nomina con ese id')

		await this.payrollRepository.changeStatus(id, state)
	}
}
