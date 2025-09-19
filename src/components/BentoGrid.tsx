import { FaCalendarAlt, FaSearch, FaTools, FaStore, FaExchangeAlt, FaGraduationCap, FaBoxOpen } from 'react-icons/fa';
import Tile from './Tile';

export default function BentoGrid() {
	return (
		<section className='grid grid-cols-1 gap-3 us:grid-cols-6 lg:gap-5 sm:grid-cols-12 lg:grid-rows-12 flex-1 min-h-[calc(100svh-10rem)]'>
			<Tile
				href='/publicaciones/eventos'
				className='col-span-1 us:col-span-3 tile-red lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:row-span-3'
			>
				<FaCalendarAlt size={28} className='drop-shadow' />
				<span className='text-lg font-semibold drop-shadow'>Eventos</span>
			</Tile>

			<Tile
				href='/publicaciones/pedidos'
				className='col-span-1 us:col-span-3 tile-pink lg:col-start-9 lg:col-span-5 lg:row-start-1 lg:row-span-3'
			>
				<FaSearch size={28} className='drop-shadow' />
				<span className='text-lg font-semibold drop-shadow'>Pedidos</span>
			</Tile>

			<Tile
				href='/publicaciones/servicios'
				className='col-span-1 us:col-span-3  tile-blue lg:col-start-1 lg:col-span-4 lg:row-start-4 lg:row-span-6'
			>
				<FaTools size={28} className='drop-shadow' />
				<span className='text-lg font-semibold drop-shadow'>Servicios</span>
			</Tile>

			<Tile
				href='/publicaciones/productos'
				className='col-span-1 us:col-span-3 tile-green-dark lg:col-start-5 lg:col-span-4 lg:row-start-1 lg:row-span-8'
			>
				<FaStore size={28} className='drop-shadow' />
				<span className='text-lg font-semibold drop-shadow'>Productos</span>
			</Tile>
			<Tile
				href='/publicaciones/usados'
				className='col-span-1 us:col-span-3 tile-brown lg:col-start-1 lg:col-span-4 lg:row-start-10 lg:row-span-3'
			>
				<FaExchangeAlt size={28} className='drop-shadow' />
				<span className='text-lg font-semibold drop-shadow'>Usados</span>
			</Tile>
			<Tile
				href='/publicaciones/cursos'
				className='col-span-1 us:col-span-3 tile-orange lg:col-start-9 lg:col-span-5 lg:row-start-4 lg:row-span-5'
			>
				<FaGraduationCap size={28} className='drop-shadow' />
				<span className='text-lg font-semibold drop-shadow'>Cursos</span>
			</Tile>

			<Tile
				href='/publicaciones'
				className='col-span-1 us:col-span-6 tile-lilac-dark sm:col-start-6 lg:col-span-9 lg:row-start-9 lg:row-span-4'
			>
				<FaBoxOpen size={28} className='drop-shadow' />
				<span className='text-lg font-semibold drop-shadow'>Todos</span>
			</Tile>
		</section>
	);
}
