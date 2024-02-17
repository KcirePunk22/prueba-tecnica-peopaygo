'use client'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ifElse, always } from 'ramda'
import { useEffect, useState } from 'react'
import { HiCheck } from 'react-icons/hi'
import { Alert, Button, Card, Label, TextInput, Select, Toast } from 'flowbite-react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import * as Http from '@ocmi/frontend/app/core/http-service'
import { useSession } from 'next-auth/react'
import { RegisterPayroll } from '../services/payroll.service'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function CreatePayrollHome() {
	const [showToast, setShowToast] = useState(false)
	const { data: session } = useSession()

	const { handleChange, values, handleSubmit, setFieldValue, errors, resetForm } =
		useFormik({
			initialValues: {
				typePayment: '',
				hours: 0,
				amount: 0,
			},
			onSubmit: (values) => {
				registerPayroll({
					...values,
					startDate: dates.startDate,
					endDate: dates.endDate,
					paymentDate: dates.paymentDate,
					idClient: 1,
					state: 'CREADO',
				})
			},
			validationSchema: Yup.string().required('Requerido'),
		})

	const registerPayroll = async (body: any) => {
		const data: any = session!
		await RegisterPayroll(body, data.token['id'])
		setShowToast(true)
		resetForm()
	}

	const [dates, setDates] = useState({
		startDate: dayjs(new Date()),
		endDate: dayjs(new Date()),
		paymentDate: dayjs(new Date()),
		isValid: false,
		error: '',
	})

	const handlerChangeStatus = () => {}

	const calculateAmount = () => {
		const errorMessage = ifElse(
			() => dates.startDate.isAfter(dates.endDate),
			always('La fecha de la finalizacion no puede ser antes que la fecha inicial'),
			always(''),
		)()

		setDates({ ...dates, error: errorMessage, isValid: true })

		const hoursDifference = dates.endDate.diff(dates.startDate, 'hour')
		const salary = hoursDifference * 12

		setFieldValue('hours', hoursDifference)
		setFieldValue('amount', salary)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowToast(false)
		}, 5000)

		return () => clearTimeout(timeout)
	}, [showToast])

	return (
		<>
			<h2 className='text-gray-800 text-3xl mb-5'>Registrar Nomina</h2>
			<Card className='max-w-sm'>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='typePayment' value='Tipo de pago' />
						</div>
						<Select
							value={values.typePayment}
							id='typePayment'
							onChange={handleChange}
							name='typePayment'>
							<option value={''} disabled>
								Seleccione una opcion
							</option>
							<option value={'HORAS'}>Horas</option>
							<option value={'CHEQUE'}>Cheque</option>
						</Select>
					</div>
					{values.typePayment === 'HORAS' && (
						<>
							<div>
								<div className='mb-2 block'>
									<Label htmlFor='startDate' value='Fecha de inicio' />
								</div>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
										<DateTimePicker
											value={dates.startDate}
											name='startDate'
											onChange={(value: any) => {
												setDates({ ...dates, startDate: value })
											}}
											viewRenderers={{
												hours: renderTimeViewClock,
												minutes: renderTimeViewClock,
												seconds: renderTimeViewClock,
											}}
										/>
									</DemoContainer>
								</LocalizationProvider>
							</div>

							<div>
								<div className='mb-2 block'>
									<Label
										className={dates.error ? 'text-red-600' : ''}
										value='Fecha de finalizacion'
									/>
								</div>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
										<DateTimePicker
											name='endDate'
											value={dates.endDate}
											onChange={(value: any) => setDates({ ...dates, endDate: value })}
											viewRenderers={{
												hours: renderTimeViewClock,
												minutes: renderTimeViewClock,
												seconds: renderTimeViewClock,
											}}
										/>
									</DemoContainer>
								</LocalizationProvider>
								{dates.error && <span className='text-red-600'>{dates.error}</span>}
							</div>
						</>
					)}
					{values.typePayment === 'CHEQUE' && (
						<>
							<div className='block'>
								<Label htmlFor='paymentDate' value='Fecha de pago' />
							</div>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={['DatePicker']}>
									<DatePicker className='w-full' label='Basic date picker' />
								</DemoContainer>
							</LocalizationProvider>
						</>
					)}
					{values.typePayment === 'HORAS' && (
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='hours' value='Horas' />
							</div>
							<TextInput
								id='hours'
								name='hours'
								type='number'
								value={values.hours}
								readOnly
							/>
						</div>
					)}

					{values.typePayment === 'HORAS' && (
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='amount' value='Monto' />
							</div>
							<TextInput
								id='amount'
								name='amount'
								type='number'
								addon='$'
								value={values.amount}
								readOnly
							/>
							{errors.amount}
							{errors.amount && <span className='text-red-600'>{errors.amount}</span>}
						</div>
					)}

					<Button
						disabled={!dates.isValid && values.typePayment === 'HORAS'}
						type='submit'>
						Enviar
					</Button>

					{values.typePayment === 'HORAS' && (
						<Button type='button' color='light' onClick={calculateAmount}>
							Calcular
						</Button>
					)}
				</form>

				{values.typePayment === 'CHEQUE' && (
					<Alert withBorderAccent>
						<span>
							<span className='font-medium'>Nota: </span> Las nominas por cheque tiene un
							valor de $480.00
						</span>
					</Alert>
				)}
			</Card>

			<div className='flex justify-end items-end fixed bottom-4 right-4 z-50'>
				{showToast && (
					<Toast>
						<div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
							<HiCheck className='h-5 w-5' />
						</div>
						<div className='ml-3 text-sm font-normal'>Nomina creado correctamente</div>
						<Toast.Toggle />
					</Toast>
				)}
			</div>
		</>
	)
}
