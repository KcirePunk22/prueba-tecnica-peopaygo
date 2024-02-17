import { CreatePayrollService } from '@ocmi/api/payroll/domain/services/create-payroll.service'
import { ChangeStatusPayrollService } from '@ocmi/api/payroll/domain/services/change-status-payroll.service'
import { AddNotesPayrollService } from '@ocmi/api/payroll/domain/services/add-notes-payroll.service'
import { CreatePayrollDTO } from '../dto/create-payroll.dto'
import { Injectable } from '@nestjs/common'
import { PayrollState } from '../../domain/enum/payroll.enum'
import { AddNotePayrollDTO } from '../dto/add-note-payroll.dto'

@Injectable()
export class PayrollService {
	constructor(
		private readonly createPayrollService: CreatePayrollService,
		private readonly changeStatusPayrollService: ChangeStatusPayrollService,
		private readonly addNotesPayrollService: AddNotesPayrollService,
	) {}

	registerPayroll(dto: CreatePayrollDTO, idUser: number) {
		return this.createPayrollService.registerPayroll(dto, idUser)
	}

	changeStatusPayroll(id: number, dto: PayrollState) {
		return this.changeStatusPayrollService.assignStatus(id, dto)
	}

	addNotesPayroll(id: number, dto: AddNotePayrollDTO) {
		return this.addNotesPayrollService.add(id, dto.notes)
	}
}
