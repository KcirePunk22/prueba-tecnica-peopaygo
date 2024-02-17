import React from 'react'
import { Button, TextInput } from 'flowbite-react'

export default function Login() {
	return (
		<div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form>
						<div>
							<TextInput
								type='email'
								name='email'
								placeholder='Email address'
								autoComplete='email'
								required
							/>
						</div>

						<div>
							<TextInput
								type='password'
								name='password'
								placeholder='Password'
								autoComplete='current-password'
								required
							/>
						</div>

						<Button type='submit' color='primary'>
							Sign in
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}
