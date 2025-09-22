const WPP_NUMBER = '5492236032601';

const Footer = () => {
  // .footer {
  //   margin-top: 48px;
  //   text-align: center;
  //   padding: 24px;
  //   border-top: 1px solid rgba(255, 255, 255, 0.05);
  // }

  // .footer-content {
  //   font-size: 13px;
  //   color: #6b7280;
  //   line-height: 1.6;
  // }

  // .footer a {
  //   color: #8b5cf6;
  //   text-decoration: none;
  //   font-weight: 500;
  //   transition: color 0.3s ease;
  // }

  // .footer a:hover {
  //   color: #a855f7;
  // }
	return (
		<>
			<footer className='text-center mt-2 pt-4 pb-2 border-t border-gray-900/95'>
				<div className='text-sm text-gray-500 leading-relaxed'>
					Desarrollado con ❤️ por Evelyn Castellano
					<br />
					<a href='#' className='text-purple-500 font-medium no-underline transition-colors hover:text-purple-400'>
						Contacto
					</a>{' '}
					•{' '}
					<a href='#' className='text-purple-500 font-medium no-underline transition-colors hover:text-purple-400'>
						Acerca de
					</a>{' '}
					•{' '}
					<a href='#' className='text-purple-500 font-medium no-underline transition-colors hover:text-purple-400'>
						Comunidad
					</a>
				</div>
			</footer>
			{/* <footer className='shrink-0 text-center text-xs text-gray-600 dark:text-gray-400'>
				Desarrollado con ❤️ por Evelyn Castellano •{' '}
				<a
					href={`https://wa.me/${WPP_NUMBER}`}
					target='_blank'
					rel='noopener noreferrer'
					className='underline underline-offset-2 hover:text-green-600'
				>
					Contacto
				</a>
			</footer> */}
		</>
	);
};
export default Footer;
