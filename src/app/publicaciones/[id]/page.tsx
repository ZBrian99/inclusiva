'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { posts, type Post, type EventPost, type ServicePost, type ProductPost, type UsedPost, type CoursePost, type RequestPost, categoryToGradientClass } from '@/data/posts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
  FaArrowLeft,
  FaExternalLinkAlt,
  FaPhone,
  FaHeart,
  FaShare
} from 'react-icons/fa'
import Link from 'next/link'

type PageProps = {
  params: Promise<{ id: string }>
}

const categoryLabel: Record<string, string> = {
  eventos: 'Eventos',
  servicios: 'Servicios', 
  productos: 'Productos',
  usados: 'Usados',
  cursos: 'Cursos',
  pedidos: 'Pedidos',
}

const categoryIcon: Record<string, React.ElementType> = {
  eventos: FaCalendarAlt,
  servicios: FaTools,
  productos: FaStore,
  usados: FaExchangeAlt,
  cursos: FaGraduationCap,
  pedidos: FaSearch,
}

function formatPrice(value?: number, label?: string): string | null {
  if (label && label.trim().length > 0) return label
  if (typeof value !== 'number') return null
  if (value === 0) return 'Gratuito'
  return `$ ${value.toLocaleString('es-AR')}`
}

function formatDateTime(iso?: string): string | null {
  if (!iso) return null
  try {
    const d = new Date(iso)
    return d.toLocaleString('es-AR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    })
  } catch {
    return iso
  }
}

const paymentMeta: Record<string, { icon: React.ElementType; className: string; label: string }> = {
  cash: { icon: FaMoneyBill, className: 'text-green-400', label: 'Efectivo' },
  debit: { icon: FaCreditCard, className: 'text-blue-400', label: 'Débito' },
  credit: { icon: FaCreditCard, className: 'text-purple-400', label: 'Crédito' },
  transfer: { icon: FaUniversity, className: 'text-cyan-400', label: 'Transferencia' },
  mercadopago: { icon: FaWallet, className: 'text-sky-400', label: 'Billetera virtual' },
  crypto: { icon: FaBitcoin, className: 'text-orange-400', label: 'Cripto' },
  barter: { icon: FaHandshake, className: 'text-amber-400', label: 'Canje' },
  all: { icon: FaMoneyCheckAlt, className: 'text-slate-400', label: 'Todos los medios' },
}

const contactMeta: Record<string, { icon: React.ElementType; className: string; label: string }> = {
  whatsapp: { icon: FaWhatsapp, className: 'text-green-400', label: 'WhatsApp' },
  instagram: { icon: FaInstagram, className: 'text-pink-400', label: 'Instagram' },
  telegram: { icon: FaTelegramPlane, className: 'text-blue-400', label: 'Telegram' },
  email: { icon: FaEnvelope, className: 'text-slate-400', label: 'Email' },
  website: { icon: FaGlobe, className: 'text-cyan-400', label: 'Sitio web' },
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params
  const post = posts.find(p => p.id === id)
  
  if (!post) {
    notFound()
  }

  const priceText = formatPrice(post.price, post.priceLabel)
  const CategoryIcon = categoryIcon[post.category]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header con botón de regreso */}
        <div className="flex items-center justify-between p-6">
          <Link href="/publicaciones">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Volver
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <FaShare className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
              <FaHeart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Imagen principal */}
        <div className="relative h-[40vh] lg:h-[50vh] mx-6 rounded-2xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Contenido principal */}
        <div className="p-6 space-y-8">
          {/* Header de información */}
           <div className="space-y-6">
             <div className="flex flex-wrap items-center justify-between gap-4">
               <div className="flex flex-wrap items-center gap-3">
                 <Badge 
                   variant="secondary" 
                   className={`text-white rounded-full px-4 py-2 text-sm font-medium ${categoryToGradientClass[post.category]}`}
                 >
                   <CategoryIcon className="mr-2 w-4 h-4" />
                   {categoryLabel[post.category]}
                 </Badge>
                 {post.urgent && (
                   <Badge variant="destructive" className="bg-red-500 text-white font-medium px-3 py-1 rounded-full">
                     <FaInfoCircle className="mr-1 w-3 h-3" />
                     Urgente
                   </Badge>
                 )}
               </div>
               
               <div className="text-slate-400 text-sm flex items-center gap-2">
                 <FaCalendarAlt className="w-4 h-4" />
                 <span>Publicado el {new Date(post.date).toLocaleDateString('es-AR', { 
                   day: 'numeric', 
                   month: 'long', 
                   year: 'numeric' 
                 })}</span>
               </div>
             </div>
             
             <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
               {post.title}
             </h1>
             
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
               <div className="flex items-center gap-4">
                 <Avatar className="w-12 h-12 ring-2 ring-slate-600">
                   <AvatarImage src={post.authorAvatar} alt={post.author} />
                   <AvatarFallback className="bg-slate-700 text-white font-semibold">
                     {post.author.slice(0, 2).toUpperCase()}
                   </AvatarFallback>
                 </Avatar>
                 <div className="flex flex-col">
                   <span className="font-semibold text-slate-200">{post.author}</span>
                   {typeof post.rating === 'number' && post.rating > 0 && (
                     <div className="flex items-center gap-1">
                       <FaStar className="text-yellow-400 w-4 h-4" />
                       <span className="font-medium text-slate-300">{post.rating}</span>
                       {post.ratingCount && (
                         <span className="text-sm text-slate-400">({post.ratingCount} reseñas)</span>
                       )}
                     </div>
                   )}
                 </div>
               </div>
               
               {priceText && (
                   <div className="text-3xl lg:text-4xl font-bold text-green-400">
                     {priceText}
                 </div>
               )}
             </div>
           </div>

          <Separator className="bg-slate-700" />

          {/* Grid de contenido */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Descripción */}
              {post.subtitle && (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-slate-100">Descripción</h2>
                  <p className="text-slate-300 leading-relaxed text-base">{post.subtitle}</p>
                </div>
              )}

              {/* Información específica por categoría */}
              {renderCategorySpecificInfo(post)}

              {/* Ubicación */}
               <div className="space-y-3">
                 <h2 className="text-xl font-semibold text-slate-100">Ubicación</h2>
                 <div className="flex items-center gap-3 text-slate-300">
                   <FaMapMarkerAlt className="text-red-400 w-5 h-5" />
                   <span className="text-base">{post.location}</span>
                 </div>
               </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-slate-100">Etiquetas</h2>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                       <Badge key={index} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                         <FaTag className="mr-2 text-xs" />
                         {tag}
                       </Badge>
                     ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar de contacto y pago */}
            <div className="space-y-6">
              {/* Contacto */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">Contacto</h3>
                  
                  {/* Métodos de contacto */}
                   {post.contact && Object.keys(post.contact).length > 0 && (
                     <div className="space-y-3 mb-6">
                       {Object.entries(post.contact).map(([method, url]) => {
                         const meta = contactMeta[method]
                         if (!meta || !url) return null
                         const Icon = meta.icon
                         return (
                           <a 
                             key={method}
                             href={url}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="flex items-center gap-4 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                           >
                             <Icon className={`${meta.className} text-lg`} />
                             <span className="text-slate-200">{meta.label}</span>
                             <FaExternalLinkAlt className="ml-auto text-slate-400 text-xs" />
                           </a>
                         )
                       })}
                     </div>
                   )}
                </CardContent>
              </Card>

              {/* Métodos de pago */}
              {post.payment && post.payment.length > 0 && (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Métodos de pago</h3>
                    
                    <div className="space-y-3">
                      {post.payment.map((method) => {
                         const meta = paymentMeta[method]
                         if (!meta) return null
                         const Icon = meta.icon
                         return (
                           <div key={method} className="flex items-center gap-4 p-2 rounded bg-slate-700/30 text-sm">
                             <Icon className={`${meta.className}`} />
                             <span className="text-slate-300">{meta.label}</span>
                           </div>
                         )
                       })}
                      {post.barterAccepted && !post.payment.includes('barter') && (
                         <div className="flex items-center gap-4 p-2 rounded bg-slate-700/30 text-sm">
                           <FaHandshake className="text-amber-400" />
                           <span className="text-slate-300">Acepta canje</span>
                         </div>
                       )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function renderCategorySpecificInfo(post: Post) {
  switch (post.category) {
    case 'eventos': {
      const eventPost = post as EventPost
      return (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Detalles del Evento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <FaCalendarAlt className="text-blue-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Inicio</p>
                    <p className="text-slate-400 text-sm">{formatDateTime(eventPost.startDate)}</p>
                  </div>
                </div>
                {eventPost.endDate && (
                  <div className="flex items-center gap-4">
                    <FaCalendarCheck className="text-green-400" />
                    <div>
                      <p className="text-slate-200 font-medium">Fin</p>
                      <p className="text-slate-400 text-sm">{formatDateTime(eventPost.endDate)}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-red-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Lugar</p>
                    <p className="text-slate-400 text-sm">{eventPost.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaLaptop className="text-purple-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Modalidad</p>
                    <p className="text-slate-400 text-sm capitalize">{eventPost.mode}</p>
                  </div>
                </div>
                {eventPost.capacity && (
                  <div className="flex items-center gap-4">
                    <FaUsers className="text-cyan-400" />
                    <div>
                      <p className="text-slate-200 font-medium">Capacidad</p>
                      <p className="text-slate-400 text-sm">{eventPost.capacity} personas</p>
                    </div>
                  </div>
                )}
                {eventPost.organizer && (
                  <div className="flex items-center gap-4">
                    <FaInfoCircle className="text-amber-400" />
                    <div>
                      <p className="text-slate-200 font-medium">Organiza</p>
                      <p className="text-slate-400 text-sm">{eventPost.organizer}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    case 'servicios': {
      const servicePost = post as ServicePost
      return (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Detalles del Servicio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicePost.experienceYears && (
                <div className="flex items-center gap-4">
                  <FaMedal className="text-yellow-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Experiencia</p>
                    <p className="text-slate-400 text-sm">{servicePost.experienceYears} años</p>
                  </div>
                </div>
              )}
              {servicePost.availability && (
                <div className="flex items-center gap-4">
                  <FaClock className="text-green-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Disponibilidad</p>
                    <p className="text-slate-400 text-sm">{servicePost.availability}</p>
                  </div>
                </div>
              )}
              {servicePost.serviceArea && (
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-red-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Zona de servicio</p>
                    <p className="text-slate-400 text-sm">{servicePost.serviceArea}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    
    case 'productos': {
      const productPost = post as ProductPost
      return (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Detalles del Producto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <FaTag className="text-blue-400" />
                <div>
                  <p className="text-slate-200 font-medium">Condición</p>
                  <p className="text-slate-400 text-sm capitalize">{productPost.condition}</p>
                </div>
              </div>
              {productPost.stock && (
                <div className="flex items-center gap-4">
                  <FaBoxOpen className="text-green-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Stock</p>
                    <p className="text-slate-400 text-sm">{productPost.stock} unidades</p>
                  </div>
                </div>
              )}
              {productPost.warranty && (
                <div className="flex items-center gap-4">
                  <FaShieldAlt className="text-purple-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Garantía</p>
                    <p className="text-slate-400 text-sm">{productPost.warranty}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    
    case 'usados': {
      const usedPost = post as UsedPost
      return (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Detalles del Producto Usado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <FaTag className="text-orange-400" />
                <div>
                  <p className="text-slate-200 font-medium">Condición</p>
                  <p className="text-slate-400 text-sm capitalize">{usedPost.condition}</p>
                </div>
              </div>
              {usedPost.usageTime && (
                <div className="flex items-center gap-4">
                  <FaHistory className="text-cyan-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Tiempo de uso</p>
                    <p className="text-slate-400 text-sm">{usedPost.usageTime}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    
    case 'cursos': {
      const coursePost = post as CoursePost
      return (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Detalles del Curso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <FaLaptop className="text-purple-400" />
                <div>
                  <p className="text-slate-200 font-medium">Modalidad</p>
                  <p className="text-slate-400 text-sm capitalize">{coursePost.mode}</p>
                </div>
              </div>
              {coursePost.duration && (
                <div className="flex items-center gap-4">
                  <FaClock className="text-green-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Duración</p>
                    <p className="text-slate-400 text-sm">{coursePost.duration}</p>
                  </div>
                </div>
              )}
              {coursePost.schedule && (
                <div className="flex items-center gap-4">
                  <FaCalendarAlt className="text-blue-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Horarios</p>
                    <p className="text-slate-400 text-sm">{coursePost.schedule}</p>
                  </div>
                </div>
              )}
              {coursePost.level && (
                <div className="flex items-center gap-4">
                  <FaSignal className="text-amber-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Nivel</p>
                    <p className="text-slate-400 text-sm capitalize">{coursePost.level}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    
    case 'pedidos': {
      const requestPost = post as RequestPost
      return (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Detalles del Pedido</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requestPost.neededBy && (
                <div className="flex items-center gap-4">
                  <FaCalendarAlt className="text-red-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Necesario para</p>
                    <p className="text-slate-400 text-sm">{requestPost.neededBy}</p>
                  </div>
                </div>
              )}
              {requestPost.budgetRange && (
                <div className="flex items-center gap-4">
                  <FaMoneyBill className="text-green-400" />
                  <div>
                    <p className="text-slate-200 font-medium">Presupuesto</p>
                    <p className="text-slate-400 text-sm">{requestPost.budgetRange}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    
    default:
      return null
  }
}