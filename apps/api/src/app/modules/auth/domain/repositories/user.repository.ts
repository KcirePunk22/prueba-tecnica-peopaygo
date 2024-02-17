import { CreateUserCommand } from '../models/command/create-user'
import { UpdateUserCommand } from '../models/command/update-user'
import { ResponseClientQuery } from '../models/query/response-client-query'
import { ResponseEmployeeQuery } from '../models/query/response-employee.query'
import { ResponseRolQuery } from '../models/query/response-rol-query'
import { ResponseUserQuery } from '../models/query/response-user-query'

export interface UserRepository {
	findRolById(id: number): Promise<ResponseRolQuery>
	findUserById(id: number): Promise<ResponseUserQuery>
	findClientById(id: number): Promise<ResponseClientQuery>
	findEmailByClient(email: string): Promise<ResponseClientQuery>
	findEmailByEmployee(email: string): Promise<ResponseEmployeeQuery>
	save(command: CreateUserCommand): Promise<number>
	update(id: number, command: UpdateUserCommand): Promise<void>
	delete(id: number): Promise<void>
}
