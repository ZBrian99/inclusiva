// Tipos de Prisma no disponibles en este entorno; usar tipos genéricos

export type ListParams = {
	q?: string;
	category?: string;
	status?: 'pending' | 'approved' | 'rejected';
	minPrice?: number;
	maxPrice?: number;
	urgent?: boolean;
	mode?: 'presencial' | 'online' | 'hibrido';
};

function normalize(str: string) {
	return str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

export function buildPostWhere(params: ListParams, opts?: { includeNonApproved?: boolean }): Record<string, any> {
    const where: Record<string, any> = {};

	// Status: by default only approved
	if (!opts?.includeNonApproved) {
		where.status = 'approved';
	} else if (params.status) {
		where.status = params.status;
	}

	if (params.category) {
		where.category = params.category as any;
	}

	if (params.urgent !== undefined) {
		where.urgent = params.urgent;
	}

	if (params.minPrice !== undefined || params.maxPrice !== undefined) {
		where.price = {};
		if (params.minPrice !== undefined) where.price.gte = params.minPrice;
		if (params.maxPrice !== undefined) where.price.lte = params.maxPrice;
	}

	if (params.mode) {
		where.mode = params.mode as any;
	}

	if (params.q && params.q.trim().length > 0) {
		const qRaw = params.q.trim();
		const q = normalize(qRaw);
		where.OR = [
			{ title: { contains: q, mode: 'insensitive' } },
			{ subtitle: { contains: q, mode: 'insensitive' } },
			{ description: { contains: q, mode: 'insensitive' } },
			{ location: { contains: q, mode: 'insensitive' } },
			{ author: { contains: q, mode: 'insensitive' } },
			{ tags: { has: q } },
		];
	}

	return where;
}

export type SortKey = 'recent' | 'price_asc' | 'price_desc' | 'rating_desc';

export function resolveOrderBy(sort?: SortKey): Record<string, any> | Record<string, any>[] {
    switch (sort) {
        case 'price_asc':
            return { price: 'asc' };
        case 'price_desc':
            return { price: 'desc' };
        case 'rating_desc':
            return { rating: 'desc' };
        case 'recent':
        default:
            return [{ status: 'asc' }, { createdAt: 'asc' }];
    }
}
