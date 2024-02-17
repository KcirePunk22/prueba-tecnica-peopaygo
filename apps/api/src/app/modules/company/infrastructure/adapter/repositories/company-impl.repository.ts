import { Injectable } from '@nestjs/common'
import { PrismaService } from '@ocmi/api/app/prisma.service'
import { CompanyRepository } from '../../../domain/repositories/company.repository'
import { ResponseCompanyByEmployeeQuery } from '../../../domain/models/query/response-company-by-employee.query'
import { ResponseCompanyQuery } from '../../../domain/models/query/response-company.query'

@Injectable()
export class CompanyImplRepository implements CompanyRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findCompanyByEmployee(id: number): Promise<ResponseCompanyByEmployeeQuery> {
		const companyEmployee = await this.prismaService.companyEmployee.findFirst({
			where: { client: { id } },
			include: {
				client: true,
				company: true,
			},
		})

		return new ResponseCompanyByEmployeeQuery(
			companyEmployee.client.name,
			companyEmployee.client.lastName,
			companyEmployee.client.email,
			new ResponseCompanyQuery(
				companyEmployee.company.id,
				companyEmployee.company.name,
				companyEmployee.company.code,
			),
		)
	}

	async asignCompanyToUser(companyId: number, userId: number) {
		await this.prismaService.companyEmployee.create({
			data: {
				client: {
					connect: { id: Number(userId) },
				},
				company: {
					connect: {
						id: Number(companyId),
					},
				},
			},
		})
	}
}
