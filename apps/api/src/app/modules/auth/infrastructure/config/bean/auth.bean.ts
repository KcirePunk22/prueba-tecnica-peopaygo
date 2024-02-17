import { Provider } from '@nestjs/common'
//infrastructure
import { JWTImpService } from '@ocmi/api/auth/infrastructure/lib/jwt'
import { BcryptImplService } from '@ocmi/api/auth/infrastructure/lib/bcrypt'
import { UserImplRepository } from '@ocmi/api/auth/infrastructure/adapter/repository/user-impl.repository'
import { CompanyImplRepository } from '@ocmi/api/company/infrastructure/adapter/repositories/company-impl.repository'
//domain
import { LoginService } from '@ocmi/api/auth/domain/services/login.service'
import { CreateUserService } from '@ocmi/api/auth/domain/services/create-user.service'
import { UpdateUserService } from '@ocmi/api/auth/domain/services/update-user.service'
import { DeleteUserService } from '@ocmi/api/auth/domain/services/delete-user.service'

export const UserServiceProvider: Provider[] = [
	{
		provide: LoginService,
		useFactory: (
			jwtImpService: JWTImpService,
			bcryptImplService: BcryptImplService,
			userRepository: UserImplRepository,
		) => {
			return new LoginService(jwtImpService, bcryptImplService, userRepository)
		},
		inject: [JWTImpService, BcryptImplService, UserImplRepository],
	},
	{
		provide: CreateUserService,
		useFactory: (
			userRepository: UserImplRepository,
			companyImplRepository: CompanyImplRepository,
			bcryptImplService: BcryptImplService,
		) => {
			return new CreateUserService(
				userRepository,
				companyImplRepository,
				bcryptImplService,
			)
		},
		inject: [UserImplRepository, CompanyImplRepository, BcryptImplService],
	},
	{
		provide: UpdateUserService,
		useFactory: (userRepository: UserImplRepository) => {
			return new UpdateUserService(userRepository)
		},
		inject: [UserImplRepository],
	},
	{
		provide: DeleteUserService,
		useFactory: (userRepository: UserImplRepository) => {
			return new DeleteUserService(userRepository)
		},
		inject: [UserImplRepository],
	},
]
