'use client'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ifElse, always } from 'ramda'
import { useEffect, useState } from 'react'
import {
	Button,
	Card,
	Label,
	TextInput,
	Select,
	Toast,
	Textarea,
	Tooltip,
} from 'flowbite-react'
import { HiCheck } from 'react-icons/hi'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import * as Http from '@ocmi/frontend/app/core/http-service'
import {
	GetPayrollById,
	UpdatePayroll,
	AddNotesPayrollById,
} from '../services/payroll.service'
import { useSession } from 'next-auth/react'
import { AllowRoles } from '@ocmi/frontend/app/core/roles'

interface Props {
	params: { id: string }
}

export default function UpdatePayrollPage({ params }: Props) {
	const { data: session } = useSession()
	const [showToast, setShowToast] = useState(false)
	const { handleChange, values, handleSubmit, setFieldValue, errors, setValues } =
		useFormik({
			initialValues: {
				typePayment: '',
				hours: 0,
				amount: 0,
				notes: '',
			},
			onSubmit: (values) => {
				updatePayroll(params.id, {
					...values,
					startDate: dates.startDate,
					endDate: dates.endDate,
					paymentDate: dates.paymentDate,
					idClient: (session as any).token.userId,
				})
			},
			validationSchema: Yup.string().required('Requerido'),
		})
	const [dates, setDates] = useState({
		startDate: dayjs(new Date()),
		endDate: dayjs(new Date()),
		paymentDate: dayjs(new Date()),
		isValid: false,
		error: '',
	})

	const updatePayroll = async (id: string, body: any) => {
		const data: any = session!
		await UpdatePayroll(Number(id), body, data['token']['id'])
		setShowToast(true)
	}

	const handleAddNote = async () => {
		await AddNotesPayrollById(Number(params.id), values.notes)
		setShowToast(true)
	}

	useEffect(() => {
		const getPayrollsById = async () => {
			const response = await GetPayrollById(params.id)

			setValues({
				notes: response.notes || '',
				amount: response.amount,
				hours: response.hours,
				typePayment: response.typePayment,
			})

			setDates({
				...dates,
				startDate: dayjs(response.startDate),
				endDate: dayjs(response.endDate),
				paymentDate: dayjs(response.paymentDate),
			})
		}
		getPayrollsById()
	}, [])

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowToast(false)
		}, 5000)

		return () => clearTimeout(timeout)
	}, [showToast])

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
							name='typePayment'
							disabled={
								(session as any) && (session as any).token.rol === AllowRoles.ADMIN
							}>
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
											disabled={
												(session as any) &&
												(session as any).token.rol === AllowRoles.ADMIN
											}
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
											disabled={
												(session as any) &&
												(session as any).token.rol === AllowRoles.ADMIN
											}
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
								<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
									<DateTimePicker
										value={dates.paymentDate}
										name='paymentDate'
										disabled={
											(session as any) && (session as any).token.rol === AllowRoles.ADMIN
										}
										onChange={(value: any) => {
											setDates({ ...dates, paymentDate: value })
										}}
										viewRenderers={{
											hours: renderTimeViewClock,
											minutes: renderTimeViewClock,
											seconds: renderTimeViewClock,
										}}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</>
					)}
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='hours' value='Horas' />
						</div>
						<TextInput
							id='hours'
							name='hours'
							type='number'
							value={values.hours}
							disabled={
								(session as any) && (session as any).token.rol === AllowRoles.ADMIN
							}
							readOnly
						/>
					</div>

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
							disabled={
								(session as any) && (session as any).token.rol === AllowRoles.ADMIN
							}
							readOnly
						/>
						{errors.amount}
						{errors.amount && <span className='text-red-600'>{errors.amount}</span>}
					</div>

					<div>
						<div className='mb-2 block'>
							<Label htmlFor='amount' value='Notas' />
						</div>

						<Textarea
							id='notes'
							name='notes'
							rows={4}
							value={values.notes}
							onChange={handleChange}
							disabled={
								(session as any) && (session as any).token.rol === AllowRoles.USER
							}
						/>
					</div>
					{session && (session as any).token.rol === AllowRoles.USER && (
						<Button disabled={!dates.isValid} type='submit'>
							Enviar
						</Button>
					)}

					{session && (session as any).token.rol === AllowRoles.ADMIN && (
						<Button type='button' onClick={handleAddNote}>
							Añadir nota
						</Button>
					)}

					{session && (session as any).token.rol === AllowRoles.USER && (
						<Button
							type='button'
							color='light'
							disabled={
								(session as any) && (session as any).token.rol === AllowRoles.ADMIN
							}
							onClick={calculateAmount}>
							Calcular
						</Button>
					)}
				</form>
			</Card>

			<div className='flex justify-end items-end fixed bottom-4 right-4 z-50'>
				{showToast && (
					<Toast>
						<div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
							<HiCheck className='h-5 w-5' />
						</div>
						<div className='ml-3 text-sm font-normal'>
							Nomina actualizada correctamente
						</div>
						<Toast.Toggle />
					</Toast>
				)}
			</div>
		</>
	)
}
