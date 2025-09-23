import { FaWhatsapp, FaHeart, FaUsers, FaQuestionCircle } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className='border-t border-border/50 bg-card bottom-0 mt-auto'>
			<div className='container mx-auto px-3 py-6'>
				<div className='flex flex-col items-center justify-between gap-4'>
					{/* Enlaces principales */}
					<div className='flex items-center gap-6 text-sm'>
						<a
							href='https://wa.me/5492236032601'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors duration-300'
						>
							<FaWhatsapp className='w-4 h-4' />
							Contacto
						</a>

						<a
							href='/guia'
							className='flex items-center gap-2 text-muted-foreground hover:text-violet-500 transition-colors duration-300'
						>
							<FaQuestionCircle className='w-4 h-4' />
							Guía de uso
						</a>

						<a
							href='https://wa.me/5492236032601'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors duration-300'
						>
							<FaUsers className='w-4 h-4' />
							Comunidad
						</a>
					</div>

					{/* Copyright */}
					<a
						href='https://wa.me/5492236032601'
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-2 text-xs text-muted-foreground hover:text-gray-200 transition-colors duration-300 group'
					>
						<span>Desarrollado con </span>
						<FaHeart className='w-4 h-4 text-red-500 group-hover:scale-110 transition-transform duration-300' />
						<span> por Evelyn Castellano</span>
					</a>
				</div>
			</div>
		</footer>
	);
}
