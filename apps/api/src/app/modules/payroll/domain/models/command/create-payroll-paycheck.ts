export class CreatePayrollPaycheckCommand {
	constructor(
		public typePayment: string,
		public paymentDate: string,
		public amount: number,
		public state: string,
		public idClient: number,
	) {}
}
