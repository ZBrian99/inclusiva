"use client";

import { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, categoryOptions, paymentMethodOptions } from '@/lib/validation/post';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wizard, WizardStep, WizardStepsIndicator, WizardNavigation, useWizard } from '@/components/ui/wizard';
import { Badge } from '@/components/ui/badge';
import { z } from 'zod';
import { FaCheck, FaInfoCircle, FaImage, FaUser, FaMapMarkerAlt, FaCreditCard, FaPhone } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// RHF works better with a superset type instead of a discriminated union for field paths
export type Category = (typeof categoryOptions)[number];
export type PaymentMethod = (typeof paymentMethodOptions)[number];

export type FormValues = {
	// base
	id?: string;
	category: Category;
	title: string;
	subtitle?: string;
	description: string;
	image: string;
	author: string;
	authorAvatar: string;
	location: string;
	price?: number;
	priceLabel?: string;
	rating?: number;
	ratingCount?: number;
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
	barterAccepted?: boolean;
	// eventos
	startDate?: string;
	endDate?: string;
	venue?: string;
	mode?: 'presencial' | 'online' | 'híbrido';
	capacity?: number;
	organizer?: string;
	// servicios
	experienceYears?: number;
	availability?: string;
	serviceArea?: string;
	// productos / usados
	condition?: 'nuevo' | 'reacondicionado' | 'usado';
	stock?: number;
	warranty?: string;
	usageTime?: string;
	// cursos
	duration?: string;
	schedule?: string;
	level?: 'principiante' | 'intermedio' | 'avanzado';
	// pedidos
	neededBy?: string;
	budgetRange?: string;
};

const categoryLabels: Record<Category, string> = {
	eventos: 'Eventos',
	servicios: 'Servicios',
	productos: 'Productos',
	usados: 'Usados',
	cursos: 'Cursos',
	pedidos: 'Pedidos',
};

const categoryDescriptions: Record<Category, string> = {
	eventos: 'Conciertos, ferias, talleres y más',
	servicios: 'Servicios profesionales y técnicos',
	productos: 'Productos nuevos y reacondicionados',
	usados: 'Artículos de segunda mano',
	cursos: 'Capacitaciones y formación',
	pedidos: 'Solicitudes de productos o servicios',
};

function FormField({ label, error, children, className = "" }: {
	label: string;
	error?: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={`space-y-2 ${className}`}>
			<Label className="text-sm font-medium text-foreground">{label}</Label>
			{children}
			{error && (
				<p className="text-sm text-red-400 flex items-center gap-1">
					<FaInfoCircle className="w-3 h-3" />
					{error}
				</p>
			)}
		</div>
	);
}

function PaymentMethodButton({ method, isSelected, onToggle }: {
	method: PaymentMethod;
	isSelected: boolean;
	onToggle: () => void;
}) {
	return (
		<Button
			type="button"
			variant={isSelected ? "default" : "outline"}
			size="sm"
			onClick={onToggle}
			className={`relative transition-all duration-200 ${
				isSelected ? 'ring-2 ring-primary/50' : 'hover:border-primary/50'
			}`}
		>
			{isSelected && (
				<FaCheck className="w-3 h-3 mr-1" />
			)}
			<span className="capitalize">{method}</span>
		</Button>
	);
}

function CategoryStep({ __isWizardStep }: { __isWizardStep?: boolean }) {
	const methods = useFormContext<FormValues>();
	const selectedCategory = methods.watch('category');

	return (
		<WizardStep 
    className='py-8'
			title="¿Qué querés publicar?"
			description="Elegí el tipo de publicación que mejor se adapte a lo que ofrecés"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{categoryOptions.map((category) => {
					const isSelected = selectedCategory === category;
					return (
						<Card 
							key={category}
							className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
								isSelected 
									? 'ring-2 ring-primary border-primary bg-primary/5' 
									: 'hover:border-primary/50'
							}`}
							onClick={() => methods.setValue('category', category)}
						>
							<CardContent className="p-4 text-center">
								<h3 className="font-semibold text-lg mb-2">
									{categoryLabels[category]}
								</h3>
								<p className="text-sm text-muted-foreground">
									{categoryDescriptions[category]}
								</p>
								{isSelected && (
									<Badge className="mt-3">
										<FaCheck className="w-3 h-3 mr-1" />
										Seleccionado
									</Badge>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
			<input type="hidden" {...methods.register('category')} />
		</WizardStep>
	);
}

function BasicInfoStep({ __isWizardStep }: { __isWizardStep?: boolean }) {
	const methods = useFormContext<FormValues>();
	const { formState: { errors } } = methods;

	return (
		<WizardStep 
			title="Información básica"
			description="Contanos los detalles principales de tu publicación"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FormField 
					label="Título" 
					error={errors.title?.message as string}
					className="md:col-span-2"
				>
					<Input 
						{...methods.register('title')} 
						placeholder="Ej: Feria Diversa MDP" 
						className="text-base"
					/>
				</FormField>

				<FormField 
					label="Subtítulo (opcional)" 
					error={errors.subtitle?.message as string}
					className="md:col-span-2"
				>
					<Input 
						{...methods.register('subtitle')} 
						placeholder="Una breve descripción que complemente el título" 
					/>
				</FormField>

				<FormField 
					label="Descripción completa" 
					error={errors.description?.message as string}
					className="md:col-span-2"
				>
					<Textarea 
						{...methods.register('description')} 
						placeholder="Contá todos los detalles importantes. ¿Qué incluye? ¿Qué hace especial a tu publicación?" 
						rows={4}
						className="resize-none"
					/>
				</FormField>

				<FormField 
					label="Imagen principal" 
					error={errors.image?.message as string}
					className="md:col-span-2"
				>
					<Input 
						{...methods.register('image')} 
						placeholder="https://ejemplo.com/imagen.jpg" 
					/>
				</FormField>

				<FormField 
					label="Tu nombre" 
					error={errors.author?.message as string}
				>
					<Input 
						{...methods.register('author')} 
						placeholder="Como querés que te conozcan" 
					/>
				</FormField>

				<FormField 
					label="Tu foto de perfil" 
					error={errors.authorAvatar?.message as string}
				>
					<Input 
						{...methods.register('authorAvatar')} 
						placeholder="https://ejemplo.com/avatar.jpg" 
					/>
				</FormField>

				<FormField 
					label="Ubicación" 
					error={errors.location?.message as string}
				>
					<Input 
						{...methods.register('location')} 
						placeholder="Barrio, zona o ciudad" 
					/>
				</FormField>

				<FormField 
					label="Fecha" 
					error={errors.date?.message as string}
				>
					<Input 
						{...methods.register('date')} 
						type="date"
					/>
				</FormField>
			</div>
		</WizardStep>
	);
}

function CategorySpecificStep({ __isWizardStep }: { __isWizardStep?: boolean }) {
	const methods = useFormContext<FormValues>();
	const category = methods.watch('category');
	const { formState: { errors } } = methods;

	if (!category || category === 'pedidos') return null;

	const renderEventFields = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<FormField label="Fecha de inicio">
				<Input 
					{...methods.register('startDate')} 
					type="datetime-local"
				/>
			</FormField>
			<FormField label="Fecha de fin (opcional)">
				<Input 
					{...methods.register('endDate')} 
					type="datetime-local"
				/>
			</FormField>
			<FormField label="Lugar">
				<Input 
					{...methods.register('venue')} 
					placeholder="Plaza España, Centro Cultural, etc." 
				/>
			</FormField>
			<FormField label="Modalidad">
				<Select onValueChange={(v) => {
					if (v === 'presencial' || v === 'online' || v === 'híbrido') {
						methods.setValue('mode', v);
					}
				}}>
					<SelectTrigger>
						<SelectValue placeholder="¿Cómo se realizará?" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="presencial">Presencial</SelectItem>
						<SelectItem value="online">Online</SelectItem>
						<SelectItem value="híbrido">Híbrido</SelectItem>
					</SelectContent>
				</Select>
			</FormField>
			<FormField label="Capacidad (opcional)">
				<Input 
					{...methods.register('capacity', { valueAsNumber: true })} 
					type="number"
					placeholder="Número máximo de personas"
				/>
			</FormField>
			<FormField label="Organiza">
				<Input 
					{...methods.register('organizer')} 
					placeholder="Nombre de la organización o persona" 
				/>
			</FormField>
		</div>
	);

	const renderServiceFields = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<FormField label="Años de experiencia">
				<Input 
					{...methods.register('experienceYears', { valueAsNumber: true })} 
					type="number"
					placeholder="¿Cuántos años de experiencia tenés?"
				/>
			</FormField>
			<FormField label="Disponibilidad">
				<Input 
					{...methods.register('availability')} 
					placeholder="Ej: Lun-Vie 9-18, Fines de semana" 
				/>
			</FormField>
			<FormField label="Zona de trabajo" className="md:col-span-2">
				<Input 
					{...methods.register('serviceArea')} 
					placeholder="¿En qué zonas ofrecés tu servicio?" 
				/>
			</FormField>
		</div>
	);

	const renderProductFields = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<FormField label="Condición">
				<Select onValueChange={(v) => {
					if (v === 'nuevo' || v === 'reacondicionado') {
						methods.setValue('condition', v);
					}
				}}>
					<SelectTrigger>
						<SelectValue placeholder="Estado del producto" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="nuevo">Nuevo</SelectItem>
						<SelectItem value="reacondicionado">Reacondicionado</SelectItem>
					</SelectContent>
				</Select>
			</FormField>
			<FormField label="Stock disponible">
				<Input 
					{...methods.register('stock', { valueAsNumber: true })} 
					type="number"
					placeholder="¿Cuántas unidades tenés?"
				/>
			</FormField>
			<FormField label="Garantía" className="md:col-span-2">
				<Input 
					{...methods.register('warranty')} 
					placeholder="Ej: 12 meses, Sin garantía, Garantía del fabricante" 
				/>
			</FormField>
		</div>
	);

	const renderUsedFields = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<FormField label="Tiempo de uso">
				<Input 
					{...methods.register('usageTime')} 
					placeholder="Ej: 2 años, Poco uso, Como nuevo" 
				/>
			</FormField>
			<FormField label="Condición">
				<div className="p-3 bg-muted rounded-md text-sm">
					Usado
				</div>
			</FormField>
		</div>
	);

	const renderCourseFields = () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<FormField label="Modalidad">
				<Select onValueChange={(v) => {
					if (v === 'presencial' || v === 'online' || v === 'híbrido') {
						methods.setValue('mode', v);
					}
				}}>
					<SelectTrigger>
						<SelectValue placeholder="¿Cómo se dicta?" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="presencial">Presencial</SelectItem>
						<SelectItem value="online">Online</SelectItem>
						<SelectItem value="híbrido">Híbrido</SelectItem>
					</SelectContent>
				</Select>
			</FormField>
			<FormField label="Duración">
				<Input 
					{...methods.register('duration')} 
					placeholder="Ej: 8 semanas, 3 meses, 40 horas" 
				/>
			</FormField>
			<FormField label="Horarios">
				<Input 
					{...methods.register('schedule')} 
					placeholder="Ej: Mar y Jue 19-21, Sábados 10-13" 
				/>
			</FormField>
			<FormField label="Nivel">
				<Select onValueChange={(v) => {
					if (v === 'principiante' || v === 'intermedio' || v === 'avanzado') {
						methods.setValue('level', v);
					}
				}}>
					<SelectTrigger>
						<SelectValue placeholder="¿Para qué nivel?" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="principiante">Principiante</SelectItem>
						<SelectItem value="intermedio">Intermedio</SelectItem>
						<SelectItem value="avanzado">Avanzado</SelectItem>
					</SelectContent>
				</Select>
			</FormField>
		</div>
	);

	const getStepTitle = () => {
		switch (category) {
			case 'eventos': return 'Detalles del evento';
			case 'servicios': return 'Información del servicio';
			case 'productos': return 'Detalles del producto';
			case 'usados': return 'Información del artículo';
			case 'cursos': return 'Detalles del curso';
			default: return 'Información específica';
		}
	};

	const getStepDescription = () => {
		switch (category) {
			case 'eventos': return 'Contanos cuándo y dónde será tu evento';
			case 'servicios': return 'Ayudanos a entender tu experiencia y disponibilidad';
			case 'productos': return 'Información técnica y de stock';
			case 'usados': return 'Estado y tiempo de uso del artículo';
			case 'cursos': return 'Modalidad, duración y nivel del curso';
			default: return 'Información adicional';
		}
	};

	const renderFields = () => {
		switch (category) {
			case 'eventos': return renderEventFields();
			case 'servicios': return renderServiceFields();
			case 'productos': return renderProductFields();
			case 'usados': return renderUsedFields();
			case 'cursos': return renderCourseFields();
			default: return null;
		}
	};

	return (
		<WizardStep 
			title={getStepTitle()}
			description={getStepDescription()}
		>
			{renderFields()}
		</WizardStep>
	);
}

function RequestSpecificStep({ __isWizardStep }: { __isWizardStep?: boolean }) {
	const methods = useFormContext<FormValues>();
	const category = methods.watch('category');

	if (category !== 'pedidos') return null;

	return (
		<WizardStep 
			title="Detalles del pedido"
			description="Contanos qué necesitás y para cuándo"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FormField label="Lo necesito para">
					<Input 
						{...methods.register('neededBy')} 
						type="date"
					/>
				</FormField>
				<FormField label="Presupuesto disponible">
					<Input 
						{...methods.register('budgetRange')} 
						placeholder="Ej: Hasta $30.000, A convenir" 
					/>
				</FormField>
			</div>
		</WizardStep>
	);
}

function PricingAndContactStep({ __isWizardStep }: { __isWizardStep?: boolean }) {
	const methods = useFormContext<FormValues>();
	const [selectedPayments, setSelectedPayments] = useState<PaymentMethod[]>([]);
	const { formState: { errors } } = methods;

	useEffect(() => {
		methods.setValue('payment', selectedPayments);
	}, [selectedPayments, methods]);

	const togglePaymentMethod = (method: PaymentMethod) => {
		setSelectedPayments(prev => 
			prev.includes(method) 
				? prev.filter(p => p !== method)
				: [...prev, method]
		);
	};

	return (
		<WizardStep 
			title="Precio y contacto"
			description="Información comercial y formas de contacto"
		>
			<div className="space-y-8">
				{/* Pricing Section */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold flex items-center gap-2">
						<FaCreditCard className="w-4 h-4" />
						Precio
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField 
							label="Precio (ARS)" 
							error={errors.price?.message as string}
						>
							<Input 
								{...methods.register('price', { valueAsNumber: true })} 
								type="number"
								placeholder="Dejá vacío si es gratuito"
							/>
						</FormField>
						<FormField label="Etiqueta de precio (opcional)">
							<Input 
								{...methods.register('priceLabel')} 
								placeholder="A convenir, Gratuito, Por hora" 
							/>
						</FormField>
					</div>
				</div>

				{/* Payment Methods */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Métodos de pago aceptados</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
						{paymentMethodOptions.map((method) => (
							<PaymentMethodButton
								key={method}
								method={method}
								isSelected={selectedPayments.includes(method)}
								onToggle={() => togglePaymentMethod(method)}
							/>
						))}
					</div>
				</div>

				{/* Tags */}
				<FormField label="Etiquetas (separadas por coma)" className="">
					<Input 
						placeholder="tecnología, programación, diseño" 
						onBlur={(e) => {
							const value = e.target.value;
							if (value) {
								const tags = value.split(',').map(s => s.trim()).filter(Boolean);
								methods.setValue('tags', tags);
							}
						}}
					/>
				</FormField>

				{/* Contact Section */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold flex items-center gap-2">
						<FaPhone className="w-4 h-4" />
						Contacto
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<FormField label="Instagram">
							<Input 
								{...methods.register('contact.instagram')} 
								placeholder="@tuusuario o URL completa" 
							/>
						</FormField>
						<FormField label="WhatsApp">
							<Input 
								{...methods.register('contact.whatsapp')} 
								placeholder="+54 9 11 1234-5678" 
							/>
						</FormField>
						<FormField label="Email">
							<Input 
								{...methods.register('contact.email')} 
								type="email"
								placeholder="tu@email.com" 
							/>
						</FormField>
					</div>
				</div>

				{/* Urgent Toggle */}
				<div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
					<Switch 
						id="urgent" 
						checked={methods.watch('urgent') ?? false} 
						onCheckedChange={(checked) => methods.setValue('urgent', checked)} 
					/>
					<Label htmlFor="urgent" className="text-sm font-medium">
						Marcar como urgente
					</Label>
				</div>
			</div>
		</WizardStep>
	);
}

export default function NewPostPage() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(0);
	const methods = useForm<z.input<typeof postSchema>, any, z.output<typeof postSchema>>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			category: 'servicios',
			title: 'Diseño gráfico y branding inclusivo',
			subtitle: 'Identidad visual que representa tu diversidad',
			description: 'Ofrezco servicios de diseño gráfico especializado en marcas inclusivas y diversas. Creo logotipos, identidad corporativa, material publicitario y diseño web que refleje los valores de inclusión y diversidad de tu proyecto o empresa.',
			image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
			author: 'Alex Martínez',
			authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
			location: 'Güemes, Mar del Plata',
			date: new Date().toISOString().split('T')[0],
			price: 25000,
			priceLabel: 'desde',
			tags: ['diseño', 'branding', 'inclusivo', 'lgbtq+'],
			contact: {
				instagram: '@alex.design.inclusivo',
				whatsapp: '+54 9 223 603-2601',
				email: 'alex@disenoinclusivo.com'
			},
			payment: ['transfer', 'mercadopago', 'crypto'],
			experienceYears: 5,
			availability: 'Lun-Vie 10-18hs',
			serviceArea: 'Mar del Plata y alrededores, también trabajo remoto',
			urgent: false,
			barterAccepted: true,
		},
		mode: 'onBlur',
	});

	const category = methods.watch('category');

	useEffect(() => {
		methods.clearErrors();
	}, [category, methods]);

	const handlePublish = async () => {
		const isValid = await methods.trigger();
		if (!isValid) {
			// Obtener errores específicos para mostrar en consola
			const errors = methods.formState.errors;
			console.error('Errores de validación:', errors);
			const errorMessages = Object.keys(errors).map(field => {
				const error = errors[field as keyof typeof errors];
				return `${field}: ${error?.message || 'Campo requerido'}`;
			}).join(', ');
			throw new Error(`Por favor completá todos los campos requeridos: ${errorMessages}`);
		}

		const data = methods.getValues();
		try {
			// Simular creación de publicación (solo frontend)
			const postData = {
				...data,
				id: `${data.category}-${Date.now()}`,
				rating: 0,
				ratingCount: 0,
			};

			// Simular delay de red
			await new Promise(resolve => setTimeout(resolve, 1000));

			// En una implementación real, aquí se enviaría al backend
			console.log('Datos de la publicación:', postData);
			
			// Mostrar mensaje de confirmación
      toast.success('¡Publicación creada exitosamente!', {
				description: 'Tu publicación está siendo revisada por nuestro equipo y aparecerá en la lista una vez aprobada.',
				duration: 10000,
			});
			
			// Redirigir a /publicaciones con delay
			setTimeout(() => {
				router.push('/publicaciones');
			}, 1500);
		} catch (error) {
			console.error('Error:', error);
			if (error instanceof Error && !error.message.includes('Por favor completá')) {
				toast.error('Error al crear la publicación', {
					description: 'Ocurrió un error inesperado. Por favor, intentá de nuevo.',
					duration: 5000,
				});
			}
			throw error;
		}
	};

	const handleCancel = () => {
		const hasChanges = Object.keys(methods.formState.dirtyFields).length > 0;
		
		if (hasChanges) {
			const confirmed = confirm('¿Estás seguro de que querés cancelar? Se perderán todos los cambios.');
			if (!confirmed) return;
		}
		
		router.push('/publicaciones');
	};

	const steps = [
		{ title: 'Tipo', description: 'Categoría' },
		{ title: 'Básico', description: 'Información' },
		{ title: 'Detalles', description: 'Específicos' },
		{ title: 'Precio', description: 'Y contacto' },
	];

	// Filter steps based on category
	const getVisibleSteps = () => {
		if (category === 'pedidos') {
			return [
				{ title: 'Tipo', description: 'Categoría' },
				{ title: 'Básico', description: 'Información' },
				{ title: 'Pedido', description: 'Detalles' },
				{ title: 'Precio', description: 'Y contacto' },
			];
		}
		return steps;
	};

	const validateStep = async (step: number): Promise<boolean> => {
		const fieldsToValidate: Record<number, string[]> = {
			0: ['category'],
			1: ['title', 'description', 'image', 'author', 'authorAvatar', 'location', 'date'],
			2: [], // Category-specific fields are optional
			3: [], // Pricing and contact are optional
		};

		const fields = fieldsToValidate[step] || [];
		if (fields.length === 0) return true;

		const result = await methods.trigger(fields as any);
		return result;
	};

	return (
			<div className="container mx-auto max-w-4xl p-6">
				<div className="mb-8 mt-6">
					<h1 className="text-3xl font-bold text-foreground mb-2">
						Crear publicación
					</h1>
					<p className="text-muted-foreground">
						Seguí estos pasos para crear tu publicación de forma fácil y rápida
					</p>
				</div>

				<FormProvider {...methods}>
					<div>
						<Wizard 
							defaultStep={currentStep} 
							onStepChange={setCurrentStep}
							className="space-y-8"
						>
							<WizardStepsIndicator steps={getVisibleSteps()} className="mb-8" />
							
							<CategoryStep __isWizardStep />
							<BasicInfoStep __isWizardStep />
							{category !== 'pedidos' ? <CategorySpecificStep __isWizardStep /> : <RequestSpecificStep __isWizardStep />}
							<PricingAndContactStep __isWizardStep />
							
							<WizardNavigation 
								onNext={async () => {
									const isValid = await validateStep(currentStep);
									if (!isValid) {
										// Obtener errores específicos
										const errors = methods.formState.errors;
									const errorMessages = Object.keys(errors).map(field => `${field}: ${(errors as any)[field]?.message || 'Campo requerido'}`).join(', ');
										throw new Error(`Por favor completá los campos requeridos: ${errorMessages}`);
									}
								}}
								onPublish={handlePublish}
								onCancel={handleCancel}
							/>
						</Wizard>
					</div>
				</FormProvider>
			</div>
		);
}