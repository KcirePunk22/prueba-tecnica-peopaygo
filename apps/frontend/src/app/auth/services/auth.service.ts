import * as Http from '@ocmi/frontend/app/core/http-client'
import env from '../../core/env'

export const LoginService = async (
	typeUser: string,
	email: string,
	password: string,
): Promise<string> => {
	return Http.post(`${env.BASE_URL}/auth/login`, {
		typeUser,
		email,
		password,
	})
}

export const VerifyToken = async (): Promise<string> => {
	return Http.get(`http://localhost:3000/api/auth/verify`)
}
