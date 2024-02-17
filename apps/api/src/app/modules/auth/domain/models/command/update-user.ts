export class UpdateUserCommand {
	constructor(
		public name: string,
		public lastName: string,
		public companyId: number,
	) {}
}
