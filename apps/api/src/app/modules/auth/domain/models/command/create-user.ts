export class CreateUserCommand {
	constructor(
		public name: string,
		public lastName: string,
		public email: string,
		public password: string,
		public companyId: string,
	) {}
}
