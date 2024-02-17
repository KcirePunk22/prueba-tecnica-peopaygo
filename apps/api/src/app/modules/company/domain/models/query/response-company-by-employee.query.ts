import { ResponseCompanyQuery } from './response-company.query'

export class ResponseCompanyByEmployeeQuery {
	constructor(
		public readonly name: string,
		public readonly lastName: string,
		public readonly email: string,
		public readonly company: ResponseCompanyQuery,
	) {}
}
