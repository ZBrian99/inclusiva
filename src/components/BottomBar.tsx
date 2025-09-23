'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaPlus, FaUser } from 'react-icons/fa';

interface BottomBarItem {
	href: string;
	icon: React.ElementType;
	label: string;
	isActive?: boolean;
	isSpecial?: boolean;
}

const BottomBar = () => {
	const pathname = usePathname();

	const items: BottomBarItem[] = [
		{
			href: '/',
			icon: FaHome,
			label: 'Inicio',
			isActive: pathname === '/',
		},
		{
			href: '/publicar',
			icon: FaPlus,
			label: 'Publicar',
			isSpecial: true,
		},
		{
			href: '/perfil',
			icon: FaUser,
			label: 'Perfil',
			isActive: pathname.startsWith('/perfil'),
		},
	];

	return (
		<nav className='fixed z-50  right-0 bottom-4 rounded-2xl'>
			<div className='flex items-center justify-between h-16 gap-22'>
				<div className=' bg-slate-900 p-4 rounded-full md:bg-transparent'>
					{/* <div className=' absolute h-px top-1/2 -translate-y-1/2 bg-white -left-8 -right-8'></div> */}
					<Link href='/publicar' className='flex flex-col items-center justify-center group'>
						{/* Botón CTA destacado */}
						<div className='w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 flex items-center justify-center shadow-lg transform transition-all duration-200 group-hover:scale-105 group-active:scale-95 animate-in hover:animate-none'>
							<FaPlus className='w-7 h-7 text-white ' />
						</div>
						{/* <span className='text-xs text-slate-300 mt-1 font-medium'>{item.label}</span> */}
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default BottomBar;
