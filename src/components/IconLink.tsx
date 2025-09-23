"use client"

import React from "react"
import { IconType } from "react-icons"

export function IconLink({ href, icon: Icon, label }: { href: string; icon: IconType; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-input/60"
    >
      <Icon />
    </a>
  )
}