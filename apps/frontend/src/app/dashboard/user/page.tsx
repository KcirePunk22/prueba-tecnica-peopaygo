'use client'

import { useSession } from 'next-auth/react'
import TableUsers from './components/TableUser'
import { AllowRoles } from '../../core/roles'
import { useRouter } from 'next/navigation'

export default function UserPage() {
	const router = useRouter()
	const { data: session } = useSession()

	if (session && (session as any).token.rol === AllowRoles.USER) {
		router.push('/dashboard/payroll')
	}

	return <TableUsers />
}
