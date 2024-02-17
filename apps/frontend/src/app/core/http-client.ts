import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

type MethodType = 'get' | 'post' | 'put' | 'delete'

const httpRequest = async <T, D>(
	method: MethodType,
	url: string,
	data?: D,
): Promise<T> => {
	const response: AxiosResponse<T> = await axios[method]<T>(url, data)
	return response.data
}

export const get = async <T, D>(url: string): Promise<T> => {
	return await httpRequest<T, D>('get', url)
}

export const HttpGet = <T>(url: string, otps: AxiosRequestConfig = {}) => {
	return axios.get<T>(url, otps).then((response) => response.data)
}

export const post = async <T, D>(url: string, data: D): Promise<T> => {
	return await httpRequest<T, D>('post', url, data)
}

export const HttpPost = <T>(url: string, data?: T, otps: AxiosRequestConfig = {}) => {
	return axios.post(url, data, otps).then((response) => response.data)
}

export const HttpPut = <T>(url: string, data?: T, otps: AxiosRequestConfig = {}) => {
	return axios.put(url, data, otps).then((response) => response.data)
}

export const HttpPatch = <T>(url: string, data?: T, otps: AxiosRequestConfig = {}) => {
	return axios.patch(url, data, otps).then((response) => response.data)
}

export const HttpDelete = <T>(url: string, otps: AxiosRequestConfig = {}) => {
	return axios.delete<T>(url, otps).then((response) => response.data)
}

export const del = async <T, D>(url: string): Promise<T> => {
	return await httpRequest<T, D>('delete', url)
}

export const put = async <T, D>(url: string, data: D): Promise<T> => {
	return await httpRequest<T, D>('put', url, data)
}
