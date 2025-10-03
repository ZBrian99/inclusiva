'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiPost, ListResponse } from '@/types/api';
import { categoryOptions, paymentMethodLabelsEs } from '@/lib/validation/post';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal, CheckCircle2, XCircle, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import { StatusInlineControl, AdminStatus } from '@/components/admin/StatusInlineControl';

type Status = AdminStatus;

export default function AdminPostsPage() {
	const router = useRouter();
	const qc = useQueryClient();
	const [q, setQ] = useState('');
	const [category, setCategory] = useState<string>('');
	const [status, setStatus] = useState<Status | ''>('');
	const [page, setPage] = useState(1);
	const pageSize = 24;

	const params = useMemo(() => {
		const sp = new URLSearchParams();
		if (q.trim()) sp.set('q', q.trim());
		if (category) sp.set('category', category);
		if (status) sp.set('status', status);
		sp.set('page', String(page));
		sp.set('pageSize', String(pageSize));
    sp.set('sort', 'recent');
    window.scrollTo(0, 0);
		return sp.toString();
	}, [q, category, status, page]);

	const { data, isLoading, isError } = useQuery<{ data: ApiPost[]; pagination: ListResponse['pagination'] }>({
		queryKey: ['admin-posts', params],
		queryFn: async () => {
			const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
			const res = await fetch(`/api/admin/posts?${params}`, {
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			});
			if (res.status === 401) {
				router.push('/admin/login');
				throw new Error('No autorizado');
			}
			if (!res.ok) throw new Error('Error al cargar publicaciones');
			return res.json();
		},
	});

	const posts = data?.data ?? [];
	const pagination = data?.pagination;

	// Quitamos modales de ver/editar
	const [detailPost, setDetailPost] = useState<ApiPost | null>(null);
	const [editPost, setEditPost] = useState<ApiPost | null>(null);
	const [deletePost, setDeletePost] = useState<ApiPost | null>(null);
	const [changingId, setChangingId] = useState<string | null>(null);

	async function changeStatus(id: string, next: Status) {
		const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
		setChangingId(id);
		const res = await fetch(`/api/admin/posts/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
			body: JSON.stringify({ status: next }),
		});
		if (res.status === 401) {
			router.push('/admin/login');
			return;
		}
		qc.invalidateQueries({ queryKey: ['admin-posts'] });
		setChangingId(null);
	}

	async function applyEdit(updated: Partial<ApiPost> & { id: string }) {
		const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
		const res = await fetch(`/api/admin/posts/${updated.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
			body: JSON.stringify(updated),
		});
		if (res.status === 401) {
			router.push('/admin/login');
			return;
		}
		setEditPost(null);
		qc.invalidateQueries({ queryKey: ['admin-posts'] });
	}

	async function confirmDelete(id: string) {
		const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
		const res = await fetch(`/api/admin/posts/${id}`, {
			method: 'DELETE',
			headers: token ? { Authorization: `Bearer ${token}` } : undefined,
		});
		if (res.status === 401) {
			router.push('/admin/login');
			return;
		}
		setDeletePost(null);
		qc.invalidateQueries({ queryKey: ['admin-posts'] });
	}

	// Eliminamos render de modales de ver/editar temporalmente

	return (
		<div className='px-4 max-w-7xl mx-auto py-6 min-h-[calc(100svh-5rem)] flex flex-col'>
			<div className='flex items-center justify-between gap-4 mb-6'>
				<h1 className='text-xl font-semibold'>Panel de Admin · Publicaciones</h1>
			</div>

			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 mb-4 items-end'>
				<div className='col-span-2'>
					<Input placeholder='Buscar por texto…' value={q} onChange={(e) => setQ(e.target.value)} />
				</div>
				<Select value={category || 'any'} onValueChange={(v) => setCategory(v === 'any' ? '' : v)}>
					<SelectGroup>
						<SelectLabel>Categoría</SelectLabel>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Categoría' />
						</SelectTrigger>
					</SelectGroup>
					<SelectContent>
						<SelectItem value='any'>Todas</SelectItem>
						{categoryOptions.map((c) => (
							<SelectItem className='py-2.5' key={c} value={c}>
								{c}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={status || 'any'} onValueChange={(v) => setStatus(v === 'any' ? '' : (v as Status))}>
					<SelectGroup>
						<SelectLabel>Estado</SelectLabel>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder='Estado' />
						</SelectTrigger>
					</SelectGroup>
					<SelectContent>
						<SelectItem className='py-2.5' value='any'>
							Todos
						</SelectItem>
						<SelectItem className='py-2.5' value='pending'>
							Pendiente
						</SelectItem>
						<SelectItem className='py-2.5' value='approved'>
							Aprobado
						</SelectItem>
						<SelectItem className='py-2.5' value='rejected'>
							Rechazado
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='rounded-md border '>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Estado</TableHead>
							<TableHead>Categoría</TableHead>
							<TableHead>Título</TableHead>
							<TableHead>Autor</TableHead>
							<TableHead className='text-right'>Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading && (
							<>
								{Array.from({ length: 8 }).map((_, i) => (
									<TableRow key={`skeleton-${i}`}>
										<TableCell>
											<Skeleton className='h-6 w-24' />
										</TableCell>
										<TableCell>
											<Skeleton className='h-6 w-28' />
										</TableCell>
										<TableCell>
											<div className='space-y-2'>
												<Skeleton className='h-5 w-64' />
												<Skeleton className='h-4 w-48' />
											</div>
										</TableCell>
										<TableCell>
											<Skeleton className='h-5 w-40' />
										</TableCell>
										<TableCell className='text-right'>
											<div className='flex justify-end gap-2'>
												<Skeleton className='h-8 w-8 rounded-md' />
												<Skeleton className='h-8 w-8 rounded-md' />
											</div>
										</TableCell>
									</TableRow>
								))}
							</>
						)}
						{isError && (
							<TableRow>
								<TableCell colSpan={5}>Error al cargar datos.</TableCell>
							</TableRow>
						)}
						{!isLoading && posts.length === 0 && (
							<TableRow>
								<TableCell colSpan={5}>No hay publicaciones.</TableCell>
							</TableRow>
						)}
						{posts.map((p) => (
							<TableRow key={p.id}>
								<TableCell className='whitespace-nowrap'>
									<StatusInlineControl
										status={(p.status as Status) || 'pending'}
										onChange={(next) => changeStatus(p.id, next)}
										loading={changingId === p.id}
										disabled={changingId === p.id}
									/>
								</TableCell>
								<TableCell className='capitalize'>{p.category}</TableCell>
								<TableCell>
									<div className='font-medium'>{p.title}</div>
									{p.subtitle && <div className='text-sm text-muted-foreground'>{p.subtitle}</div>}
								</TableCell>
								<TableCell>{p.author}</TableCell>
								<TableCell className='text-right'>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='ghost' size='icon'>
												<MoreHorizontal className='h-4 w-4' />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuItem onClick={() => router.push(`/publicaciones/${p.id}`)}>
												<Eye className='h-4 w-4 mr-2' /> Ver detalle
											</DropdownMenuItem>
											{/* Editar deshabilitado temporalmente */}
											<DropdownMenuSeparator />
											<DropdownMenuItem className='text-red-600' onClick={() => setDeletePost(p)}>
												<Trash2 className='h-4 w-4 mr-2' /> Eliminar
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{pagination?.totalPages && pagination?.totalPages > 1 && (
				<div className='flex items-center justify-between mt-auto pt-4'>
					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							disabled={!pagination?.hasPrev}
							onClick={() => setPage((p) => Math.max(1, p - 1))}
						>
							Anterior
						</Button>
						<span className='text-sm'>
							Página {pagination?.page ?? page} de {pagination?.totalPages ?? 1}
						</span>
						<Button variant='outline' disabled={!pagination?.hasNext} onClick={() => setPage((p) => p + 1)}>
							Siguiente
						</Button>
					</div>
				</div>
			)}
			{/* Eliminar */}
			<AlertDialog open={!!deletePost} onOpenChange={(o) => !o && setDeletePost(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Eliminar esta publicación?</AlertDialogTitle>
					</AlertDialogHeader>
					<div className='text-sm text-muted-foreground'>Esta acción no puede deshacerse.</div>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => deletePost && confirmDelete(deletePost.id)}
							className='bg-red-600 hover:bg-red-700'
						>
							Eliminar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
