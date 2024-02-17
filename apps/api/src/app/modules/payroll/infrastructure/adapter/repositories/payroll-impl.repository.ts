import { Injectable } from '@nestjs/common'
import { PaymentType } from '@prisma/client'
import { PrismaService } from '@ocmi/api/app/prisma.service'
import { CreatePayrollDTO } from '@ocmi/api/payroll/application/dto/create-payroll.dto'
import { CreatePayrollHoursCommand } from '@ocmi/api/payroll/domain/models/command/create-payroll-hours'
import { CreatePayrollPaycheckCommand } from '@ocmi/api/payroll/domain/models/command/create-payroll-paycheck'
import { PayrollState as PayrollStateDomain } from '@ocmi/api/payroll/domain/enum/payroll.enum'
import { PayrollRepository } from '@ocmi/api/payroll/domain/repositories/payroll.repository'
import { ResponsePayrollQuery } from '../../../domain/models/query/response-payroll.query'

@Injectable()
export class PayrollImplRepository implements PayrollRepository {
	constructor(private prismaService: PrismaService) {}

	async findPayrollById(id: number): Promise<ResponsePayrollQuery> {
		const payroll = await this.prismaService.payroll.findUnique({
			where: {
				id: Number(id),
			},
		})

		return new ResponsePayrollQuery(
			payroll.id,
			payroll.amount,
			payroll.startDate,
			payroll.endDate,
			payroll.paymentDate,
			payroll.hours,
			payroll.notes,
			payroll.state,
			payroll.idClient,
			payroll.typePayment,
			payroll.idSalary,
		)
	}

	async findAllPayroll(canListAll: boolean, idUser: number): Promise<any> {
		let where = {}

		if (!canListAll) {
			const client = await this.prismaService.client.findUnique({
				where: {
					idUser,
				},
			})

			where = {
				client: {
					id: client.id,
				},
			}
		}

		const result = await this.prismaService.payroll.findMany({ where })
		return result
	}

	async registerPayroll(
		command: CreatePayrollHoursCommand | CreatePayrollPaycheckCommand,
		idUser: number,
	): Promise<void> {
		const client = await this.prismaService.client.findUnique({
			where: {
				idUser,
			},
		})
		await this.prismaService.payroll.create({
			data: {
				client: {
					connect: {
						id: client.id,
					},
				},
				amount: command.amount,
				startDate: (command as CreatePayrollHoursCommand)?.startDate
					? (command as CreatePayrollHoursCommand)?.startDate
					: null,
				endDate: (command as CreatePayrollHoursCommand)?.endDate
					? (command as CreatePayrollHoursCommand)?.endDate
					: null,
				hours: (command as CreatePayrollHoursCommand)?.hours
					? (command as CreatePayrollHoursCommand)?.hours
					: 0,
				state: command?.state as PayrollStateDomain,
				typePayment: command?.typePayment as PaymentType,
				paymentDate: (command as CreatePayrollPaycheckCommand)?.paymentDate
					? (command as CreatePayrollPaycheckCommand)?.paymentDate
					: null,
				notes: null,
				salary: {
					connect: {
						id: 1,
					},
				},
			},
		})
	}

	async updatePayroll(id: number, command: CreatePayrollDTO): Promise<any> {
		const client = await this.prismaService.client.findUnique({
			where: {
				idUser: command.idClient,
			},
		})

		return await this.prismaService.payroll.update({
			where: {
				id: Number(id),
			},
			data: {
				client: {
					connect: {
						id: client.id,
					},
				},
				amount: command.amount,
				startDate: command.startDate,
				endDate: command.endDate,
				hours: command.hours,
				state: command.state as PayrollStateDomain,
				typePayment: command.typePayment as PaymentType,
				paymentDate: command.paymentDate,
				notes: command.notes,
				salary: {
					connect: {
						id: 1,
					},
				},
			},
		})
	}

	async deletePayroll(id: number) {
		const payroll = await this.prismaService.payroll.delete({
			where: {
				id,
			},
		})

		return new ResponsePayrollQuery(
			payroll.id,
			payroll.amount,
			payroll.startDate,
			payroll.endDate,
			payroll.paymentDate,
			payroll.hours,
			payroll.notes,
			payroll.state,
			payroll.idClient,
			payroll.typePayment,
			payroll.idSalary,
		)
	}

	async changeStatus(id: number, state: PayrollStateDomain): Promise<void> {
		await this.prismaService.payroll.update({
			where: {
				id: Number(id),
			},
			data: {
				state,
			},
		})
	}

	async addNotesPayroll(id: number, notes: string): Promise<void> {
		await this.prismaService.payroll.update({
			where: {
				id: Number(id),
			},
			data: {
				notes,
			},
		})
	}
}
