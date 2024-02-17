import { PayrollRepository } from '../repositories/payroll.repository'

export class AddNotesPayrollService {
	constructor(private readonly payrollRepository: PayrollRepository) {}

	async add(id: number, notes: string) {
		const payroll = await this.payrollRepository.findPayrollById(id)

		if (!payroll) throw new Error('No existe una nomina con ese id')

		await this.payrollRepository.addNotesPayroll(id, notes)
	}
}
