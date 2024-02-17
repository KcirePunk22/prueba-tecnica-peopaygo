import { Injectable } from '@nestjs/common'
import { PrismaService } from '@ocmi/api/app/prisma.service'
import { CompanyImplRepository } from '../../../company/infrastructure/adapter/repositories/company-impl.repository'

@Injectable()
export class AuthToControllerService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly companyImplRepository: CompanyImplRepository,
	) {}

	async getUser() {
		return await this.prismaService.client.findMany()
	}

	async findCompanyByEmployee(id: number) {
		return await this.companyImplRepository.findCompanyByEmployee(id)
	}
}
