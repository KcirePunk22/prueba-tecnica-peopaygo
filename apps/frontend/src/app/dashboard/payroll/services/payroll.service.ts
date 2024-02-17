import env from '@ocmi/frontend/app/core/env'
import {
	HttpGet,
	HttpPost,
	HttpPut,
	HttpDelete,
	HttpPatch,
} from '@ocmi/frontend/app/core/http-client'

export const GetPayroll = async (canListAll: boolean, token: string) => {
	return await HttpGet<any>(`${env.BASE_URL}/payrolls`, {
		headers: {
			canlistall: canListAll,
			authorization: `Bearer ${token}`,
		},
	})
}

export const GetPayrollById = async (id: string) => {
	return await HttpGet<any>(`${env.BASE_URL}/payrolls/${id}`)
}

export const RegisterPayroll = async (data: any, token: string) => {
	return await HttpPost(`${env.BASE_URL}/payrolls`, data, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	})
}

export const UpdatePayroll = async (id: number, data: any, token: string) => {
	return await HttpPut(`http://localhost:3000/api/payrolls/${id}`, data, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	})
}

export const ChangeStatePayrollById = async (id: string, state: string) => {
	return await HttpPut<any>(`${env.BASE_URL}/payrolls/status/${id}/${state}`)
}

export const DeletePayrollById = async (id: number) => {
	return await HttpDelete<any>(`${env.BASE_URL}/payrolls/${id}`)
}

export const AddNotesPayrollById = async (id: number, notes: string) => {
	return await HttpPatch<any>(`${env.BASE_URL}/payrolls/notes/${id}`, {
		notes,
	})
}
