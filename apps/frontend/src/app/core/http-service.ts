import axios, { AxiosError, AxiosResponse } from 'axios'
import * as R from 'ramda'

type MethodType = 'get' | 'post' | 'put' | 'delete'

const httpRequest = async <T, D>(
	method: MethodType,
	url: string,
	data?: D,
): Promise<T> => {
	try {
		const response: AxiosResponse<T> = await axios[method]<T>(url, data)
		return response.data
	} catch (error: any) {
		throw new Error(`Error ${method} request to ${url}: ${error.message}`)
	}
}

export const get = R.curry(async <T, D>(url: string): Promise<T> => {
	return await httpRequest<T, D>('get', url)
})

export const post = R.curry(async <T, D>(url: string, data: D): Promise<T> => {
	return await httpRequest<T, D>('post', url, data)
})

export const del = R.curry(async <T, D>(url: string): Promise<T> => {
	return await httpRequest<T, D>('delete', url)
})

export const put = R.curry(async <T, D>(url: string, data: D): Promise<T> => {
	return await httpRequest<T, D>('put', url, data)
})
