import * as Http from '@ocmi/frontend/app/core/http-client'
import env from '@ocmi/frontend/app/core/env'
import { GetUserResponse, ResponseCompanyByEmployeeQuery } from '../types/user.type'

export const GetUser = async () => {
	return await Http.HttpGet<GetUserResponse[]>(`${env.BASE_URL}/auth/users`)
}

export const GetUserById = async (id: number) => {
	return await Http.HttpGet<ResponseCompanyByEmployeeQuery>(
		`${env.BASE_URL}/auth/users/${id}`,
	)
}

export const CreateUserService = async (user: any) => {
	return await Http.HttpPost(`${env.BASE_URL}/auth/users`, user)
}

export const UpdateUserService = async (id: number, user: any) => {
	return await Http.HttpPut(`${env.BASE_URL}/auth/users/${id}`, user)
}

export const deleteUserService = async (id: number) => {
	return await Http.HttpDelete(`${env.BASE_URL}/auth/users/${id}`)
}
