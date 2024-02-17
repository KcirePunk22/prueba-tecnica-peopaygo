import { Request } from 'express'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common'
import { CreatePayrollDTO } from '../../application/dto/create-payroll.dto'
import { PayrollService } from '@ocmi/api/payroll/application/services/payroll.service'
import { PayrollState } from '../../domain/enum/payroll.enum'
import { AddNotePayrollDTO } from '../../application/dto/add-note-payroll.dto'
import { VerifyToken } from '../../../auth/infrastructure/guard/verify-token.guard'
import { PayrollToControllerService } from '../services/payroll-to-controller.service'

@Controller({
	path: '/payrolls',
})
export class PayrollController {
	constructor(
		private payrollService: PayrollService,
		private payrollToControllerService: PayrollToControllerService,
	) {}

	@Get()
	@UseGuards(VerifyToken)
	async getPayrolls(@Req() request: Request) {
		const canListAll = request.headers['canlistall']
		const userId = request['payloadJwt']['userId']

		return await this.payrollToControllerService.getPayrolls(
			Boolean(canListAll),
			Number(userId),
		)
	}

	@Get('/:id')
	async getPayrollsById(@Param('id') id: string) {
		return await this.payrollToControllerService.getPayrollsById(Number(id))
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(VerifyToken)
	registerPayroll(@Req() req: Request, @Body() body: CreatePayrollDTO) {
		return this.payrollService.registerPayroll(body, req['payloadJwt']['userId'])
	}

	@Put('/:id')
	@HttpCode(HttpStatus.CREATED)
	updatePayroll(@Param('id') id: string, @Body() body: CreatePayrollDTO) {
		return this.payrollToControllerService.updatePayroll(id, body)
	}

	@Delete('/:id')
	@HttpCode(HttpStatus.CREATED)
	async deletePayroll(@Param('id') id: string) {
		return this.payrollToControllerService.deletePayroll(id)
	}

	@Put('/status/:id/:state')
	@HttpCode(HttpStatus.CREATED)
	changeStatus(@Param('id') id: number, @Param('state') state: string) {
		return this.payrollService.changeStatusPayroll(id, state as PayrollState)
	}

	@Patch('/notes/:id')
	addNotesPayroll(@Param('id') id: number, @Body() body: AddNotePayrollDTO) {
		return this.payrollService.addNotesPayroll(id, body)
	}
}
