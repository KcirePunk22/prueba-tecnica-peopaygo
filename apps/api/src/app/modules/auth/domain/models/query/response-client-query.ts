export class ResponseClientQuery {
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly lastName: string,
		public readonly email: string,
		public readonly idUser: number,
	) {}
}
