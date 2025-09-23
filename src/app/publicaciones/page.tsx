'use client'

import { useMemo, useState, useEffect } from 'react'
import PostCard from '@/components/PostCard'
import SearchFilters from '@/components/SearchFilters'
import { posts as allPosts, Category } from '@/data/posts'
import { useCategory } from '@/contexts/CategoryContext'

type SortKey = 'recent' | 'rating' | 'priceAsc' | 'priceDesc'

export default function PostsListPage() {
  const { selectedCategory, setSelectedCategory } = useCategory()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<SortKey>('recent')

  const posts = useMemo(() => {
    let list = [...allPosts]
    // filter by category
    if (selectedCategory !== 'all') list = list.filter((p) => p.category === selectedCategory)
    // search
    const term = q.trim().toLowerCase()
    if (term) {
      list = list.filter((p) => {
        const haystack = [p.title, p.subtitle ?? '', p.location, p.author, (p.tags ?? []).join(' ')].join(' ').toLowerCase()
        return haystack.includes(term)
      })
    }
    // sort
    switch (sort) {
      case 'rating':
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case 'priceAsc':
        list.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER))
        break
      case 'priceDesc':
        list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1))
        break
      default:
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    return list
  }, [selectedCategory, q, sort])

  return (
		<main className='mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col gap-6 sm:gap-8 h-full min-h-[calc(100svh-5rem)]'>

			{/* Filtros de búsqueda */}
			
				<SearchFilters
					selected={selectedCategory}
					onSelectedChange={setSelectedCategory}
					searchQuery={q}
					onSearchQueryChange={setQ}
					sortBy={sort}
					onSortByChange={setSort}
					resultsCount={posts.length}
				/>
		

			{/* Grid de cards */}
			<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
				{posts.map((p) => (
					<PostCard key={p.id} post={p} />
				))}
			</section>
		</main>
	);
}