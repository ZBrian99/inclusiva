import Link from 'next/link';
import { FaPlus, FaHeart } from 'react-icons/fa';

export default function Header() {
	return (
		<header className='fixed top-0 z-50 w-full bg-card  border-b border-border/50 hover:border-border transition-colors duration-300'>
			<div className='mx-auto max-w-7xl px-6'>
				<div className='flex h-20 items-center justify-between'>
					{/* Logo y marca */}
					<Link href={'/'} className='flex items-center gap-3 group'>
						<div className='bg-gradient-to-br from-pink-500 to-violet-600 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3 '>
							<FaHeart className='w-5 h-5 text-white' />
						</div>
						<div className='flex flex-col'>
							<h1 className='font-display text-2xl font-semibold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:from-pink-500 group-hover:to-violet-500 '>
								Inclusiva
							</h1>
							<span className='hidden us:inline-block us:text-sm  text-muted-foreground group-hover:text-gray-300 transition-colors duration-300'>
								Comunidad conectada
							</span>
						</div>
					</Link>

					{/* CTA Button */}
					<Link
						href={'/publicaciones/new'}
						className='bg-gradient-to-br  from-blue-500 to-violet-600 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:from-blue-600 hover:to-violet-700 relative overflow-hidden group text-sm sm:text-base'
					>
						<FaPlus className='w-4 h-4 relative z-10' />
						<span className='relative z-10'>Publicar</span>
					</Link>
				</div>
			</div>
		</header>
	);
}
