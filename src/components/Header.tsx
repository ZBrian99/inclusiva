import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function Header() {
	return (
		<header className='relative rounded-2xl gradient-navbar p-4 text-white shadow-lg'>
			<div className='flex items-center justify-between gap-4'>
				<div className='flex items-center gap-3'>
					<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-300 text-xl shadow-sm'>
						❤️
					</div>

					<h1 className='text-3xl font-bold text-white'>Inclusiva</h1>
				</div>
				<Link
					href={'/publicar'}
					className='relative overflow-hidden rounded-2xl flex gap-2 items-center gradient-cta px-5 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg'
				>
					<FaPlus />
					Publicar
				</Link>
			</div>
		</header>
	);
}
