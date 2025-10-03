import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { categoryOptions } from '@/lib/validation/post'

export default function CrearPublicacionPage() {
  const categories: { key: typeof categoryOptions[number]; label: string; href: string }[] = [
    { key: 'eventos', label: 'Eventos', href: '/publicaciones/crear/eventos' },
    { key: 'servicios', label: 'Servicios', href: '/publicaciones/crear/servicios' },
    { key: 'productos', label: 'Productos', href: '/publicaciones/crear/productos' },
    { key: 'usados', label: 'Usados', href: '/publicaciones/crear/usados' },
    { key: 'cursos', label: 'Cursos', href: '/publicaciones/crear/cursos' },
    { key: 'pedidos', label: 'Pedidos', href: '/publicaciones/crear/pedidos' },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Crear publicación</h1>
        <p className="text-muted-foreground">Elige una categoría para comenzar</p>
      </div>
      <Separator className="mb-6" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.key} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex h-full flex-col justify-between">
              <div>
                <h2 className="text-lg font-medium">{c.label}</h2>
                <p className="text-muted-foreground text-sm">Publica contenido de tipo {c.label.toLowerCase()}</p>
              </div>
              <Link href={c.href} className="mt-4">
                <Button className="w-full" variant="default">
                  Elegir {c.label}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}