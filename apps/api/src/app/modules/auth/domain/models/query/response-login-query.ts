export class ResponseLoginQuery {
	constructor(
		public readonly token: string,
		public readonly userId: number,
		public readonly rol: string,
	) {}
}
