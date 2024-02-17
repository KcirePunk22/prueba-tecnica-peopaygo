import * as Http from '@ocmi/frontend/app/core/http-client'

export const GetCompanies = async () => {
	return await Http.get('http://localhost:3000/api/companies')
}
