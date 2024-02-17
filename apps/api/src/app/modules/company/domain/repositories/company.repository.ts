import { ResponseCompanyByEmployeeQuery } from '../models/query/response-company-by-employee.query'

export interface CompanyRepository {
	asignCompanyToUser(companyId: number, userId: number): Promise<void>
	findCompanyByEmployee(id: number): Promise<ResponseCompanyByEmployeeQuery>
}
