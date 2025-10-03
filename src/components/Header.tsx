import Link from 'next/link';
import { FaHeart, FaQuestionCircle } from 'react-icons/fa';

export default function Header() {
	return (
		<header className='fixed top-0 z-50 w-full bg-card  border-b border-border/50 hover:border-border transition-colors duration-300'>
			<div className='mx-auto max-w-7xl px-6'>
				<div className='flex h-20 items-center justify-between'>
					{/* Logo y marca */}
					<Link href={'/'} className='flex items-center gap-3 group'>
						<div className='bg-violet-600 bg-gradient-to-br from-pink-500 to-violet-600 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3 '>
							<FaHeart className='w-5 h-5 text-white' />
						</div>
						<div className='flex flex-col'>
							<h1 className='font-display text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white via-pink-100 to-violet-200 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:from-pink-200 group-hover:via-pink-300 group-hover:to-violet-500 '>
								Inclusiva
							</h1>
							<span className='hidden us:inline-block text-xs sm:text-sm  text-muted-foreground'>
								Comunidad conectada
							</span>
						</div>
					</Link>

					{/* Botón Guía */}
					<Link
						href={'/guia'}
						className='inline-flex items-center gap-2  font-medium text-muted-foreground hover:text-foreground  transition-all duration-300 text-sm sm:text-base '
					>
						<FaQuestionCircle className='w-4 h-4' />
						<span>Guía de uso</span>
					</Link>
				</div>
			</div>
		</header>
	);
}
