import { Injectable } from '@nestjs/common'
import { PayrollImplRepository } from '../adapter/repositories/payroll-impl.repository'
import { CreatePayrollDTO } from '../../application/dto/create-payroll.dto'
import { ResponseIdQuery } from '@ocmi/api/app/shared/domain/models/query/response-id-query'

@Injectable()
export class PayrollToControllerService {
	constructor(private payrollImplRepository: PayrollImplRepository) {}

	getPayrolls(canListAll: boolean, userId: number) {
		return this.payrollImplRepository.findAllPayroll(Boolean(canListAll), Number(userId))
	}

	getPayrollsById(id: number) {
		return this.payrollImplRepository.findPayrollById(id)
	}

	updatePayroll(id: string, body: CreatePayrollDTO) {
		return this.payrollImplRepository.updatePayroll(Number(id), body)
	}

	async deletePayroll(id: string) {
		const payroll = await this.payrollImplRepository.deletePayroll(Number(id))
		return new ResponseIdQuery(payroll.id)
	}
}
