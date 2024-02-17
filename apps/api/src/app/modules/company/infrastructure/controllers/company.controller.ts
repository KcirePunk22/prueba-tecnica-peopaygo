import { Controller, Get } from '@nestjs/common'
import { PrismaService } from '@ocmi/api/app/prisma.service'

@Controller({
	path: '/companies',
})
export class CompanyController {
	constructor(private prismaService: PrismaService) {}

	@Get()
	async getAllCompanies() {
		return await this.prismaService.company.findMany()
	}
}
