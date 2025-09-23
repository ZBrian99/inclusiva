import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='mx-auto max-w-6xl p-4 sm:p-6 flex flex-col gap-6'>
			<Header />

			<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
				{/* Compact cards with image + bottom overlay text */}
				<Link
					href='/publicaciones/productos'
					className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200'
				>
					<img
						src={
							'https://image.pollinations.ai/prompt/' +
							encodeURIComponent('colorful community market stall, inclusive vibes, modern minimal photography, vibrant yet soft colors, high quality, natural lighting, centered composition') +
							'?width=1200&height=800&model=flux-realism&enhance=true&nologo=true&seed=123'
						}
						alt='Productos'
						className='h-48 sm:h-56 lg:h-64 w-full object-cover'
					/>
					<div className='pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white'>
						<div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40' />
						<div className='relative'>
							<h2 className='text-base font-semibold'>Productos</h2>
							<p className='text-xs opacity-90'>Compra y venta de artículos nuevos y usados.</p>
						</div>
					</div>
				</Link>

				<Link
					href='/publicaciones/servicios'
					className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200'
				>
					<img
						src={
							'https://image.pollinations.ai/prompt/' +
							encodeURIComponent('people collaborating on services, inclusive community center, modern clean design, professional photography, bright lighting, high quality') +
							'?width=1200&height=800&model=flux-realism&enhance=true&nologo=true&seed=456'
						}
						alt='Servicios'
						className='h-48 sm:h-56 lg:h-64 w-full object-cover'
					/>
					<div className='pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white'>
						<div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40' />
						<div className='relative'>
							<h2 className='text-base font-semibold'>Servicios</h2>
							<p className='text-xs opacity-90'>Profesionales y oficios para lo que necesites.</p>
						</div>
					</div>
				</Link>

				<Link
					href='/publicaciones/eventos'
					className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200'
				>
					<img
						src={
							'https://image.pollinations.ai/prompt/' +
							encodeURIComponent('pride friendly local event, lgbt community gathering outdoors, modern clean photography, bright and welcoming, high quality') +
							'?width=1200&height=800&model=flux-realism&enhance=true&nologo=true&seed=789'
						}
						alt='Eventos'
						className='h-48 sm:h-56 lg:h-64 w-full object-cover'
					/>
					<div className='pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white'>
						<div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40' />
						<div className='relative'>
							<h2 className='text-base font-semibold'>Eventos</h2>
							<p className='text-xs opacity-90'>Agenda cultural y actividades de la ciudad.</p>
						</div>
					</div>
				</Link>

				<Link
					href='/publicaciones/pedidos'
					className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200'
				>
					<img
						src={
							'https://image.pollinations.ai/prompt/' +
							encodeURIComponent('minimal magnifying glass and list, clean flatlay, soft light, modern aesthetic, high quality') +
							'?width=1200&height=800&model=flux-realism&enhance=true&nologo=true&seed=321'
						}
						alt='Pedidos'
						className='h-48 sm:h-56 lg:h-64 w-full object-cover'
					/>
					<div className='pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white'>
						<div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40' />
						<div className='relative'>
							<h2 className='text-base font-semibold'>Pedidos</h2>
							<p className='text-xs opacity-90'>Publicá lo que necesitás y recibí ofertas.</p>
						</div>
					</div>
				</Link>

				<Link
					href='/publicaciones/cursos'
					className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200'
				>
					<img
						src={
							'https://image.pollinations.ai/prompt/' +
							encodeURIComponent('modern learning desk with laptop, clean minimal, soft light, high quality') +
							'?width=1200&height=800&model=flux-realism&enhance=true&nologo=true&seed=654'
						}
						alt='Cursos'
						className='h-48 sm:h-56 lg:h-64 w-full object-cover'
					/>
					<div className='pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white'>
						<div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40' />
						<div className='relative'>
							<h2 className='text-base font-semibold'>Cursos</h2>
							<p className='text-xs opacity-90'>Aprendizajes y capacitaciones para todos.</p>
						</div>
					</div>
				</Link>

				<Link
					href='/publicaciones/usados'
					className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200'
				>
					<img
						src={
							'https://image.pollinations.ai/prompt/' +
							encodeURIComponent('second-hand market clothes rack, minimal aesthetic, soft light, high quality') +
							'?width=1200&height=800&model=flux-realism&enhance=true&nologo=true&seed=987'
						}
						alt='Usados'
						className='h-48 sm:h-56 lg:h-64 w-full object-cover'
					/>
					<div className='pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white'>
						<div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40' />
						<div className='relative'>
							<h2 className='text-base font-semibold'>Usados</h2>
							<p className='text-xs opacity-90'>Reutilizá y ahorrá con cosas en buen estado.</p>
						</div>
					</div>
				</Link>
			</section>

			<Footer />
		</main>
	);
}
