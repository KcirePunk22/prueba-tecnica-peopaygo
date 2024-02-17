import { UserRepository } from '@ocmi/api/auth/domain/repositories/user.repository'
import { BcryptLib } from '@ocmi/api/auth/domain/lib/bcrypt.lib'
import { CompanyRepository } from '@ocmi/api/company/domain/repositories/company.repository'
import { ResponseIdQuery } from '@ocmi/api/app/shared/domain/models/query/response-id-query'
import { CreateUserCommand } from '../models/command/create-user'

export class CreateUserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly companyRepository: CompanyRepository,
		private readonly bcryptLib: BcryptLib,
	) {}

	async save(command: CreateUserCommand): Promise<ResponseIdQuery> {
		const client = await this.userRepository.findEmailByClient(command.email)

		if (client) throw new Error('Ya existe un cliente con este email')

		const encryptedPassword = await this.bcryptLib.hash(command.password)

		const userId = await this.userRepository.save({
			...command,
			password: encryptedPassword,
		})

		await this.companyRepository.asignCompanyToUser(Number(command.companyId), userId)
		return new ResponseIdQuery(userId)
	}
}
