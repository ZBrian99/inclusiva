import Link from 'next/link';

type TileProps = { href: string; className?: string; children: React.ReactNode };

const Tile = ({ href, className, children }: TileProps) => {
	return (
		<Link
			href={href}
			className={`relative z-20 flex flex-col items-center justify-center text-center rounded-2xl overflow-hidden p-4 md:p-5 lg:p-6 transition-transform duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:scale-[1.02] focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 shadow-sm ${className ?? ''}`}
		>
			{children}
		</Link>
	);
};

export default Tile;
