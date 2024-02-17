import { UserRepository } from '@ocmi/api/auth/domain/repositories/user.repository'
import { ResponseIdQuery } from '@ocmi/api/app/shared/domain/models/query/response-id-query'
import { UpdateUserCommand } from '../models/command/update-user'

export class UpdateUserService {
	constructor(private readonly userRepository: UserRepository) {}

	async update(id: number, command: UpdateUserCommand) {
		const client = await this.userRepository.findClientById(Number(id))

		if (!client) throw new Error('No existe un cliente con ese id')

		await this.userRepository.update(Number(id), command)

		return new ResponseIdQuery(id)
	}
}
