import Header from '@/components/Header';
import BentoGrid from '@/components/BentoGrid';
import Footer from '@/components/Footer';

export default function Home() {
	return (
		<main className='mx-auto max-w-5xl p-4 h-[100svh] flex flex-col gap-4'>
			<Header />
			<BentoGrid />
			<Footer />
		</main>
	);
}
