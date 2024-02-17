export class ResponsePayrollQuery {
	constructor(
		public readonly id: number,
		public readonly amount: number,
		public readonly startDate: Date,
		public readonly endDate: Date,
		public readonly paymentDate: Date,
		public readonly hours: number,
		public readonly notes: string,
		public readonly state: string,
		public readonly idClient: number,
		public readonly typePayment: string,
		public readonly idSalary: number,
	) {}
}
