import { Injectable } from '@nestjs/common'
import { PrismaService } from '@ocmi/api/app/prisma.service'
import { UserRepository } from '@ocmi/api/auth/domain/repositories/user.repository'
import { ResponseClientQuery } from '../../../domain/models/query/response-client-query'
import { ResponseRolQuery } from '../../../domain/models/query/response-rol-query'
import { ResponseEmployeeQuery } from '../../../domain/models/query/response-employee.query'
import { ResponseUserQuery } from '../../../domain/models/query/response-user-query'
import { CreateUserCommand } from '../../../domain/models/command/create-user'
import { UpdateUserCommand } from '../../../domain/models/command/update-user'

@Injectable()
export class UserImplRepository implements UserRepository {
	constructor(private prismaService: PrismaService) {}

	async findRolById(id: number): Promise<ResponseRolQuery> {
		const rol = await this.prismaService.rol.findUnique({
			where: {
				id: Number(id),
			},
		})

		if (!rol) {
			return null
		}

		return new ResponseRolQuery(rol.id, rol.name, rol.description)
	}

	async findEmailByClient(email: string): Promise<ResponseClientQuery> {
		const client = await this.prismaService.client.findFirst({
			where: {
				email,
			},
		})

		if (!client) {
			return null
		}

		return new ResponseClientQuery(
			client.id,
			client.name,
			client.lastName,
			client.email,
			client.idUser,
		)
	}

	async findEmailByEmployee(email: string): Promise<ResponseEmployeeQuery> {
		const employee = await this.prismaService.employee.findFirst({
			where: {
				email,
			},
		})

		if (!employee) {
			return null
		}

		return new ResponseEmployeeQuery(
			employee.id,
			employee.name,
			employee.lastName,
			employee.email,
			employee.idUser,
		)
	}

	async findClientById(id: number): Promise<ResponseClientQuery> {
		const client = await this.prismaService.client.findUnique({
			where: {
				id,
			},
		})

		if (!client) {
			return null
		}

		return new ResponseClientQuery(
			client.id,
			client.name,
			client.lastName,
			client.email,
			client.idUser,
		)
	}

	async findUserById(id: number): Promise<ResponseUserQuery> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id,
			},
			include: {
				rol: true,
			},
		})

		if (!user) {
			return null
		}

		return new ResponseUserQuery(
			user.id,
			user.password,
			user.idRol,
			new ResponseRolQuery(user.rol.id, user.rol.name, user.rol.description),
		)
	}

	async save(command: CreateUserCommand): Promise<number> {
		const userDb = await this.prismaService.user.create({
			data: {
				password: command.password,
				rol: {
					connect: { id: 2 },
				},
			},
		})

		const clientDb = await this.prismaService.client.create({
			data: {
				name: command.name,
				lastName: command.lastName,
				email: command.email,
				user: {
					connect: {
						id: userDb.id,
					},
				},
			},
		})

		return clientDb.id
	}

	async update(id: number, command: UpdateUserCommand): Promise<void> {
		const client = await this.prismaService.client.update({
			where: { id },
			data: {
				name: command.name,
				lastName: command.lastName,
			},
		})

		const companyEmployee = await this.prismaService.companyEmployee.findFirst({
			where: {
				client: {
					id: client.id,
				},
			},
		})

		await this.prismaService.companyEmployee.update({
			data: {
				company: {
					connect: { id: Number(command.companyId) },
				},
			},
			where: {
				id: companyEmployee.id,
			},
		})
	}

	async delete(id: number): Promise<void> {
		await this.prismaService.user.delete({
			where: { id },
		})
	}
}
