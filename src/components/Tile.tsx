import Link from 'next/link';

const Tile = ({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) => {
	return (
		<Link
			href={href}
			className={`overflow-hidden rounded-2xl p-4 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover-sheen relative z-20 flex flex-col lg:flex-row gap-1 lg:gap-3  items-center justify-center text-center tile ${className}`}
		>
			{children}
		</Link>
	);
};

export default Tile;
