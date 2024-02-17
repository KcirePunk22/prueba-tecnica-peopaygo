import { ResponseRolQuery } from './response-rol-query'

export class ResponseUserQuery {
	constructor(
		public id: number,
		public password: string,
		public idRol: number,
		public rol: ResponseRolQuery,
	) {}
}
