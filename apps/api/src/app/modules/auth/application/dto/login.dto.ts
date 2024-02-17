import { AllowUser } from '../../domain/enum/auth.enum'

export class LoginDTO {
	typeUser: AllowUser
	email: string
	password: string
}
