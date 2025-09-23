"use client"

import React from "react"

type Props = {
  children: React.ReactNode
  selected?: boolean
  onClick?: () => void
  className?: string
}

function cx(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

export function Chip({ children, selected, onClick, className }: Props) {
  const hasCustomSelectedStyle = selected && className?.includes('bg-grad-')
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        selected && !hasCustomSelectedStyle
          ? "border-foreground/30 bg-foreground/10 text-foreground"
          : !selected
          ? "border-input text-muted-foreground hover:bg-input/60"
          : "",
        className
      )}
    >
      {children}
    </button>
  )
}