import { AllowUser } from '../../enum/auth.enum'

export class LoginCommand {
	typeUser: AllowUser
	email: string
	password: string
}
