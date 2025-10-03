export type Category = 'eventos' | 'servicios' | 'productos' | 'usados' | 'cursos' | 'pedidos';

export type PaymentMethod = 'cash' | 'debit' | 'credit' | 'transfer' | 'mercadopago' | 'crypto' | 'barter' | 'all';

export interface BasePost {
	id: string;
	category: Category;
	title: string;
	subtitle?: string;
	description?: string;
	image: string;
	author: string;
	authorAvatar: string;
	location: string;
	price?: number; // ARS
	priceLabel?: string; // Texto alternativo para precio ("a convenir", "gratuito", etc.)
	rating?: number; // 0..5
	ratingCount?: number; // cantidad de personas que calificaron
	tags?: string[];
	urgent?: boolean;
	date: string; // ISO
	contact?: {
		instagram?: string;
		facebook?: string;
		twitter?: string;
		tiktok?: string;
		website?: string;
		whatsapp?: string;
		telegram?: string;
		email?: string;
		discord?: string;
	};
	payment?: PaymentMethod[];
	barterAccepted?: boolean; // acepta canje
}

// Campos específicos por categoría
export interface EventPost extends BasePost {
	category: 'eventos';
	startDate: string; // ISO
	endDate?: string; // ISO
	venue: string; // lugar
	mode: 'presencial' | 'online' | 'híbrido';
	capacity?: number;
	organizer?: string;
}

export interface ServicePost extends BasePost {
	category: 'servicios';
	experienceYears?: number;
	availability?: string; // e.g. "Lun a Vie 9-18"
	serviceArea?: string; // zonas
}

export interface ProductPost extends BasePost {
	category: 'productos';
	condition: 'nuevo' | 'reacondicionado';
	stock?: number;
	warranty?: string;
}

export interface UsedPost extends BasePost {
	category: 'usados';
	condition: 'usado';
	usageTime?: string; // e.g. "2 años"
}

export interface CoursePost extends BasePost {
	category: 'cursos';
	mode: 'presencial' | 'online' | 'híbrido';
	duration: string; // e.g. "8 semanas"
	schedule?: string; // e.g. "Mar y Jue 19-21"
	level?: 'principiante' | 'intermedio' | 'avanzado';
}

export interface RequestPost extends BasePost {
	category: 'pedidos';
	neededBy?: string; // fecha
	budgetRange?: string; // e.g. "Hasta $150.000"
}

export type Post = EventPost | ServicePost | ProductPost | UsedPost | CoursePost | RequestPost;

// Dataset artesanal con contexto Mar del Plata y alrededores.
export const posts: Post[] = [
	{
		id: 'evt-001',
		category: 'eventos',
		title: 'Feria Diversa MDP',
		subtitle: 'Emprendimientos locales, música y espacio seguro para todes',
		description: 'Una feria única donde se muestran productos, servicios y eventos de manera inclusiva.',
		image:
			'https://image.pollinations.ai/prompt/Feria%20inclusiva%20en%20plaza%2C%20puestos%20de%20emprendedores%2C%20banderines%2C%20familias%2C%20tarde%20soleada%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20high%20quality%2C%20natural%20lighting?width=1344&height=768&model=flux-realism&enhance=true&nologo=true',
		author: 'Colectiva Diversa MDP',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20photo%20of%20community%20organizer%2C%20Mar%20del%20Plata%2C%20friendly%20smile%2C%20photorealistic%2C%20soft%20lighting%2C%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Plaza España, Mar del Plata',
		price: 0,
		rating: 4.8,
		tags: ['feria', 'inclusión', 'emprendedores'],
		urgent: false,
		date: '2025-10-20',
		contact: { instagram: 'https://instagram.com/diversamdq' },
		payment: ['cash', 'all'],
		barterAccepted: false,
		startDate: '2025-10-20T14:00:00',
		endDate: '2025-10-20T19:30:00',
		venue: 'Plaza España',
		mode: 'presencial',
		capacity: 400,
		organizer: 'Red barrial Diversa',
	},
	{
		id: 'srv-101',
		category: 'servicios',
		title: 'Maquillaje inclusivo a domicilio',
		subtitle: 'Skin prep, social y eventos. Tallas y estilos para todes',
		description: 'Ofrecemos maquillaje profesional a domicilio, adaptado a todas las necesidades y estilos.',  
		image:
			'https://image.pollinations.ai/prompt/Makeup%20kit%20on%20table%2C%20inclusive%20beauty%20tones%2C%20soft%20pastel%20background%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20studio%20lighting?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Sofi Valdez',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20makeup%20artist%2C%20natural%20makeup%2C%20friendly%20smile%2C%20Mar%20del%20Plata%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'La Perla y Nueva Pompeya',
		price: 25000,
		rating: 4.9,
		tags: ['maquillaje', 'a domicilio', 'inclusivo'],
		urgent: true,
		date: '2025-09-28',
		contact: { instagram: 'https://instagram.com/sofi.makeup.mdp', whatsapp: 'https://wa.me/5492236032601' },
		payment: ['mercadopago', 'transfer', 'cash'],
		barterAccepted: false,
		experienceYears: 6,
		availability: 'Lun-Dom 9-21',
		serviceArea: 'Mdp costa norte',
	},
	{
		id: 'prd-301',
		category: 'productos',
		title: 'Buzos oversize talles reales',
    subtitle: 'Cortes sin género, talles reales, algodón frisa',
    description: 'Buzos oversize con talles reales, perfectos para todas las ocasiones.',
		image:
			'https://image.pollinations.ai/prompt/Oversize%20hoodies%20on%20rack%2C%20genderless%20fashion%2C%20colorful%2C%20boutique%20vibe%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20soft%20lighting?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Todas Somos',
		authorAvatar: '',
		location: 'Microcentro MDP',
		price: 25000,
		rating: 4.6,
		tags: ['indumentaria', 'talles reales', 'sin género'],
		urgent: false,
		date: '2025-09-15',
		contact: { instagram: 'https://instagram.com/todassomos.mdp', website: 'https://todassomos.ar' },
		payment: ['mercadopago', 'debit', 'credit'],
		barterAccepted: false,
		condition: 'nuevo',
		stock: 15,
		warranty: 'Cambios 15 días',
	},
	{
		id: 'prd-315',
		category: 'productos',
		title: 'Trucadoras premium',
    subtitle: 'Ropa interior especializada. Cómodas, discretas y de calidad',
    description: 'Trucadoras premium con talles reales, perfectas para todas las ocasiones.',
		image:
			'https://image.pollinations.ai/prompt/handmade%20intimate%20apparel%20sewing%20workshop%20fabric%20patterns%20measuring%20tape%20scissor%20professional%20tailoring%20studio%20soft%20lighting%20photorealistic?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Valentina Costura',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20transgender%20woman%20seamstress%20tailor%20sewing%20room%20Mar%20del%20Plata%20warm%20smile%20professional%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Barrio Los Troncos',
		price: 15000,
		rating: 4.9,
		tags: ['trucadoras', 'ropa interior', 'trans', 'artesanal'],
		urgent: false,
		date: '2025-09-20',
		contact: { 
			instagram: 'https://instagram.com/vale.trucadoras', 
			whatsapp: 'https://wa.me/5492236032601',
			telegram: 'https://t.me/vale_trucadoras'
		},
		payment: ['mercadopago', 'transfer', 'cash', 'crypto'],
		barterAccepted: false,
		condition: 'nuevo',
		stock: 8,
		warranty: 'Satisfacción garantizada',
	},
	{
		id: 'usd-210',
		category: 'usados',
		title: 'Notebook para estudiar',
    subtitle: 'Anda bien, batería media. Ideal para tareas y navegar',
    description: 'Notebook usada, con pantalla y teclado funcionales.',
		image:
			'https://image.pollinations.ai/prompt/Used%20laptop%20on%20wooden%20table%2C%20clean%20but%20old%2C%20student%20setup%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20natural%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Kevin R.',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20young%20Argentine%20student%2C%20humble%20background%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20soft%20lighting%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Barrio Libertad',
		price: 180000,
		rating: 4.1,
		tags: ['tecnología', 'estudio'],
		urgent: true,
		date: '2025-09-12',
		contact: { whatsapp: 'https://wa.me/5492236032601' },
		payment: ['cash', 'transfer', 'barter', 'crypto'],
		barterAccepted: true,
		condition: 'usado',
		usageTime: '3 años',
	},
	{
		id: 'crs-501',
		category: 'cursos',
		title: 'Workshop de Vogue y expresión',
    subtitle: 'Movimiento, historia y práctica abierta. Sin requisitos',
    description: 'Workshop de Vogue y expresión, para todas las edades.',
		image:
			'https://image.pollinations.ai/prompt/Vogue%20dance%20workshop%20in%20studio%2C%20diverse%20group%2C%20energy%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20motion%20blur%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Casa Cultural Puerto',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20dance%20instructor%2C%20Latina%2C%20short%20hair%2C%20Mar%20del%20Plata%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Puerto',
		price: 9000,
		rating: 4.9,
		tags: ['danza', 'expresión', 'voguing'],
		urgent: false,
		date: '2025-10-05',
		contact: { instagram: 'https://instagram.com/casaculturalpuerto' },
		payment: ['mercadopago', 'cash'],
		barterAccepted: false,
		mode: 'presencial',
		duration: '1 jornada (3 hs)',
		schedule: 'Sáb 17-20',
		level: 'principiante',
	},
	{
		id: 'req-901',
		category: 'pedidos',
		title: 'Busco costurera para ajustar binder',
    subtitle: 'Trabajo prolijo, cómodo y discreto',
    description: 'Busco una costurera para ajustar binders, con experiencia y atención al detalle.',
		image:
			'https://image.pollinations.ai/prompt/Sewing%20workshop%20table%2C%20binder%20adjustments%2C%20threads%20and%20fabrics%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20soft%20lighting?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Alex M.',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20androgynous%20Argentine%20person%2C%20gentle%20smile%2C%20Mar%20del%20Plata%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Centro',
		price: 0,
		rating: 0,
		tags: ['costura', 'salud'],
		urgent: true,
		date: '2025-09-25',
		contact: { instagram: 'https://instagram.com/alex.en.mdq', telegram: 'https://t.me/alex_mdq' },
		payment: ['transfer', 'cash'],
		barterAccepted: true,
		neededBy: '2025-10-10',
		budgetRange: 'Hasta $30.000',
	},
	{
		id: 'srv-155',
		category: 'servicios',
		title: 'Peluquería segura para niñeces trans',
    subtitle: 'Cortes y color con respeto y paciencia',
    description: 'Peluquería segura para niñeces trans, con cortes y color profesionales.',
		image:
			'https://image.pollinations.ai/prompt/Inclusive%20hair%20salon%2C%20warm%20cozy%20interior%2C%20barber%20chair%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20soft%20lighting?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Maru Pelos',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20friendly%20hairdresser%2C%20short%20colored%20hair%2C%20Mar%20del%20Plata%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Barrio San José',
		price: 12000,
		rating: 4.7,
		tags: ['peluquería', 'infancias', 'color'],
		urgent: false,
		date: '2025-09-22',
		contact: { whatsapp: 'https://wa.me/5492236032601', instagram: 'https://instagram.com/maru.pelos' },
		payment: ['cash', 'mercadopago'],
		barterAccepted: false,
		experienceYears: 10,
		availability: 'Mar-Sáb 10-19',
		serviceArea: 'En local',
	},
	{
		id: 'prd-333',
		category: 'productos',
		title: 'Pastafrola y pepas caseras',
    subtitle: 'Recetas de abuela, opción sin azúcar',
    description: 'Pastafrola y pepas caseras, hechas con ingredientes frescos y de calidad.',
		image:
			'https://image.pollinations.ai/prompt/Homemade%20pastries%20and%20pastafrola%20on%20wooden%20table%2C%20home%20bakery%2C%20Mar%20del%20Plata%20Bat%C3%A1n%2C%20photorealistic%2C%20natural%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Abuela Dora',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20elderly%20Argentine%20woman%2C%20baker%2C%20Bat%C3%A1n%2C%20friendly%20smile%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Batán',
		price: 4500,
		rating: 4.5,
		tags: ['panificados', 'hogareño'],
		urgent: false,
		date: '2025-09-18',
		contact: { whatsapp: 'https://wa.me/5492236032601' },
		payment: ['cash', 'transfer'],
		barterAccepted: false,
		condition: 'nuevo',
		stock: 8,
		warranty: 'No aplica',
	},
	{
		id: 'usd-280',
		category: 'usados',
		title: 'Ropero de pino 2 puertas',
    subtitle: 'Sano, solo marcas de uso',
    description: 'Ropero de pino, segunda mano, en buen estado, solo marcas de uso.',
		image:
			'https://image.pollinations.ai/prompt/Wooden%20wardrobe%20second%20hand%2C%20simple%20bedroom%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20natural%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Gabi T.',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20Argentine%20woman%2C%20reseller%2C%20Mar%20del%20Plata%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Constitución',
		price: 85000,
		rating: 4.0,
		tags: ['muebles', 'hogar'],
		urgent: false,
		date: '2025-09-10',
		contact: { whatsapp: 'https://wa.me/5492236032601' },
		payment: ['cash', 'mercadopago'],
		barterAccepted: true,
		condition: 'usado',
	},
	{
		id: 'crs-560',
		category: 'cursos',
		title: 'Programación web desde cero (online)',
    subtitle: 'HTML, CSS y JavaScript con práctica guiada',
    description: 'Programación web desde cero, con HTML, CSS y JavaScript. Práctica guiada y en línea.',
		image:
			'https://image.pollinations.ai/prompt/Online%20coding%20course%20setup%2C%20laptop%20and%20notes%2C%20diverse%20students%2C%20photorealistic%2C%20soft%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Colectivo Tech MDP',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20Argentine%20software%20mentor%2C%20Mar%20del%20Plata%2C%20friendly%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Online',
		priceLabel: 'A convenir',
		rating: 4.3,
		tags: ['tecnología', 'programación'],
		urgent: false,
		date: '2025-10-15',
		contact: { instagram: 'https://instagram.com/tech.mdp', website: 'https://techmdp.ar' },
		payment: ['all'],
		barterAccepted: false,
		mode: 'online',
		duration: '8 semanas',
		schedule: 'Mar y Jue 19-21',
		level: 'principiante',
	},
	{
		id: 'prd-420',
		category: 'productos',
		title: 'Celular Samsung A30 impecable',
    subtitle: 'Anda joya, batería al 100% y memoria para mil fotos',
    description: 'Celular Samsung A30, segunda mano, en buen estado, con batería al 100% y memoria para mil fotos.',
		image:
			'https://image.pollinations.ai/prompt/Refurbished%20smartphone%20on%20desk%2C%20clean%20setup%2C%20photorealistic%2C%20soft%20lighting?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'El Tomi',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20young%20Argentine%20man%2C%20casual%20style%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Mardel',
		price: 145000,
		rating: 4.2,
		tags: ['celular', 'samsung', 'usado'],
		urgent: false,
		date: '2025-09-30',
		contact: { instagram: 'https://instagram.com/tomi', whatsapp: 'https://wa.me/5492236032601' },
		payment: ['transfer', 'mercadopago', 'cash', 'crypto'],
		barterAccepted: false,
		condition: 'reacondicionado',
		stock: 1,
		warranty: '1 mes de garantía por cualquier cosa',
	},
	{
		id: 'usd-295',
		category: 'usados',
		title: 'Bicicleta urbana usada',
    subtitle: 'Rodado 28, lista para pedalear. Incluye luces',
    description: 'Bicicleta urbana usada, segunda mano, en buen estado, con rodado 28 y luces incluidas.',
		image:
			'https://image.pollinations.ai/prompt/Used%20city%20bicycle%20leaning%20on%20wall%2C%20urban%20street%2C%20Mar%20del%20Plata%2C%20photorealistic%20daylight?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Nico V.',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20Argentine%20cyclist%2C%20casual%2C%20Mar%20del%20Plata%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Peralta Ramos',
		price: 120000,
		rating: 0,
		tags: ['bicicleta', 'movilidad'],
		urgent: true,
		date: '2025-09-26',
		contact: { whatsapp: 'https://wa.me/5492236032601' },
		payment: ['cash', 'transfer', 'barter'],
		barterAccepted: true,
		condition: 'usado',
		usageTime: '2 años',
	},
	{
		id: 'crs-530',
		category: 'cursos',
		title: 'Clases de surf inclusivas',
    subtitle: 'Equipo incluido. Acompañamiento respetuoso',
    description: 'Clases de surf inclusivas, con equipo incluido y acompañamiento respetuoso.',
		image:
			'https://image.pollinations.ai/prompt/Inclusive%20surf%20class%20at%20beach%2C%20Playa%20Grande%2C%20Mar%20del%20Plata%2C%20people%20with%20surfboards%2C%20photorealistic%2C%20golden%20hour?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Olas Para Todes',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20surf%20instructor%2C%20Argentine%2C%20Playa%20Grande%2C%20photorealistic%20headshot%2C%20wet%20hair%20smile?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Playa Grande',
		price: 18000,
		rating: 4.8,
		tags: ['deporte', 'mar'],
		urgent: false,
		date: '2025-11-02',
		contact: { instagram: 'https://instagram.com/olasparatodes' },
		payment: ['mercadopago', 'cash'],
		barterAccepted: false,
		mode: 'presencial',
		duration: '2 horas',
		schedule: 'Sáb y Dom 9-11',
		level: 'principiante',
	},
	{
		id: 'evt-020',
		category: 'eventos',
		title: 'Encuentro de lectura queer',
    subtitle: 'Rondas de lectura, mate y charla en espacio cuidado',
    description: 'Encuentro de lectura queer, con rondas de lectura, mate y charla en espacio cuidado.',
		image:
			'https://image.pollinations.ai/prompt/Queer%20reading%20circle%20in%20cozy%20library%2C%20small%20group%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20warm%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Biblioteca Parlante',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20librarian%2C%20non-binary%2C%20Mar%20del%20Plata%2C%20photorealistic%20headshot%2C%20glasses%20friendly?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Centro',
		price: 0,
		rating: 4.7,
		tags: ['lectura', 'cultura', 'lgbtq+'],
		urgent: false,
		date: '2025-10-01',
		contact: { instagram: 'https://instagram.com/biblio.parlante' },
		payment: ['cash'],
		barterAccepted: false,
		startDate: '2025-10-01T18:00:00',
		venue: 'Biblioteca Parlante',
		mode: 'presencial',
		capacity: 30,
		organizer: 'Biblioteca Parlante',
	},
	{
		id: 'req-940',
		category: 'pedidos',
		title: 'Acompañamiento para trámite ANSES',
    subtitle: 'Persona paciente para ir juntas al turno',
    description: 'Acompañamiento para trámite ANSES, con persona paciente para ir juntas al turno.',
		image:
			'https://image.pollinations.ai/prompt/Assistance%20at%20public%20office%2C%20two%20people%20helping%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20daylight?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Marta L.',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20elderly%20Argentine%20woman%2C%20Sierra%20de%20los%20Padres%2C%20kind%20smile%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Sierra de los Padres',
		price: 0,
		rating: 0,
		tags: ['acompañamiento', 'trámites'],
		urgent: true,
		date: '2025-09-22',
		contact: { whatsapp: 'https://wa.me/5492236032601', telegram: 'https://t.me/marta_mdq' },
		payment: ['cash'],
		barterAccepted: true,
		neededBy: '2025-09-30',
		budgetRange: 'A convenir',
	},
	{
		id: 'srv-180',
		category: 'servicios',
		title: 'Albañilería y pequeñas mejoras',
    subtitle: 'Arreglos chicos y mantenimiento con presupuesto justo',
    description: 'Albañilería y pequeñas mejoras, con arreglos chicos y mantenimiento con presupuesto justo.',
		image:
			'https://image.pollinations.ai/prompt/Handyman%20doing%20home%20repairs%2C%20toolbox%2C%20apartment%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20natural%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Luis de Batán',
		authorAvatar: '',
		location: 'Batán y alrededores',
		price: 0,
		rating: 4.4,
		tags: ['hogar', 'arreglos'],
		urgent: false,
		date: '2025-09-08',
		contact: { whatsapp: 'https://wa.me/5492236032601' },
		payment: ['cash', 'transfer'],
		barterAccepted: true,
		experienceYears: 12,
		availability: 'Lun-Sáb 8-18',
		serviceArea: 'Batán, Chapadmalal',
	},
	{
		id: 'prd-360',
		category: 'productos',
		title: 'Huerta urbana para balcón',
    subtitle: 'Kit de inicio con sustrato, semillas y guía',
    description: 'Huerta urbana para balcón, con kit de inicio con sustrato, semillas y guía.',
		image:
			'https://image.pollinations.ai/prompt/Urban%20balcony%20garden%20kit%2C%20pots%20and%20green%20plants%2C%20Miramar%20near%20Mar%20del%20Plata%2C%20photorealistic%2C%20soft%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Verde Cerca',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20urban%20gardener%2C%20small%20business%2C%20Miramar%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Miramar y MDP',
		price: 22000,
		rating: 4.6,
		tags: ['huerta', 'sustentable'],
		urgent: false,
		date: '2025-09-05',
		contact: { instagram: 'https://instagram.com/verdecerca', website: 'https://verdecerca.ar' },
		payment: ['mercadopago', 'transfer'],
		barterAccepted: false,
		condition: 'nuevo',
		stock: 10,
		warranty: 'Asesoría 30 días',
	},
	{
		id: 'evt-045',
		category: 'eventos',
		title: 'Tarde de juegos de mesa inclusivos',
    subtitle: 'Aprendemos y jugamos en ronda. Traé mates',
    description: 'Tarde de juegos de mesa inclusivos, con aprendizaje y juego en ronda.',
		image:
			'https://image.pollinations.ai/prompt/Board%20game%20afternoon%20in%20community%20center%2C%20diverse%20group%2C%20Mar%20del%20Plata%20Camet%2C%20photorealistic%2C%20warm%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Centro Cultural Vértice',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20community%20center%20coordinator%2C%20Mar%20del%20Plata%20Camet%2C%20photorealistic%20headshot%2C%20friendly?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Parque Camet',
		price: 0,
		rating: 4.5,
		tags: ['juegos', 'comunidad'],
		urgent: false,
		date: '2025-09-29',
		contact: { instagram: 'https://instagram.com/vertice.cc' },
		payment: ['cash'],
		barterAccepted: false,
		startDate: '2025-09-29T16:00:00',
		venue: 'Centro Cultural Vértice',
		mode: 'presencial',
		capacity: 40,
		organizer: 'Vértice',
	},
	{
		id: 'srv-220',
		category: 'servicios',
		title: 'Fotografía de producto accesible',
    subtitle: 'Pack básico para emprendedoras y ferias',
    description: 'Fotografía de producto accesible, con pack básico para emprendedoras y ferias.',
		image:
			'https://image.pollinations.ai/prompt/Product%20photography%20setup%2C%20softbox%2C%20table%2C%20small%20business%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20studio%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Mica F.',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20female%20photographer%2C%20Mar%20del%20Plata%2C%20camera%20strap%2C%20photorealistic%20headshot?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Zona Güemes',
		price: 38000,
		rating: 4.7,
		tags: ['foto', 'emprendedoras'],
		urgent: false,
		date: '2025-09-27',
		contact: { instagram: 'https://instagram.com/mica.foto', whatsapp: 'https://wa.me/5492236032601' },
		payment: ['mercadopago', 'transfer'],
		barterAccepted: false,
		experienceYears: 5,
		availability: 'Lun-Sáb 10-18',
		serviceArea: 'Estudio y a domicilio',
	},
	{
		id: 'prd-390',
		category: 'productos',
		title: 'Accesorios artesanales queer friendly',
    subtitle: 'Pins, parches y tote bags hechos a mano',
    description: 'Accesorios artesanales queer friendly, con pins, parches y tote bags hechos a mano.',
		image:
			'https://image.pollinations.ai/prompt/Handmade%20pins%20and%20tote%20bags%20on%20table%2C%20queer%20friendly%20accessories%2C%20Mar%20del%20Plata%2C%20photorealistic%2C%20soft%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
		author: 'Punktura',
		authorAvatar:
			'https://image.pollinations.ai/prompt/Portrait%20of%20art%20crafter%2C%20non-binary%2C%20Mar%20del%20Plata%2C%20photorealistic%20headshot%2C%20short%20hair?width=256&height=256&model=flux-realism&enhance=true&nologo=true',
		location: 'Güemes',
		price: 6000,
		rating: 4.6,
		tags: ['diseño', 'hecho a mano'],
		urgent: false,
		date: '2025-09-21',
		contact: { instagram: 'https://instagram.com/punktura', website: 'https://punktura.ar' },
		payment: ['mercadopago', 'cash'],
		barterAccepted: true,
		condition: 'nuevo',
		stock: 25,
		warranty: 'Cambios 7 días',
  },
 
];

export const categoryToGradientClass: Record<Category, string> = {
	eventos: 'category-overlay-red',
	servicios: 'category-overlay-blue',
	productos: 'category-overlay-orange',
	usados: 'category-overlay-violet',
	cursos: 'category-overlay-green',
	pedidos: 'category-overlay-pink',
};

export const categoryToTileClass: Record<Category, string> = {
	eventos: 'bg-grad-red',
	servicios: 'bg-grad-blue',
	productos: 'bg-grad-orange',
	usados: 'bg-grad-violet',
	cursos: 'bg-grad-green',
	pedidos: 'bg-grad-pink',
};