'use client'
import { filter, path } from 'ramda'
import { Table, Button, Modal, Select, Tooltip } from 'flowbite-react'
import { FaNoteSticky } from 'react-icons/fa6'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AllowRoles } from '@ocmi/frontend/app/core/roles'
import { FaArrowRight } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { FaPencilAlt } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { FaTrashCan } from 'react-icons/fa6'
import {
	DeletePayrollById,
	GetPayroll,
	ChangeStatePayrollById,
} from '../services/payroll.service'

export default function TablePayroll() {
	const selectdOneRef = useRef<any>(null)
	const selectdTwoRef = useRef<any>(null)
	const { data: session } = useSession()
	console.log(session)

	const [payrollsByHour, setPayrollsByHour] = useState([])
	const [payrollsByCheck, setPayrollsByCheck] = useState([])
	const [deletePayrollAction, setDeletePayrollAction] = useState({
		openModel: false,
		id: 0,
		payrollHours: true,
	})

	const canListAll = () => path(['token', 'rol'], session) === AllowRoles.ADMIN

	const handlerDelete = async () => {
		const payrollDeleted = await DeletePayrollById(deletePayrollAction.id)
		if (deletePayrollAction.payrollHours) {
			const payroll = payrollsByHour.filter(
				(x: any) => Number(x.id) !== payrollDeleted.id,
			)

			setPayrollsByHour(payroll)
		} else {
			const payroll = payrollsByCheck.filter(
				(x: any) => Number(x.id) !== payrollDeleted.id,
			)
			setPayrollsByCheck(payroll)
		}
		setDeletePayrollAction({
			...deletePayrollAction,
			openModel: false,
			id: 0,
		})
	}

	const handlerChangeStatus = async (id: string, value: string) => {
		await ChangeStatePayrollById(id, value)
		selectdOneRef.current.value = value
	}

	const handlerChangeStatus2 = async (id: string, value: string) => {
		await ChangeStatePayrollById(id, value)
		selectdTwoRef.current.value = value
	}

	useEffect(() => {
		const fetchData = async () => {
			const payrolls: any[] = await GetPayroll(canListAll(), (session as any).token.id)
			const isTypePayment = (type: string) => (x: any) => x.typePayment === type
			const payrollHours = filter(isTypePayment('HORAS'), payrolls)
			const payrollCheck = filter(isTypePayment('CHEQUE'), payrolls)
			setPayrollsByHour(payrollHours as any)
			setPayrollsByCheck(payrollCheck as any)
		}

		fetchData()
	}, [])
	return (
		<>
			<div className='flex justify-between items-center'>
				<h2 className='text-gray-800 text-3xl mb-5'>Mis Nominas</h2>

				{session && (session as any).token.rol === AllowRoles.USER && (
					<Link
						href={'/dashboard/payroll/create'}
						className='text-cyan-400 flex justify-start items-center font-bold underline cursor-pointer'>
						<span className='mr-2'>Registrar nomina</span> <FaArrowRight />
					</Link>
				)}
			</div>

			<h2 className='text-gray-800 text-2xl mb-5'>Mis Nominas por horas</h2>

			<div className='overflow-x-auto'>
				<Table>
					<Table.Head>
						<Table.HeadCell className='text-cyan-400'>Tipo de pago</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Fecha Inicio</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>
							Fecha de finalizacion
						</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Monto</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Horas</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Estado</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Notas</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Acciones</Table.HeadCell>
					</Table.Head>
					<Table.Body className='divide-y'>
						{payrollsByHour.map((x: any) => (
							<Table.Row
								key={x.id}
								className='bg-white dark:border-gray-700 dark:bg-gray-800'>
								<Table.Cell>{x.typePayment}</Table.Cell>
								<Table.Cell>{x.startDate}</Table.Cell>
								<Table.Cell>{x.endDate}</Table.Cell>
								<Table.Cell>${x.amount}</Table.Cell>
								<Table.Cell>{x.hours}</Table.Cell>
								<Table.Cell>
									{session &&
										(session as any).token.rol === AllowRoles.USER &&
										`${x.state}`}

									{session && (session as any).token.rol === AllowRoles.ADMIN && (
										<Select
											value={x.state}
											ref={selectdOneRef}
											id='typePayment'
											onChange={(e) => {
												handlerChangeStatus(x.id, e.target.value)
											}}
											name='status'>
											<option value={'CREADO'} disabled>
												CREADO
											</option>
											<option value={'RECHAZADO'}>RECHAZADO</option>
											<option value={'APROBADO'}>APROBADO</option>
										</Select>
									)}
								</Table.Cell>
								<Table.Cell>
									<Tooltip
										content={
											x.notes === '' || x.notes === null || !x.notes
												? 'Sin nota'
												: x.notes
										}
										style='light'>
										<FaNoteSticky />
									</Tooltip>
								</Table.Cell>

								<Table.Cell className='flex justify-start space-x-5'>
									{session && (session as any).token.rol === AllowRoles.USER && (
										<>
											<Link href={`/dashboard/payroll/${x.id}`}>
												<FaPencilAlt className='cursor-pointer' color='green' />
											</Link>

											<FaTrashCan
												onClick={() => {
													setDeletePayrollAction({
														payrollHours: true,
														openModel: true,
														id: x.id,
													})
												}}
												className='cursor-pointer'
												color='red'
											/>
										</>
									)}

									{session && (session as any).token.rol === AllowRoles.ADMIN && (
										<Link href={`/dashboard/payroll/${x.id}`}>
											<FaPlus className='cursor-pointer' />
										</Link>
									)}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>

			<h2 className='text-gray-800 text-2xl my-5'>Mis Nominas por cheque</h2>

			<div className='overflow-x-auto'>
				<Table>
					<Table.Head>
						<Table.HeadCell className='text-cyan-400'>Tipo de pago</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Fecha de pago</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Monto</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Estado</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Notas</Table.HeadCell>

						<Table.HeadCell className='text-cyan-400'>Acciones</Table.HeadCell>
					</Table.Head>
					<Table.Body className='divide-y'>
						{payrollsByCheck.map((x: any) => (
							<Table.Row
								key={x.id}
								className='bg-white dark:border-gray-700 dark:bg-gray-800'>
								<Table.Cell>{x.typePayment}</Table.Cell>
								<Table.Cell>{x.paymentDate}</Table.Cell>
								<Table.Cell>${x.amount}</Table.Cell>
								<Table.Cell>
									{session &&
										(session as any).token.rol === AllowRoles.USER &&
										`${x.state}`}

									{session && (session as any).token.rol === AllowRoles.ADMIN && (
										<Select
											value={x.state}
											ref={selectdTwoRef}
											id='typePayment'
											onChange={(e) => {
												handlerChangeStatus2(x.id, e.target.value)
											}}
											name='status'>
											<option value={'CREADO'} disabled>
												CREADO
											</option>
											<option value={'RECHAZADO'}>RECHAZADO</option>
											<option value={'APROBADO'}>APROBADO</option>
										</Select>
									)}
								</Table.Cell>

								<Table.Cell>
									<Tooltip
										content={
											x.notes === '' || x.notes === null || !x.notes
												? 'Sin nota'
												: x.notes
										}>
										<FaNoteSticky />
									</Tooltip>
								</Table.Cell>
								<Table.Cell className='flex justify-start space-x-5'>
									{session && (session as any).token.rol === AllowRoles.USER && (
										<>
											<Link href={`/dashboard/payroll/${x.id}`}>
												<FaPencilAlt className='cursor-pointer' color='green' />
											</Link>

											<FaTrashCan
												onClick={() => {
													setDeletePayrollAction({
														payrollHours: false,
														openModel: true,
														id: x.id,
													})
												}}
												className='cursor-pointer'
												color='red'
											/>
										</>
									)}

									{session && (session as any).token.rol === AllowRoles.ADMIN && (
										<Link href={`/dashboard/payroll/${x.id}`}>
											<FaPlus className='cursor-pointer' />
										</Link>
									)}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>

			<Modal
				show={deletePayrollAction.openModel}
				onClose={() =>
					setDeletePayrollAction({
						...deletePayrollAction,
						openModel: false,
					})
				}>
				<Modal.Header>¿Desea eliminar este nomina?</Modal.Header>
				<Modal.Footer>
					<Button onClick={() => handlerDelete()} color='red'>
						Eliminar
					</Button>
					<Button
						color='gray'
						onClick={() =>
							setDeletePayrollAction({
								...deletePayrollAction,
								openModel: false,
							})
						}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
