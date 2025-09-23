'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Category } from '@/data/posts';

type CategoryContextType = {
  selectedCategory: Category | 'all';
  setSelectedCategory: (category: Category | 'all') => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}