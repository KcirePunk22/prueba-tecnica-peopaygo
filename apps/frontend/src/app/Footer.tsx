export default function Footer() {
	return (
		<footer className='bg-blue-950 w-full mt-36 px-20 py-10 text-white '>
			<div className='border-b-2 pb-10 opacity-80 w-full grid grid-cols-4 gap-6'>
				<div>
					<img
						src='https://peopaygo.com/wp-content/uploads/2023/10/PPG-logo-white-based-1.png'
						alt='Peopaygo'
						width='200'
					/>
					<p className='text-lg mt-4 leading-7 opacity-80'>
						Ponemos los paquetes de beneficios de las grandes empresas al alcance de las
						pequeñas y medianas empresas. y medianas empresas.
					</p>
				</div>
				<div className='space-y-2'>
					<h4 className='text-2xl font-bold mb-4'>Campaña</h4>
					<p className='text-lg opacity-80'>Home</p>
					<p className='text-lg opacity-80'>About Us</p>
					<p className='text-lg opacity-80'>Contact</p>
					<p className='text-lg opacity-80'>Privacy Policy</p>
					<p className='text-lg opacity-80'>Terms & Conditions</p>
				</div>
				<div className='space-y-2'>
					<h4 className='text-2xl font-bold mb-4'>Características</h4>
					<p className='text-lg opacity-80'>Home</p>
					<p className='text-lg opacity-80'>About Us</p>
					<p className='text-lg opacity-80'>Contact</p>
					<p className='text-lg opacity-80'>Privacy Policy</p>
					<p className='text-lg opacity-80'>Terms & Conditions</p>
				</div>
				<div className='space-y-2'>
					<h4 className='text-2xl font-bold mb-4'>Resources</h4>
					<p className='text-lg opacity-80'>Home</p>
					<p className='text-lg opacity-80'>About Us</p>
					<p className='text-lg opacity-80'>Contact</p>
					<p className='text-lg opacity-80'>Privacy Policy</p>
					<p className='text-lg opacity-80'>Terms & Conditions</p>
				</div>
			</div>

			<p className='mt-10 opacity-80'>
				&copy; {new Date().getFullYear()} PEOPayGo - All rights reserved
			</p>
		</footer>
	)
}
