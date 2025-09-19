const WPP_NUMBER = '5492236032601';

const Footer = () => {
	return (
		<footer className='shrink-0 text-center text-xs text-gray-600 dark:text-gray-400'>
			Desarrollado con ❤️ por Evelyn Castellano •{' '}
			<a
				href={`https://wa.me/${WPP_NUMBER}`}
				target='_blank'
				rel='noopener noreferrer'
				className='underline underline-offset-2 hover:text-green-600'
			>
				Contacto
			</a>
		</footer>
	);
};
export default Footer;
