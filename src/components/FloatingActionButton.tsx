'use client';
import Link from 'next/link';
import { FaPlus, FaShieldAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function FloatingActionButton() {
	const [isFooterVisible, setIsFooterVisible] = useState(false);

	useEffect(() => {
		const footer = document.querySelector('footer');
		if (!footer) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsFooterVisible(entry.isIntersecting);
			},
			{
				rootMargin: '0px 0px -50px 0px', // Se activa 50px antes de que el footer sea visible
				threshold: 0
			}
		);

		observer.observe(footer);

		return () => observer.disconnect();
	}, []);

    return (
			<div
				className={`fixed right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
					isFooterVisible ? 'bottom-32' : 'bottom-6'
				}`}
			>
				{/* Botón pequeño para Admin */}
				<Link
					href='/admin/posts'
					className='bg-gradient-to-br from-teal-500 to-blue-600 flex h-12 w-12 items-center justify-center rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition '
					aria-label='Ir al panel de admin'
				>
					<FaShieldAlt className='w-5 h-5 text-white' />
				</Link>

				{/* Botón principal de crear */}
				<Link
					href='/publicaciones/crear'
					className='bg-gradient-to-br from-pink-500 to-violet-600 flex h-16 w-16 items-center justify-center rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition'
					aria-label='Crear nueva publicación'
				>
					<FaPlus className='w-6 h-6 text-white' />
				</Link>
			</div>
		);
}
