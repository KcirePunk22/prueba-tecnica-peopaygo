import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'
import { AuthModule } from './modules/auth/auth.module'
import { PayrollModule } from './modules/payroll/payroll.module'
import { CompanyModule } from './modules/company/company.module'
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
//import { PrismaModule } from 'nestjs-prisma';

@Module({
	imports: [AuthModule, PayrollModule, CompanyModule],
	controllers: [AppController],
	providers: [
		AppService,
		PrismaService,
		// HelloCommand
	],
})
export class AppModule {}
