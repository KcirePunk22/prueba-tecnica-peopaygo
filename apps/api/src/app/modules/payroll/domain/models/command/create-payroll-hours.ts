export class CreatePayrollHoursCommand {
	constructor(
		public typePayment: string,
		public hours: number,
		public amount: number,
		public startDate: string,
		public endDate: string,
		public state: string,
		public idClient: number,
	) {}
}
