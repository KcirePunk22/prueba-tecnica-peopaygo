import { Provider } from '@nestjs/common'
//infrastructure
import { PayrollImplRepository } from '@ocmi/api/payroll/infrastructure/adapter/repositories/payroll-impl.repository'
//domain
import { CreatePayrollService } from '@ocmi/api/payroll/domain/services/create-payroll.service'
import { ChangeStatusPayrollService } from '@ocmi/api/payroll/domain/services/change-status-payroll.service'
import { AddNotesPayrollService } from '@ocmi/api/payroll/domain/services/add-notes-payroll.service'

export const PayrollServiceProvider: Provider[] = [
	{
		provide: CreatePayrollService,
		useFactory: (payrollImplRepository: PayrollImplRepository) => {
			return new CreatePayrollService(payrollImplRepository)
		},
		inject: [PayrollImplRepository],
	},
	{
		provide: ChangeStatusPayrollService,
		useFactory: (payrollImplRepository: PayrollImplRepository) => {
			return new ChangeStatusPayrollService(payrollImplRepository)
		},
		inject: [PayrollImplRepository],
	},
	{
		provide: AddNotesPayrollService,
		useFactory: (payrollImplRepository: PayrollImplRepository) => {
			return new AddNotesPayrollService(payrollImplRepository)
		},
		inject: [PayrollImplRepository],
	},
]
