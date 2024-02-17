'use client'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { LoginService } from '../services/auth.service'
import { SetToken } from '../services/local-storage.service'
import { Spinner } from 'flowbite-react'
import { useState } from 'react'

export default function LoginPage() {
	const query = useSearchParams()
	const search = query!.get('rol') || 'client'

	return (
		<div className='flex justify-center items-center w-full h-screen'>
			{search === 'client' ? <LoginClient /> : <LoginEmployee />}
		</div>
	)
}

export const LoginClient = () => {
	const router = useRouter()
	const [isLoading, setLoading] = useState(false)
	const {
		values,
		handleChange,
		handleBlur,
		handleSubmit,
		touched,
		errors,
		setFieldError,
	} = useFormik({
		initialValues: {
			email: '',
			password: '',
			typeUser: 'CLIENT',
		},
		validationSchema: Yup.object().shape({
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
			setLoading(true)

			signIn('credentials', {
				...values,
				redirect: false,
			}).then((resp) => {
				if (resp?.ok === false) {
					handlerLoginFail()
				} else {
					handlerLoginSuccess()
				}
			})
		},
	})

	const handlerLoginSuccess = async () => {
		setLoading(false)
		router.push('/dashboard/payroll')
	}

	const handlerLoginFail = () => {
		setLoading(false)
		setFieldError('password', 'Credenciales incorrecta')
	}

	return (
		<Card className='container max-w-[400px]'>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='email' value='Email' />
					</div>
					<TextInput
						id='email'
						name='email'
						type='text'
						value={values.email}
						onBlur={handleBlur}
						onChange={handleChange}
					/>
					{touched.email && errors.email && (
						<span className='text-red-600'>{errors.email}</span>
					)}
				</div>
				<div>
					<div className='mb-2 block'>
						<Label htmlFor='password' value='Contraseña' />
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
				<Button disabled={isLoading} type='submit'>
					{!isLoading ? 'Iniciar Sesion' : <Spinner />}
				</Button>
			</form>
		</Card>
	)
}

export const LoginEmployee = () => {
	const router = useRouter()
	const [isLoading, setLoading] = useState(false)
	const {
		values,
		handleChange,
		handleSubmit,
		handleBlur,
		touched,
		errors,
		setFieldError,
	} = useFormik({
		initialValues: {
			email: '',
			password: '',
			typeUser: 'EMPLOYEE',
		},
		validationSchema: Yup.object().shape({
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
			setLoading(true)
			signIn('credentials', {
				...values,
				redirect: false,
			}).then((resp) => {
				if (resp?.ok === false) {
					handlerLoginFail()
				} else {
					handlerLoginSuccess()
				}
			})
		},
	})

	const handlerLoginSuccess = () => {
		router.push('/dashboard/payroll')
	}

	const handlerLoginFail = () => {
		setLoading(false)
		setFieldError('password', 'Credenciales incorrecta')
	}

	return (
		<div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl p-10'>
			<img
				className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg'
				src='https://peopaygo.com/wp-content/uploads/2023/03/logo-2.png'
				alt=''
			/>
			<div className='flex flex-col justify-between p-4 leading-normal'>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='email' value='Email' />
						</div>
						<TextInput
							id='email'
							name='email'
							type='text'
							value={values.email}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
						{touched.email && errors.email && (
							<span className='text-red-600'>{errors.email}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='password' value='Contraseña' />
						</div>
						<TextInput
							id='password'
							name='password'
							type='password'
							onBlur={handleBlur}
							value={values.password}
							onChange={handleChange}
						/>
						{touched.password && errors.password && (
							<span className='text-red-600'>{errors.password}</span>
						)}
					</div>
					<Button disabled={isLoading} type='submit'>
						{!isLoading ? 'Iniciar Sesion' : <Spinner />}
					</Button>
				</form>
			</div>
		</div>
	)
}
