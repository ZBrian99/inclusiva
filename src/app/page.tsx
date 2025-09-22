import Header from '@/components/Header';
import BentoGrid from '@/components/BentoGrid';
import Footer from '@/components/Footer';

export default function Home() {
	return (
		<main className='mx-auto max-w-5xl p-6 flex flex-col gap-6'>
			<Header />
			<BentoGrid />
			<Footer />
		</main>
	);
}
