import Image from 'next/image';
import Link from 'next/link';
import {
	Category,
	type Post,
	type ProductPost,
	type UsedPost,
	type CoursePost,
	type EventPost,
	type ServicePost,
	type RequestPost,
	categoryToGradientClass,
	categoryToTileClass,
} from '@/data/posts';
import {
	FaMapMarkerAlt,
	FaStar,
	FaMoneyBill,
	FaCreditCard,
	FaUniversity,
	FaBitcoin,
	FaHandshake,
	FaClock,
	FaTag,
	FaWallet,
	FaMoneyCheckAlt,
	FaCalendarAlt,
	FaUsers,
	FaLaptop,
	FaShieldAlt,
	FaBoxOpen,
	FaHistory,
	FaMedal,
	FaSignal,
	FaQuestionCircle,
	FaGlobe,
	FaShoppingCart,
	FaCalendarCheck,
	FaInfoCircle,
	FaEnvelope,
	FaWhatsapp,
	FaInstagram,
	FaTelegramPlane,
	FaPaperPlane,
	FaTools,
	FaStore,
	FaExchangeAlt,
	FaGraduationCap,
	FaSearch,
} from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Tipos básicos
type PostCardProps = { post: Post };

const categoryLabel: Record<Category, string> = {
	eventos: 'Eventos',
	servicios: 'Servicios',
	productos: 'Productos',
	usados: 'Usados',
	cursos: 'Cursos',
	pedidos: 'Pedidos',
};

const categoryIcon: Record<Category, React.ElementType> = {
	eventos: FaCalendarAlt,
	servicios: FaTools,
	productos: FaStore,
	usados: FaExchangeAlt,
	cursos: FaGraduationCap,
	pedidos: FaSearch,
};

function formatPrice(value?: number, label?: string): string | null {
	if (label && label.trim().length > 0) return label;
	if (typeof value !== 'number') return null;
	if (value === 0) return 'Gratuito';
	return `$ ${value.toLocaleString('es-AR')}`;
}

function formatDateTime(iso?: string): string | null {
	if (!iso) return null;
	try {
		const d = new Date(iso);
		return d.toLocaleString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
	} catch {
		return iso;
	}
}

function mapConditionLabel(cond?: string): string | null {
	if (!cond) return null;
	if (cond === 'reacondicionado') return 'reacond.';
	return cond;
}

// Paleta sutil para chips (reutiliza la paleta de tags)
const tagPalettes = [
	{ bg: 'bg-sky-500/8', text: 'text-sky-200', ring: 'ring-1 ring-sky-500/15' },
	{ bg: 'bg-emerald-500/8', text: 'text-emerald-200', ring: 'ring-1 ring-emerald-500/15' },
	{ bg: 'bg-amber-500/8', text: 'text-amber-200', ring: 'ring-1 ring-amber-500/15' },
	{ bg: 'bg-violet-500/8', text: 'text-violet-200', ring: 'ring-1 ring-violet-500/15' },
	{ bg: 'bg-rose-500/8', text: 'text-rose-200', ring: 'ring-1 ring-rose-500/15' },
	{ bg: 'bg-cyan-500/8', text: 'text-cyan-200', ring: 'ring-1 ring-cyan-500/15' },
];
function getTagClass(tag: string): string {
	let hash = 0;
	for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
	const p = tagPalettes[hash % tagPalettes.length];
	return `${p.bg} ${p.text} ${p.ring}`;
}

// Métodos de pago con colores unificados en gris
const paymentMeta: Record<string, { icon: React.ElementType; className: string; label: string }> = {
	cash: {
		icon: FaMoneyBill,
		className: 'text-slate-400',
		label: 'Efectivo',
	},
	debit: { icon: FaCreditCard, className: 'text-slate-400', label: 'Débito' },
	credit: {
		icon: FaCreditCard,
		className: 'text-slate-400',
		label: 'Crédito',
	},
	transfer: {
		icon: FaUniversity,
		className: 'text-slate-400',
		label: 'Transferencia',
	},
	mercadopago: {
		icon: FaWallet,
		className: 'text-slate-400',
		label: 'Billetera virtual',
	},
	crypto: { icon: FaBitcoin, className: 'text-slate-400', label: 'Cripto' },
	barter: {
		icon: FaHandshake,
		className: 'text-slate-400',
		label: 'Canje',
	},
	all: {
		icon: FaMoneyCheckAlt,
		className: 'text-slate-400',
		label: 'Todos los medios',
	},
};

// Colores por categoría para badges tipo pill
const categoryBadgeColors: Record<Category, string> = {
	eventos: 'bg-red-500/15 text-red-300 ring-1 ring-red-500/25', // eventos = red
	pedidos: 'bg-pink-500/15 text-pink-300 ring-1 ring-pink-500/25', // pedidos = pink
	servicios: 'bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/25', // servicios = blue
	productos: 'bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/25', // productos = orange
	cursos: 'bg-green-500/15 text-green-300 ring-1 ring-green-500/25', // cursos = green
	usados: 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/25', // usados = violet
};

// Info extra por categoría (icono + valor) tipado estricto
type InfoItem = { key: string; icon: React.ElementType; value: string };
function getExtraInfo(post: Post): InfoItem[] {
	const items: InfoItem[] = [];

	// Ubicación unificada como primer chip
	if (post.location) items.push({ key: 'location', icon: FaMapMarkerAlt, value: post.location });

	switch (post.category) {
		case 'eventos': {
			const p = post as EventPost;
			const date = formatDateTime(p.startDate);
			if (date) items.push({ key: 'date', icon: FaCalendarAlt, value: date });
			// venue removido para no duplicar ubicación
			// capacity removido por ahora
			break;
		}
		case 'servicios': {
			const p = post as ServicePost;
			if (p.experienceYears != null) items.push({ key: 'exp', icon: FaMedal, value: `${p.experienceYears} años` });
			if (p.availability) items.push({ key: 'avail', icon: FaClock, value: p.availability });
			// serviceArea salta para unificar con location
			break;
		}
		case 'productos': {
			const p = post as ProductPost;
			const cond = mapConditionLabel(p.condition);
			if (cond) items.push({ key: 'cond', icon: FaTag, value: cond });
			// stock y garantía removidos del chip
			break;
		}
		case 'usados': {
			const p = post as UsedPost;
			if (p.usageTime) items.push({ key: 'usage', icon: FaHistory, value: p.usageTime });
			items.push({ key: 'cond', icon: FaTag, value: 'usado' });
			break;
		}
		case 'cursos': {
			const p = post as CoursePost;
			if (p.duration) items.push({ key: 'dur', icon: FaClock, value: p.duration });
			if (p.schedule) items.push({ key: 'sch', icon: FaClock, value: p.schedule });
			if (p.level) items.push({ key: 'lvl', icon: FaSignal, value: p.level });
			break;
		}
		case 'pedidos': {
			const p = post as RequestPost;
			if (p.neededBy) items.push({ key: 'need', icon: FaCalendarAlt, value: p.neededBy });
			if (p.budgetRange) items.push({ key: 'budget', icon: FaMoneyBill, value: p.budgetRange });
			break;
		}
	}
	return items;
}

export default function PostCard({ post }: PostCardProps) {
	const priceText = formatPrice(post.price, post.priceLabel);
	const extra = getExtraInfo(post).slice(0, 6);

	return (
		<Link href={`/publicaciones/${post.id}`} className="block">
			<Card className='group overflow-hidden bg-card border border-border transition-shadow card-hover-glow hover:border-white/30 cursor-pointer'>
			<div className='relative aspect-[16/10] '>
				<Image src={post.image} alt={post.title} fill sizes='(max-width: 640px) 100vw, 33vw' className='object-cover' />
				<div className='pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 via-black/40 to-transparent' />
				{/* Badge de categoría a la derecha con ícono */}
				<div className='absolute right-3 top-3 flex items-center gap-2'>
					<Badge className={`text-white rounded-full p-3.5 ${categoryToGradientClass[post.category]}`}>
						{(() => {
							const Icon = categoryIcon[post.category];
							return <Icon className='mr-1' />;
						})()}{' '}
						{categoryLabel[post.category]}
					</Badge>
				</div>
				{/* Overlay autor + rating */}
				<div className='absolute bottom-3 left-3'>
					<div className='rounded-full relative'>
						<div className='bg-black/70 pl-13 rounded-full pr-3 py-1.5 flex items-center top-1/2 -translate-y-1/2 ring-1 ring-white/10 shadow-md absolute'>
							<span className='max-w-[140px] truncate inline-flex items-center text-xs font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,.6)] '>
								{post.author}
							</span>
							{typeof post.rating === 'number' && post.rating > 0 && (
								<span className='ml-2 inline-flex items-center gap-1 text-xs font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,.6)] '>
									<FaStar className='text-yellow-400' /> {post.rating}
								</span>
							)}
						</div>
						<Avatar className='h-10 w-10 ring-1 ring-white/10 shadow-md'>
							<AvatarImage src={post.authorAvatar} alt={post.author} />
							<AvatarFallback className='font-medium'>{post.author.slice(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</div>

			<div className={`${categoryToTileClass[post.category]} h-2 pointer-events-none`} />

			<div className='p-4 h-full flex flex-col'>
				{/* Jerarquía en slate: título > subtítulo */}
				<h3 className='line-clamp-2 font-semibold text-slate-100 text-[15px] sm:text-base'>{post.title}</h3>
				{post.subtitle && <p className='mt-1 line-clamp-2 text-[13px] text-slate-300'>{post.subtitle}</p>}

				{/* Badges de información con colores por categoría */}
				{extra.length > 0 && (
					<div className='mt-2 flex flex-wrap items-center gap-2'>
						{extra.map((item) => {
							const Icon = item.icon;
							const badgeClass = categoryBadgeColors[post.category];
							return (
								<span
									key={item.key}
									className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] ${badgeClass}`}
								>
									<Icon className='opacity-90' />
									<span className='truncate max-w-[160px]'>{item.value}</span>
								</span>
							);
						})}
					</div>
				)}

				{/* Precio + métodos de pago */}
				<div className='mt-auto pt-3'>
					<div className='flex items-center justify-between gap-2'>
						<div className='min-w-0 text-base sm:text-lg text-slate-100'>
							{priceText && <span className='font-semibold'>{priceText}</span>}
						</div>
						<div className='flex items-center gap-2'>
							{(post.payment ?? []).slice(0, 6).map((pm) => {
								const meta = paymentMeta[pm as keyof typeof paymentMeta];
								if (!meta) return null;
								const Icon = meta.icon;
								return (
									<Tooltip key={pm}>
										<TooltipTrigger asChild>
											<span
												className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${meta.className}`}
												aria-label={meta.label}
											>
												<Icon />
											</span>
										</TooltipTrigger>
										<TooltipContent>{meta.label}</TooltipContent>
									</Tooltip>
								);
							})}
							{post.barterAccepted && !(post.payment ?? []).includes('barter') && (
								<Tooltip>
									<TooltipTrigger asChild>
										<span
											className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${paymentMeta.barter.className}`}
											aria-label='Acepta canje'
										>
											<FaHandshake />
										</span>
									</TooltipTrigger>
									<TooltipContent>Acepta canje</TooltipContent>
								</Tooltip>
							)}
						</div>
					</div>
				</div>
			</div>
		</Card>
		</Link>
	);
}
