import { ResponseIdQuery } from '@ocmi/api/app/shared/domain/models/query/response-id-query'
import { UserRepository } from '../repositories/user.repository'

export class DeleteUserService {
	constructor(private readonly userRepository: UserRepository) {}

	async remove(id: number) {
		const client = await this.userRepository.findClientById(id)

		if (!client) throw new Error('No existe un cliente con ese id')

		await this.userRepository.delete(client.idUser)
		return new ResponseIdQuery(id)
	}
}
