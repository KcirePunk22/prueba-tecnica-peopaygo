import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient, Company, Rol, Salary } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super()
	}

	async onModuleInit() {
		await this.$connect()
		await this.createCompaniesIfNeeded()
		await this.createRolesIfNeeded()
		await this.createAdminIfNeeded()
		await this.createSalariesIfNeeded()
	}

	async createCompaniesIfNeeded() {
		const companiesToCreate: Partial<Company>[] = [
			{ name: 'Aumento de Beneficios en Nómina - Empresa XYZ', code: 'BENEFXYZ2024' },
			{ name: 'Programa de Retención de Empleados - Empresa ABC', code: 'RETENABC2024' },
			{ name: 'Reconocimiento por Desempeño - Empresa QRS', code: 'RECONQRS2024' },
			{ name: 'Bonificación de Fin de Año - Empresa DEF', code: 'BONFINDEF2024' },
			{ name: 'Incentivos por Productividad - Empresa GHI', code: 'INCPRODGHI2024' },
		]

		for (const companyData of companiesToCreate) {
			const existingCompany = await this.company.findFirst({
				where: {
					OR: [{ name: companyData.name }, { code: companyData.code }],
				},
			})

			if (!existingCompany) {
				await this.company.create({
					data: companyData as any,
				})
			}
		}
	}

	async createRolesIfNeeded() {
		const rolesToCreate: Partial<Rol>[] = [
			{ name: 'ADMIN', description: 'Rol de administradores' },
			{ name: 'USER', description: 'Rol para cliente' },
		]

		for (const roleData of rolesToCreate) {
			const existingRole = await this.rol.findFirst({
				where: {
					name: roleData.name,
				},
			})

			if (!existingRole) {
				await this.rol.create({
					data: roleData as any,
				})
			}
		}
	}

	async createAdminIfNeeded() {
		const adminEmployee = await this.employee.findFirst({
			where: {
				id: 1,
			},
		})

		if (!adminEmployee) {
			const newUser = await this.user.create({
				data: {
					password: '$2b$10$Ie/PKBt7qdvOa7bCfZeNIe1EAUYiZ0RP69oAWLQtxUI8HWbZhC1CS',
					rol: {
						connect: {
							id: 1,
						},
					},
				},
			})

			await this.employee.create({
				data: {
					name: 'Nombre del Administrador',
					lastName: 'Apellido del Administrador',
					email: 'admin@gmail.com',
					user: {
						connect: {
							id: newUser.id,
						},
					},
				},
			})
		}
	}

	async createSalariesIfNeeded() {
		const salariesToCreate: Partial<Salary>[] = [
			{ typePayment: 'HORAS', country: 'USA', city: 'FLORIDA', amount: 12 },
			{ typePayment: 'CHEQUE', country: 'USA', city: 'FLORIDA', amount: 480 },
		]

		for (const salaryData of salariesToCreate) {
			const existingSalary = await this.salary.findFirst({
				where: salaryData,
			})

			if (!existingSalary) {
				await this.salary.create({
					data: salaryData as any,
				})
			}
		}
	}
}
