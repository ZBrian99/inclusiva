import { Category } from '@/data/posts';

// Mapeo de patrones SVG por categoría (sincronizado con BentoGrid)

// Mapeo de gradientes por categoría (sincronizado con BentoGrid)
export const categoryGradients: Record<Category | 'all', string> = {
  eventos: 'bg-grad-red',
  pedidos: 'bg-grad-pink',
  servicios: 'bg-grad-blue',
  productos: 'bg-grad-orange',
  cursos: 'bg-grad-green',
  usados: 'bg-grad-violet',
  all: 'bg-grad-gray',
};

// Mapeo de opacidades por categoría (sincronizado con BentoGrid)
export const categoryPatternOpacities: Record<Category | 'all', string> = {
  eventos: 'opacity-50', // PatternDots
  pedidos: 'opacity-50', // PatternCross
  servicios: 'opacity-20', // PatternDiagonal
  productos: 'opacity-50', // PatternGrid
  cursos: 'opacity-20', // PatternWaves
  usados: 'opacity-20', // PatternZigzag
  all: 'opacity-20', // PatternVertical
};