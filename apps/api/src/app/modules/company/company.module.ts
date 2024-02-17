import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { CompanyController } from './infrastructure/controllers/company.controller'
import { CompanyImplRepository } from './infrastructure/adapter/repositories/company-impl.repository'

@Module({
	imports: [],
	controllers: [CompanyController],
	providers: [PrismaService, CompanyImplRepository],
	exports: [CompanyImplRepository],
})
export class CompanyModule {}
