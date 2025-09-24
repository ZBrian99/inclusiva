import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import { CategoryProvider } from '@/contexts/CategoryContext';

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-poppins',
	subsets: ['latin'],
	display: 'swap',
});

const inter = Inter({
	variable: '--font-inter-sans',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Inclusiva',
	description:
		'Plataforma comunitaria para publicar y encontrar eventos, servicios, productos, cursos y más con enfoque inclusivo y diverso.',
	keywords: [
		'Mar del Plata',
		'inclusivo',
		'diverso',
		'comunidad',
		'eventos',
		'servicios',
		'productos',
		'cursos',
		'emprendimientos',
	],
	authors: [{ name: 'Evelyn Castellano' }, { name: 'Inclusiva' }],
	creator: 'Evelyn Castellano',
	publisher: 'Inclusiva',
	openGraph: {
		title: 'Inclusiva',
		description:
			'Plataforma comunitaria para publicar y encontrar eventos, servicios, productos, cursos y más con enfoque inclusivo y diverso.',
		type: 'website',
		locale: 'es_AR',
		siteName: 'Inclusiva',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Inclusiva',
		description:
			'Plataforma comunitaria para publicar y encontrar eventos, servicios, productos, cursos y más con enfoque inclusivo y diverso.',
	},
};

export function generateViewport() {
	return {
		width: 'device-width',
		initialScale: 1,
		themeColor: '#000000',
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<head>
				<link rel='manifest' href='/manifest.json' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='black' />
				<meta name='apple-mobile-web-app-title' content='Inclusiva' />
			</head>
			<body className={`${inter.variable} ${poppins.variable}`}>
				<CategoryProvider>
					<TooltipProvider delayDuration={200}>
						<Header />
						<div className='mt-20 '>{children}</div>
						<FloatingActionButton />
						<Footer />
					</TooltipProvider>
					<Toaster theme='dark' />
				</CategoryProvider>
			</body>
		</html>
	);
}
