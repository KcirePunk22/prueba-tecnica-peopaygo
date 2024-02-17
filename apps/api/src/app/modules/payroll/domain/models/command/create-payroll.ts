export class CreatePayrollCommand {
	constructor(
		public idClient: number,
		public amount: number,
		public startDate: string,
		public endDate: string,
		public hours: number,
		public state: string,
		public typePayment: string,
		public paymentDate: string,
		public notes?: string,
	) {}
}
