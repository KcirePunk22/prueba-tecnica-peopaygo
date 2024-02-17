export type GetUserResponse = {
	id: number
	name: string
	lastName: string
	email: string
	idUser: number
}

export type ResponseCompanyByEmployeeQuery = {
	name: string
	lastName: string
	email: string
	company: ResponseCompanyQuery
}

export type ResponseCompanyQuery = {
	id: number
	name: string
	code: string
}
