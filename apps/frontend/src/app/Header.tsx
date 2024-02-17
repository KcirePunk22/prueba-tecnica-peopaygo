'use client'
import { useState } from 'react'
import { ifElse, equals, always } from 'ramda'
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownItem, Button } from 'flowbite-react'

enum TypeUser {
	CLIENT = 'Sucursal personas',
	EMPLOYEE = 'Sucursal empleados',
}

export default function header() {
	const router = useRouter()
	const [selectedDropdownItem, setSelectedDropdownItem] = useState<TypeUser>(
		TypeUser.CLIENT,
	)

	const handleRedirectLogin = () => {
		const rol = ifElse(equals(selectedDropdownItem), always('employee'), always('client'))
		return () => router.push(`/auth/login?rol=${rol(TypeUser.EMPLOYEE)}`)
	}

	return (
		<header className='bg-white w-full px-8 py-3 flex justify-between items-center shadow shadow-bottom-lg'>
			<div className='w-64'>
				<img
					src='https://peopaygo.com/wp-content/uploads/2023/03/logo-2.png'
					alt='Logo peopaygo'
					className='w-full'
				/>
			</div>

			<div className='flex space-x-1 rounded-lg border-2 shadow-md p-1'>
				<Dropdown
					className='border-black'
					color='none'
					label={selectedDropdownItem}
					dismissOnClick={false}>
					<DropdownItem onClick={() => setSelectedDropdownItem(TypeUser.CLIENT)}>
						Sucursal personas
					</DropdownItem>
					<DropdownItem onClick={() => setSelectedDropdownItem(TypeUser.EMPLOYEE)}>
						Sucursal empleados
					</DropdownItem>
				</Dropdown>

				<Button pill color='blue' onClick={handleRedirectLogin()}>
					Login
				</Button>
			</div>
		</header>
	)
}
