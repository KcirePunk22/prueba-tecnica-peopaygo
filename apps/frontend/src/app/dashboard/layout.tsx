'use client'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Sidebar from './ui/Sidebar'

export default function DashboardPage({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession()

	if (!session) {
		redirect('/auth/login')
	}

	return (
		<main className='flex'>
			<Sidebar />
			<div className='w-full h-scree bg-cyan-50 p-10'>{children}</div>
		</main>
	)
}
