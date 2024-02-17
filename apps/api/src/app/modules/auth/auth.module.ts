import { APP_INTERCEPTOR } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
//infrastructure
import { AuthController } from './infrastructure/controllers/auth.controller'
import { UserImplRepository } from './infrastructure/adapter/repository/user-impl.repository'
import { UserServiceProvider } from './infrastructure/config/bean/auth.bean'
import { JWTImpService } from './infrastructure/lib/jwt'
//application
import { UserService } from './application/services/user.service'
//
import { PrismaService } from '../../prisma.service'
import { HandlerExceptions } from './infrastructure/config/exceptions/handler-exceptions'
import { BcryptImplService } from './infrastructure/lib/bcrypt'
import { CompanyModule } from '../company/company.module'
import { AuthToControllerService } from './infrastructure/services/auth-to-controller.service'

@Module({
	imports: [
		CompanyModule,
		JwtModule.register({
			global: true,
			secret: 'esteesmisecreto',
			signOptions: {
				expiresIn: '30d',
			},
		}),
	],
	controllers: [AuthController],
	providers: [
		PrismaService,
		JWTImpService,
		BcryptImplService,
		UserService,
		UserImplRepository,
		AuthToControllerService,
		...UserServiceProvider,
		{
			provide: APP_INTERCEPTOR,
			useClass: HandlerExceptions,
		},
	],
})
export class AuthModule {}
