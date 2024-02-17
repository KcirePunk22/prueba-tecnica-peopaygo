export default function SectionInfo() {
	return (
		<section className='container mx-auto mt-16 grid grid-cols-7 gap-10 grid-rows-1'>
			<div className='col-span-4 grid grid-cols-2 gap-6'>
				<div>
					<img
						src='https://peopaygo.com/wp-content/uploads/2023/03/auto-payroll.png'
						alt='auto-payroll'
					/>
					<h3 className='text-2xl font-bold my-4'>Nominas automaticas</h3>
					<p className='text-lg text-gray-600'>
						Nuestro servicio automático de nóminas se encarga de todo, permitiéndole
						disfrutar de una gestión de nóminas sin preocupaciones.
					</p>
				</div>

				<div>
					<img
						src='https://peopaygo.com/wp-content/uploads/2023/03/hr-resources.png'
						alt='auto-payroll'
					/>
					<h3 className='text-2xl font-bold my-4'>Recursos Humanos</h3>
					<p className='text-lg text-gray-600'>
						Nuestro equipo de expertos ofrece una solución de RR.HH. de servicio completo
						personalizada para satisfacer sus necesidades.
					</p>
				</div>

				<div className='mt-10'>
					<img
						src='https://peopaygo.com/wp-content/uploads/2023/03/employer-dashboard.png'
						alt='auto-payroll'
					/>
					<h3 className='text-2xl font-bold my-4'>Employer Dashboard</h3>
					<p className='text-lg text-gray-600'>
						Nuestros asesores de nóminas ofrecen asistencia 24 horas al día, 7 días a la
						semana, para que pueda gestionar a sus empleados desde cualquier lugar con
						facilidad.
					</p>
				</div>

				<div className='mt-10'>
					<img
						src='https://peopaygo.com/wp-content/uploads/2023/03/workers-compensation.png'
						alt='auto-payroll'
					/>
					<h3 className='text-2xl font-bold my-4'>Indemnización por accidente laboral</h3>
					<p className='text-lg text-gray-600'>
						Nuestro sistema garantiza el cumplimiento de la legislación estatal en materia
						de compensación de los trabajadores sin pagos excesivos ni complejidades
						mediante el sistema de pago por uso.
					</p>
				</div>
			</div>

			<div className='col-start-5 col-span-full flex justify-center items-center'>
				<img
					className='w-90 absolute'
					src='https://peopaygo.com/wp-content/uploads/2023/03/employee-onboarding-1.png'
					alt='Cellphone logo'
				/>
				{/* <h3 className='text-5xl font-bold text-center mb-16'>Agilice sus nóminas</h3>
				<p className='text-gray-500 text-2xl'>
					Simplifique sus nóminas con facilidad, tanto si prefiere gestionarlas usted
					mismo como si deja que nuestro equipo de expertos se encargue de ello por usted.
				</p> */}
			</div>
		</section>
	)
}
