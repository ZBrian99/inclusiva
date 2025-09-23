import { z } from 'zod';

export const paymentMethodOptions = [
	'cash',
	'debit',
	'credit',
	'transfer',
	'mercadopago',
	'crypto',
	'barter',
	'all',
] as const;

export const categoryOptions = [
	'eventos',
	'servicios',
	'productos',
	'usados',
	'cursos',
	'pedidos',
] as const;

const basePostSchema = z.object({
	id: z.string().optional(),
	category: z.enum(categoryOptions),
	title: z.string().min(3, 'Title must have at least 3 characters'),
	subtitle: z.string().min(3).max(160).optional(),
	description: z.string().min(10, 'Description must have at least 10 characters'),
	image: z.string().url('Must be a valid URL'),
	author: z.string().min(2),
	authorAvatar: z.string().url('Must be a valid URL'),
	location: z.string().min(2),
	price: z.number().int().nonnegative().optional(),
	priceLabel: z.string().max(50).optional(),
	rating: z.number().min(0).max(5).optional(),
	ratingCount: z.number().int().nonnegative().optional(),
	tags: z.array(z.string()).optional(),
	urgent: z.boolean().optional(),
	date: z.string(),
	contact: z
		.object({
			instagram: z.string().min(1).optional(),
			facebook: z.string().url().optional(),
			twitter: z.string().url().optional(),
			tiktok: z.string().url().optional(),
			website: z.string().url().optional(),
			whatsapp: z.string().min(1).optional(),
			telegram: z.string().min(1).optional(),
			email: z.string().email().optional(),
			discord: z.string().min(1).optional(),
		})
		.optional(),
	payment: z.array(z.enum(paymentMethodOptions)).optional(),
	barterAccepted: z.boolean().optional(),
});

const eventSchema = basePostSchema.extend({
	category: z.literal('eventos'),
	startDate: z.string(),
	endDate: z
		.string()
		.optional(),
	venue: z.string(),
	mode: z.enum(['presencial', 'online', 'híbrido']),
	capacity: z.number().int().nonnegative().optional(),
	organizer: z.string().optional(),
});

const serviceSchema = basePostSchema.extend({
	category: z.literal('servicios'),
	experienceYears: z.number().int().nonnegative().optional(),
	availability: z.string().optional(),
	serviceArea: z.string().optional(),
});

const productSchema = basePostSchema.extend({
	category: z.literal('productos'),
	condition: z.enum(['nuevo', 'reacondicionado']),
	stock: z.number().int().nonnegative().optional(),
	warranty: z.string().optional(),
});

const usedSchema = basePostSchema.extend({
	category: z.literal('usados'),
	condition: z.literal('usado'),
	usageTime: z.string().optional(),
});

const courseSchema = basePostSchema.extend({
	category: z.literal('cursos'),
	mode: z.enum(['presencial', 'online', 'híbrido']),
	duration: z.string(),
	schedule: z.string().optional(),
	level: z.enum(['principiante', 'intermedio', 'avanzado']).optional(),
});

const requestSchema = basePostSchema.extend({
	category: z.literal('pedidos'),
	neededBy: z
		.string()
		.optional(),
	budgetRange: z.string().optional(),
});

export const postSchema = z.discriminatedUnion('category', [
	eventSchema,
	serviceSchema,
	productSchema,
	usedSchema,
	courseSchema,
	requestSchema,
]);

export type PostInput = z.infer<typeof postSchema>;