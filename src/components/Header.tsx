import Link from 'next/link';

export default function Header() {
	return (
		<header className='relative rounded-2xl gradient-navbar p-4 text-white shadow-lg'>
			<div className='flex items-center justify-between gap-4'>
				<div className='flex items-center gap-3'>
					<span aria-hidden className='text-2xl sm:text-3xl leading-none'>
						❤
					</span>
					<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl font-display '>Inclusiva</h1>
				</div>
				<Link
					href={'/publicar'}
					className='btn-cta gradient-cta rounded-xl px-4 py-2 text-sm font-semibold transition sm:text-base'
				>
					Publicar
				</Link>
			</div>
		</header>
	);
}
