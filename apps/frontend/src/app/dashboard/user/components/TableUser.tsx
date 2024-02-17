'use client'
import { Table, Button, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { FaPencilAlt } from 'react-icons/fa'
import { FaTrashCan } from 'react-icons/fa6'
import { GetUser, deleteUserService } from '../services/user.service'

export default function TableUsers() {
	const [users, setUser] = useState([])
	const [deleteUserAction, setDeleteUserAction] = useState({
		openModel: false,
		id: 0,
	})

	useEffect(() => {
		GetUser().then((resp: any) => setUser(resp))
	}, [])

	const deleteUser = async () => {
		const userDeleted: any = await deleteUserService(deleteUserAction.id)
		const user = users.filter((x: any) => x.id !== userDeleted.id)
		setUser(user)
		setDeleteUserAction({
			openModel: false,
			id: 0,
		})
	}

	return (
		<>
			<div className='flex justify-between items-center'>
				<h2 className='text-gray-800 text-3xl mb-5'>Usuarios</h2>
				<Link
					href={'/dashboard/user/create'}
					className='text-cyan-400 flex justify-start items-center font-bold underline cursor-pointer'>
					<span className='mr-2'>Registrar usuario</span> <FaArrowRight />
				</Link>
			</div>

			<div className='overflow-x-auto'>
				<Table>
					<Table.Head>
						<Table.HeadCell className='text-cyan-400'>Nombre</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Apellido</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Correo electronico</Table.HeadCell>
						<Table.HeadCell className='text-cyan-400'>Acciones</Table.HeadCell>
					</Table.Head>
					<Table.Body className='divide-y'>
						{users.map((x: any) => (
							<Table.Row
								key={x.id}
								className='bg-white dark:border-gray-700 dark:bg-gray-800'>
								<Table.Cell>{x.name}</Table.Cell>
								<Table.Cell>{x.lastName}</Table.Cell>
								<Table.Cell>{x.email}</Table.Cell>
								<Table.Cell className='flex justify-start space-x-5'>
									<Link href={`/dashboard/user/${x.id}`}>
										<FaPencilAlt className='cursor-pointer' color='green' />
									</Link>

									<FaTrashCan
										onClick={() =>
											setDeleteUserAction({
												...deleteUserAction,
												openModel: true,
												id: x.id,
											})
										}
										className='cursor-pointer'
										color='red'
									/>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>

			<Modal
				show={deleteUserAction.openModel}
				onClose={() =>
					setDeleteUserAction({
						...deleteUserAction,
						openModel: false,
					})
				}>
				<Modal.Header>¿Desea eliminar este usuario?</Modal.Header>
				<Modal.Footer>
					<Button onClick={deleteUser} color='red'>
						Eliminar
					</Button>
					<Button
						color='gray'
						onClick={() =>
							setDeleteUserAction({
								...deleteUserAction,
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
