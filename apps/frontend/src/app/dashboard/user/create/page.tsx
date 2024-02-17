'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Toast } from 'flowbite-react'
import { HiCheck } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { Button, Card, Label, TextInput, Select } from 'flowbite-react'
import { GetCompanies } from '../services/company.service'
import { CreateUserService } from '../services/user.service'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AllowRoles } from '@ocmi/frontend/app/core/roles'

export default function CreatePayrollHome() {
	const router = useRouter()
	const { data: session } = useSession()

	if (session && (session as any).token.rol === AllowRoles.USER) {
		router.push('/dashboard/payroll')
	}

	const [showToast, setShowToast] = useState(false)
	const {
		handleChange,
		values,
		handleSubmit,
		handleBlur,
		setFieldError,
		resetForm,
		errors,
		touched,
	} = useFormik({
		initialValues: {
			name: '',
			lastName: '',
			email: '',
			password: '',
			companyId: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Nombre es requerido'),
			lastName: Yup.string().required('Apellido es requerido'),
			email: Yup.string()
				.required('Email es requerido')
				.email('Verifique que sea un email valido'),
			password: Yup.string()
				.required('La contraseña es requerida')
				.min(8, 'La contraseña debe tener al menos 8 caracteres')
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
					'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
				),
		}),
		onSubmit: async (values) => {
			await handleSaveUser(values)
		},
	})

	const handleSaveUser = async (values: any) => {
		try {
			await CreateUserService(values)
			resetForm()
			setShowToast(true)
		} catch (error: any) {
			if (error.response.data.statusCode === 400) {
				setFieldError('email', error.response.data.message)
			}
		}
	}

	const [companies, setCompanies] = useState([])

	useEffect(() => {
		GetCompanies().then((resp: any) => {
			setCompanies(resp)
		})
	}, [])

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowToast(false)
		}, 5000)

		return () => clearTimeout(timeout)
	}, [showToast])

	return (
		<>
			<h2 className='text-gray-800 text-3xl mb-5'>Registrar Usuario</h2>
			<Card className='max-w-sm'>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='name' value='Nombre' />
						</div>
						<TextInput
							id='name'
							name='name'
							type='text'
							value={values.name}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>

					{touched.name && errors.name && (
						<span className='text-red-600'>{errors.name}</span>
					)}

					<div>
						<div className='mb-2 block'>
							<Label htmlFor='lastName' value='Apellidos' />
						</div>
						<TextInput
							id='lastName'
							name='lastName'
							type='text'
							value={values.lastName}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>

					{touched.lastName && errors.lastName && (
						<span className='text-red-600'>{errors.lastName}</span>
					)}
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='email' value='Correo electronico' />
						</div>
						<TextInput
							id='email'
							name='email'
							type='text'
							addon='@'
							onBlur={handleBlur}
							value={values.email}
							onChange={handleChange}
						/>

						{touched.email && errors.email && (
							<span className='text-red-600'>{errors.email}</span>
						)}
					</div>

					<div>
						<div className='mb-2 block'>
							<Label htmlFor='password' value='Asignar contraseña' />
						</div>
						<TextInput
							id='password'
							name='password'
							type='password'
							value={values.password}
							onBlur={handleBlur}
							onChange={handleChange}
						/>

						{touched.password && errors.password && (
							<span className='text-red-600'>{errors.password}</span>
						)}
					</div>

					<div>
						<div className='mb-2 block'>
							<Label htmlFor='companyId' value='Compañias' />
						</div>
						<Select
							id='companyId'
							value={values.companyId}
							onBlur={handleBlur}
							onChange={handleChange}
							name='companyId'>
							<option value={''} disabled>
								Seleccione una opcion
							</option>
							{companies.map((x: any) => (
								<option key={x.id} value={x.id}>
									{x.name}
								</option>
							))}
						</Select>
					</div>
					<Button type='submit'>Enviar</Button>
				</form>
			</Card>

			<div className='flex justify-end items-end fixed bottom-4 right-4 z-50'>
				{showToast && (
					<Toast>
						<div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
							<HiCheck className='h-5 w-5' />
						</div>
						<div className='ml-3 text-sm font-normal'>Usuario creado correctamente</div>
						<Toast.Toggle />
					</Toast>
				)}
			</div>
		</>
	)
}
