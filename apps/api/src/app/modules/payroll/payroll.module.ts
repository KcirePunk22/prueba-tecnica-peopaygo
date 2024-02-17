import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { PayrollServiceProvider } from './infrastructure/config/bean/payroll.bean'
import { PayrollController } from './infrastructure/controllers/payroll.controller'
import { PayrollImplRepository } from './infrastructure/adapter/repositories/payroll-impl.repository'
import { PayrollService } from './application/services/payroll.service'
import { PayrollToControllerService } from './infrastructure/services/payroll-to-controller.service'

@Module({
	imports: [],
	controllers: [PayrollController],
	providers: [
		PrismaService,
		PayrollImplRepository,
		PayrollService,
		PayrollToControllerService,
		...PayrollServiceProvider,
	],
})
export class PayrollModule {}
