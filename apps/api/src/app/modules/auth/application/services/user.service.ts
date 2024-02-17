import { Injectable } from '@nestjs/common'
import { LoginService } from '@ocmi/api/auth/domain/services/login.service'
import { CreateUserService } from '@ocmi/api/auth/domain/services/create-user.service'
import { UpdateUserService } from '@ocmi/api/auth/domain/services/update-user.service'
import { DeleteUserService } from '@ocmi/api/auth/domain/services/delete-user.service'
import { CreateUserDTO } from '../dto/create-user.dto'
import { LoginDTO } from '../dto/login.dto'
import { CreateUserCommand } from '../../domain/models/command/create-user'
import { UpdateUserCommand } from '../../domain/models/command/update-user'
import { UpdateUserDTO } from '../dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(
		private readonly loginService: LoginService,
		private readonly createUserService: CreateUserService,
		private readonly updateUserService: UpdateUserService,
		private readonly deleteUserService: DeleteUserService,
	) {}

	login(dto: LoginDTO) {
		return this.loginService.signIn(dto)
	}

	createUser(dto: CreateUserDTO) {
		return this.createUserService.save(
			new CreateUserCommand(
				dto.name,
				dto.lastName,
				dto.email,
				dto.password,
				dto.companyId,
			),
		)
	}

	updateUser(id: number, dto: UpdateUserDTO) {
		return this.updateUserService.update(
			id,
			new UpdateUserCommand(dto.name, dto.lastName, dto.companyId),
		)
	}

	deleteUser(id: number) {
		return this.deleteUserService.remove(id)
	}
}
