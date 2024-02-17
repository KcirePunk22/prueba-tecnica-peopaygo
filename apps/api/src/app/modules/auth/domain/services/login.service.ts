import { JwtLib } from '../lib/jwt.lib'
import { BcryptLib } from '../lib/bcrypt.lib'
import { LoginCommand } from '../models/command/login.command'
import { UserRepository } from '../repositories/user.repository'
import { JwtPayload } from '../types/auth.types'
import { AllowUser } from '../enum/auth.enum'
import { ResponseLoginQuery } from '../models/query/response-login-query'

export class LoginService {
	constructor(
		private readonly JwtService: JwtLib,
		private readonly bcryptLib: BcryptLib,
		private readonly userRepository: UserRepository,
	) {}

	async signIn({ typeUser, email, password }: LoginCommand) {
		const client = await this.selectUser(typeUser, email)

		if (!client) throw new Error(`Credenciales incorrectas`)

		const user = await this.userRepository.findUserById(client.idUser)

		if (!user) throw new Error('Este cliente no tiene un usuario asociado')

		const isValid = await this.verifyCredentials(password, user.password)
		console.log({ isValid })

		if (!isValid) throw new Error('Credenciales incorrectas')

		const token = await this.generateJWT(email, user.idRol, user.id)
		return new ResponseLoginQuery(token, user.id, user.rol.name)
	}

	private async selectUser(typeUser: AllowUser, email: string) {
		if (typeUser === AllowUser.CLIENT) {
			return await this.userRepository.findEmailByClient(email)
		}

		if (typeUser === AllowUser.EMPLOYEE) {
			return await this.userRepository.findEmailByEmployee(email)
		}

		throw new Error('Tipo de usuario no permitido')
	}

	private async verifyCredentials(
		password: string,
		encryptedPassword: string,
	): Promise<boolean> {
		console.log({
			password,
			encryptedPassword,
		})

		return await this.bcryptLib.compare(password, encryptedPassword)
	}

	private async generateJWT(
		email: string,
		idRol: number,
		userId: number,
	): Promise<string> {
		return await this.JwtService.signIn<JwtPayload>({ sub: email, rol: idRol, userId })
	}
}
