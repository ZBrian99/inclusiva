'use client';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
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
		<Link
			href='/publicaciones/new'
			className={`fixed right-6 z-50 bg-violet-600 bg-gradient-to-br from-pink-500 to-violet-600 flex h-16 w-16 items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group ${
				isFooterVisible ? 'bottom-32' : 'bottom-6'
			}`}
			aria-label='Crear nueva publicación'
		>
			<FaPlus className='w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300' />
		</Link>
	);
}
