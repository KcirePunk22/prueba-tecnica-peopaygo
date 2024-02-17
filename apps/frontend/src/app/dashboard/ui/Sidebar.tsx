'use client'
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BsCashCoin } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { BiSolidLogOut } from 'react-icons/bi'
import { AllowRoles } from '../../core/roles'

const Sidebar = () => {
	const { data: session } = useSession()
	const router = useRouter()

	const handlerLogout = () => {
		signOut({
			redirect: false,
		})
		router.push('/')
	}

	return (
		<div className='h-screen bg-white w-64'>
			<div className='px-8 py-4'>
				<img src='https://peopaygo.com/wp-content/uploads/2023/03/logo-2.png' alt='' />
				<div className='flex flex-col justify-between'>
					<ul className='mt-4'>
						<li>
							<Link
								href={'/dashboard/payroll'}
								className='flex justify-start cursor-pointer items-center bg-cyan-50 text-cyan-400 font-bold hover:bg-gray-700 hover:text-white px-4 py-2 rounded'>
								<BsCashCoin className='mr-4' />
								<span className='-mt-1'>Nominas</span>
							</Link>
						</li>

						{session && (session as any).token.rol === AllowRoles.ADMIN && (
							<li>
								<Link
									href={'/dashboard/user'}
									className='flex justify-start cursor-pointer items-center bg-cyan-50 text-cyan-400 font-bold hover:bg-gray-700 hover:text-white px-4 py-2 rounded'>
									<FaUserCircle className='mr-4' />
									<span className='-mt-1'>Usuarios</span>
								</Link>
							</li>
						)}
					</ul>

					<ul className='mt-4'>
						<li>
							<button
								onClick={handlerLogout}
								className='flex justify-start cursor-pointer items-center bg-cyan-50 text-cyan-400 font-bold hover:bg-gray-700 hover:text-white px-4 py-2 rounded'>
								<BiSolidLogOut className='mr-4' />
								<span className='-mt-1'>Cerrar Sesion</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
