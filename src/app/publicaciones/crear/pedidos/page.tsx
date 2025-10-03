'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { requestSchema, paymentMethodOptions, paymentMethodLabelsEs } from '@/lib/validation/post';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

type RequestFormValues = z.infer<typeof requestSchema>;

export default function CrearPedidoPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RequestFormValues>({
		resolver: zodResolver(requestSchema),
		mode: 'onSubmit',
		defaultValues: {
			category: 'pedidos',
			title: '',
			description: '',
			image:
				'https://image.pollinations.ai/prompt/Board%20game%20afternoon%20in%20community%20center%2C%20diverse%20group%2C%20Mar%20del%20Plata%20Camet%2C%20photorealistic%2C%20warm%20light?width=1200&height=800&model=flux-realism&enhance=true&nologo=true',
			author: '',
			authorAvatar: undefined,
			location: '',
			socials: [{ name: '', url: '' }],
			payment: [],
			price: undefined,
			priceLabel: undefined,
			neededBy: undefined,
			budgetRange: undefined,
		},
	});

  const socialNameOptions = [
    'instagram',
    'facebook',
    'twitter',
    'whatsapp',
    'telegram',
    'email',
    'website',
    'otro',
  ] as const;

  const socialsFieldArray = useFieldArray({ control: form.control, name: 'socials' });

  async function onSubmit(values: RequestFormValues) {
    setSubmitting(true);
    try {
      const payload = { ...values, category: 'pedidos' as const };
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let message = `Error ${res.status}`;
        try {
          const data = await res.json();
          if (typeof (data as any)?.error === 'string') message = (data as any).error;
          else if ((data as any)?.error?.formErrors?.length) message = (data as any).error.formErrors.join(', ');
          else if ((data as any)?.error?.fieldErrors) {
            const fields = Object.values<string[]>((data as any).error.fieldErrors as any).flat();
            if (fields.length) message = fields.join(', ');
          } else if (typeof (data as any)?.message === 'string') message = (data as any).message;
        } catch {
          const text = await res.text().catch(() => '');
          if (text) message = text;
        }
        throw new Error(message || 'Error al crear la publicación');
      }
      toast.success('Tu pedido se envió para validación. Redirigiendo...');
      router.push('/publicaciones');
    } catch (e: any) {
      toast.error(e?.message || 'No pudimos crear tu publicación');
    } finally {
      setSubmitting(false);
    }
  }

  return (
		<div className='mx-auto max-w-3xl px-4 py-8'>
			<div className='mb-6'>
				<h1 className='text-2xl font-semibold'>Publicar pedido</h1>
				<p className='text-muted-foreground'>Describe lo que necesitas y cómo contactarte</p>
			</div>

			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					{/* Título */}
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormLabel>Título</FormLabel>
									<Badge variant='outline'>Requerido</Badge>
								</div>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ''}
										onBlur={() => {
											field.onBlur();
											form.trigger('title');
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Imagen (URL) */}
					<FormField
						control={form.control}
						name='image'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormLabel>Imagen (URL)</FormLabel>
									<Badge variant='outline'>Requerido</Badge>
								</div>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ''}
										placeholder='https://...'
										onBlur={() => {
											field.onBlur();
											form.trigger('image');
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Avatar del autor (URL) */}
					<FormField
						control={form.control}
						name='authorAvatar'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormLabel>Avatar (URL)</FormLabel>
									<Badge variant='outline'>Opcional</Badge>
								</div>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ''}
										placeholder='https://...'
										onBlur={() => {
											field.onBlur();
											form.trigger('authorAvatar');
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Subtítulo */}
					<FormField
						control={form.control}
						name='subtitle'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormLabel>Subtítulo</FormLabel>
									<Badge variant='outline'>Opcional</Badge>
								</div>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ''}
										onBlur={() => {
											const v = (field.value ?? '').toString().trim();
											if (v === '') {
												form.setValue('subtitle', undefined, { shouldValidate: true });
												form.clearErrors('subtitle');
											} else {
												field.onBlur();
												form.trigger('subtitle');
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Descripción */}
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormLabel>Descripción</FormLabel>
									<Badge variant='outline'>Requerido</Badge>
								</div>
								<FormControl>
									<Textarea
										rows={5}
										{...field}
										value={field.value ?? ''}
										onBlur={() => {
											field.onBlur();
											form.trigger('description');
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Autor */}
					<FormField
						control={form.control}
						name='author'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormLabel>Autor</FormLabel>
									<Badge variant='outline'>Requerido</Badge>
								</div>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ''}
										onBlur={() => {
											field.onBlur();
											form.trigger('author');
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Ubicación */}
					<FormField
						control={form.control}
						name='location'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormLabel>Ubicación</FormLabel>
									<Badge variant='outline'>Requerido</Badge>
								</div>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ''}
										onBlur={() => {
											field.onBlur();
											form.trigger('location');
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Métodos de pago (multiselección) */}
					<FormField
						control={form.control}
						name='payment'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center gap-2'>
									<FormLabel>Métodos de pago</FormLabel>
									<Badge variant='outline'>Opcional</Badge>
								</div>
								<div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
									{paymentMethodOptions.map((pm) => (
										<label key={pm} className='flex items-center gap-2 rounded-md border p-2'>
											<Checkbox
												checked={field.value?.includes(pm) ?? false}
												onCheckedChange={(checked) => {
													const set = new Set(field.value || []);
													if (checked) set.add(pm);
													else set.delete(pm);
													field.onChange(Array.from(set));
												}}
											/>
											<span>{paymentMethodLabelsEs[pm]}</span>
										</label>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Redes / Contactos */}
					<div className='space-y-3'>
						<div className='flex items-center gap-2'>
							<FormLabel>Redes / Contactos</FormLabel>
							<Badge variant='outline'>Requerido</Badge>
						</div>
						{socialsFieldArray.fields.map((f, idx) => (
							<div key={f.id} className='grid gap-3 sm:grid-cols-[1fr_2fr_auto] items-end'>
								{/* Select de nombre */}
								<FormField
									control={form.control}
									name={`socials.${idx}.name` as const}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Select onValueChange={field.onChange} value={field.value as any}>
													<SelectTrigger className='w-full'>
														<SelectValue placeholder='Seleccionar' />
													</SelectTrigger>
													<SelectContent>
														{socialNameOptions.map((opt) => (
															<SelectItem key={opt} value={opt}>
																{opt}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{/* Valor */}
								<FormField
									control={form.control}
									name={`socials.${idx}.url` as const}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder='@usuario / número / enlace' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex justify-end'>
									<Button
										type='button'
										variant='ghost'
										disabled={socialsFieldArray.fields.length <= 1}
										onClick={() => socialsFieldArray.remove(idx)}
									>
										Quitar
									</Button>
								</div>
							</div>
						))}
						<div className='flex gap-2'>
							<Button type='button' variant='outline' onClick={() => socialsFieldArray.append({ name: '', url: '' })}>
								Agregar contacto
							</Button>
						</div>
					</div>

					{/* Fecha límite y presupuesto */}
					<div className='grid gap-4 sm:grid-cols-2'>
						<FormField
							control={form.control}
							name='neededBy'
							render={({ field }) => (
								<FormItem>
									<div className='flex items-center gap-2'>
										<FormLabel>Fecha límite</FormLabel>
										<Badge variant='outline'>Opcional</Badge>
									</div>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ''}
											placeholder='AAAA-MM-DD o texto'
											onBlur={() => {
												const v = (field.value ?? '').toString().trim();
												if (v === '') {
													form.setValue('neededBy', undefined, { shouldValidate: true });
													form.clearErrors('neededBy');
												} else {
													field.onBlur();
													form.trigger('neededBy');
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='budgetRange'
							render={({ field }) => (
								<FormItem>
									<div className='flex items-center gap-2'>
										<FormLabel>Presupuesto</FormLabel>
										<Badge variant='outline'>Opcional</Badge>
									</div>
									<FormControl>
										<Input
											{...field}
											value={field.value ?? ''}
											placeholder='Ej: 20.000 - 40.000'
											onBlur={() => {
												const v = (field.value ?? '').toString().trim();
												if (v === '') {
													form.setValue('budgetRange', undefined, { shouldValidate: true });
													form.clearErrors('budgetRange');
												} else {
													field.onBlur();
													form.trigger('budgetRange');
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='flex justify-center'>
						<Button type='submit' disabled={submitting}>
							{submitting ? 'Enviando...' : 'Publicar pedido'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}