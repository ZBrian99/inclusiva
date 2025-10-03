"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// Tags predefinidas
export const predefinedTags = [
  "Tecnología",
  "Educación",
  "Salud",
  "Deportes",
  "Arte",
  "Música",
  "Cocina",
  "Viajes",
  "Fotografía",
  "Diseño",
  "Marketing",
  "Finanzas",
  "Idiomas",
  "Fitness",
  "Belleza",
  "Moda",
  "Hogar",
  "Jardinería",
  "Mascotas",
  "Niños",
  "Adultos mayores",
  "Emprendimiento",
  "Consultoría",
  "Reparaciones",
  "Limpieza",
  "Transporte",
  "Eventos",
  "Entretenimiento",
  "Bienestar",
  "Sostenibilidad"
]

interface TagSelectorProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxTags?: number
}

export function TagSelector({
  selectedTags,
  onTagsChange,
  placeholder = "Seleccionar tags...",
  disabled = false,
  className,
  maxTags = 5
}: TagSelectorProps) {
  const [open, setOpen] = React.useState(false)

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else if (selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, tag])
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            {selectedTags.length > 0
              ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} seleccionado${selectedTags.length > 1 ? 's' : ''}`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar tags..." />
            <CommandEmpty>No se encontraron tags.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {predefinedTags.map((tag) => (
                <CommandItem
                  key={tag}
                  value={tag}
                  onSelect={() => handleTagSelect(tag)}
                  disabled={!selectedTags.includes(tag) && selectedTags.length >= maxTags}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTags.includes(tag) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tag}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="pr-1">
              {tag}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => removeTag(tag)}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}