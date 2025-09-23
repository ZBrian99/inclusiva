'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Chip } from '@/components/Chip';
import { Category } from '@/data/posts';
import {
	FaCalendarAlt,
	FaSearch,
	FaTools,
	FaStore,
	FaExchangeAlt,
	FaGraduationCap,
	FaBoxOpen,
	FaFilter,
	FaSortAmountDown,
} from 'react-icons/fa';
import { categoryGradients } from '@/utils/categoryPatterns';

const categories: { key: Category; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] =
	[
		{ key: 'eventos', label: 'Eventos', icon: FaCalendarAlt },
		{ key: 'servicios', label: 'Servicios', icon: FaTools },
		{ key: 'productos', label: 'Productos', icon: FaStore },
		{ key: 'usados', label: 'Usados', icon: FaExchangeAlt },
		{ key: 'cursos', label: 'Cursos', icon: FaGraduationCap },
		{ key: 'pedidos', label: 'Pedidos', icon: FaSearch },
	];

type SortKey = 'recent' | 'rating' | 'priceAsc' | 'priceDesc';

interface SearchFiltersProps {
	selected: Category | 'all';
	onSelectedChange: (category: Category | 'all') => void;
	searchQuery: string;
	onSearchQueryChange: (query: string) => void;
	sortBy: SortKey;
	onSortByChange: (sort: SortKey) => void;
	resultsCount: number;
}

export default function SearchFilters({
	selected,
	onSelectedChange,
	searchQuery,
	onSearchQueryChange,
	sortBy,
	onSortByChange,
	resultsCount,
}: SearchFiltersProps) {
	return (
		<div className='bg-card border border-border/50 rounded-2xl px-4 py-6 sm:px-6 sm:py-8 flex flex-col gap-4 shadow-lg'>
			<header className='text-center space-y-3 mb-2'>
				<h1 className='font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
					Publicaciones
				</h1>
				<p className='text-muted-foreground text-sm sm:text-base md:text-lg  max-w-2xl mx-auto'>
					Descubrí eventos, servicios, productos y más de nuestra comunidad inclusiva
				</p>
			</header>

			{/* Search and Sort Row */}
			<div className='flex flex-1 gap-4'>
				<div className='relative w-full'>
					<FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' size={16} />
					<Input
						value={searchQuery}
						className='pl-10 h-12 text-sm '
						onChange={(e) => onSearchQueryChange(e.target.value)}
						placeholder='Buscar por título, zona o etiquetas…'
					/>
				</div>

				{/* Sort Select - Icon only */}
				<Select  value={sortBy} onValueChange={(v) => onSortByChange(v as SortKey)}>
					<SelectTrigger className='min-h-12'>
						<FaSortAmountDown className='text-muted-foreground' size={16} />
						<div className='hidden xs:block'>
							<SelectValue placeholder='Ordenar por' />
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='recent'>Más recientes</SelectItem>
						<SelectItem value='rating'>Mejor valorados</SelectItem>
						<SelectItem value='priceAsc'>Menor precio</SelectItem>
						<SelectItem value='priceDesc'>Mayor precio</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Categories Row */}
			<div className='w-full'>
				<div className='overflow-x-auto hide-scrollbar-x'>
					<div className='flex items-center gap-2.5 min-w-max'>
						<Chip
							selected={selected === 'all'}
							onClick={() => onSelectedChange('all')}
							className={` flex items-center gap-2.5 whitespace-nowrap relative overflow-hidden cursor-pointer   ${
								selected === 'all' ? categoryGradients['all'] : ''
							}`}
						>
							<div className='relative z-10 flex items-center gap-2.5 p-0.5'>
								<FaBoxOpen size={15} />
								<span className='font-medium'>Todos</span>
							</div>
						</Chip>

						{categories.map((category, i) => {
							const IconComponent = category.icon;
							const isSelected = selected === category.key;

							return (
								<Chip
									key={category.key}
									selected={isSelected}
									onClick={() => onSelectedChange(category.key)}
									className={`flex items-center gap-2.5 whitespace-nowrap relative overflow-hidden cursor-pointer  ${
										isSelected ? categoryGradients[category.key] : ``
									}`}
								>
									<div className='relative z-10 flex items-center gap-2.5 p-0.5'>
										<IconComponent size={15} />
										<span className='font-medium'>{category.label}</span>
									</div>
								</Chip>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
