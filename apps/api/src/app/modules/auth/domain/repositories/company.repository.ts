export interface CompanyRepository {
	asignCompanyToUser(companyId: number, userId: number): Promise<void>
}
