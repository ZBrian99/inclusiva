"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

interface WizardContextType {
  currentStep: number
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  isFirstStep: boolean
  isLastStep: boolean
  navigationComponent?: React.ReactNode
}

const WizardContext = React.createContext<WizardContextType | undefined>(undefined)

function useWizard() {
  const context = React.useContext(WizardContext)
  if (!context) {
    throw new Error("useWizard must be used within a Wizard")
  }
  return context
}

interface WizardProps {
  children: React.ReactNode
  defaultStep?: number
  onStepChange?: (step: number) => void
  className?: string
}

function Wizard({ children, defaultStep = 0, onStepChange, className }: WizardProps) {
  const [currentStep, setCurrentStep] = React.useState(defaultStep)
  
  // Separate step components from non-step components
  const childrenArray = React.Children.toArray(children)
  const steps = childrenArray.filter((child) => 
    React.isValidElement(child) && (child.props as any).__isWizardStep
  )
  const nonStepComponents = childrenArray.filter((child) => 
    !React.isValidElement(child) || !(child.props as any).__isWizardStep
  )
  
  // Find WizardNavigation component
  const navigationComponent = nonStepComponents.find((child) =>
    React.isValidElement(child) && child.type === WizardNavigation
  )
  
  const totalSteps = steps.length
  


  const nextStep = React.useCallback(() => {
    if (currentStep < totalSteps - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      onStepChange?.(newStep)
    }
  }, [currentStep, totalSteps, onStepChange])

  const prevStep = React.useCallback(() => {
    if (currentStep > 0) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      onStepChange?.(newStep)
    }
  }, [currentStep, onStepChange])

  const goToStep = React.useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step)
      onStepChange?.(step)
    }
  }, [totalSteps, onStepChange])

  const contextValue: WizardContextType = {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    navigationComponent,
  }

  // Remove duplicate nonStepComponents definition - using the one defined above

  return (
    <WizardContext.Provider value={contextValue}>
      <div className={cn("w-full", className)}>
        {nonStepComponents.filter(child => child !== navigationComponent)}
        <div className="space-y-6">
          {steps[currentStep]}
        </div>
      </div>
    </WizardContext.Provider>
  )
}

interface WizardStepProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  __isWizardStep?: boolean
}

function WizardStep({ children, title, description, className }: WizardStepProps) {
  const { navigationComponent } = useWizard()
  
  return (
    <Card className={cn("w-full py-8", className)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <p className="text-sm text-muted-foreground mt-1 ">{description}</p>}
        </CardHeader>
      )}
      <CardContent className="space-y-6 mt-6">
        {children}
        {navigationComponent && (
          <div className="pt-6 border-t border-border mt-6">
            {navigationComponent}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Add displayName for component identification
WizardStep.displayName = 'WizardStep'

interface WizardStepsIndicatorProps {
  steps: { title: string; description?: string }[]
  className?: string
}

function WizardStepsIndicator({ steps, className }: WizardStepsIndicatorProps) {
  const { currentStep } = useWizard()

  return (
    <div className={cn("flex items-center justify-between mb-8", className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isCompleted = index < currentStep
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                    ? "border-primary text-primary bg-background"
                    : "border-muted-foreground/30 text-muted-foreground bg-background"
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={cn(
                  "text-sm font-medium",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-px mx-4 transition-colors",
                  isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

interface WizardNavigationProps {
  onNext?: () => void | Promise<void>
  onPrev?: () => void
  onPublish?: () => void | Promise<void>
  onCancel?: () => void
  nextLabel?: string
  prevLabel?: string
  publishLabel?: string
  showPrev?: boolean
  showNext?: boolean
  showCancel?: boolean
  nextDisabled?: boolean
  className?: string
}

function WizardNavigation({
  onNext,
  onPrev,
  onPublish,
  onCancel,
  nextLabel,
  prevLabel,
  publishLabel,
  showPrev = true,
  showNext = true,
  showCancel = true,
  nextDisabled = false,
  className
}: WizardNavigationProps) {
  const { nextStep, prevStep, isFirstStep, isLastStep } = useWizard()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleNext = async () => {
    if (onNext) {
      setIsLoading(true)
      try {
        await onNext()
        nextStep()
      } catch (error) {
        console.error('Error in wizard navigation:', error)
      } finally {
        setIsLoading(false)
      }
    } else {
      nextStep()
    }
  }

  const handlePublish = async () => {
    if (onPublish) {
      setIsLoading(true)
      try {
        await onPublish()
      } catch (error) {
        console.error('Error publishing:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const handlePrev = () => {
    if (onPrev) {
      onPrev()
    }
    prevStep()
  }

  return (
		<div className={cn('flex flex-col gap-4 ', className)}>
			{/* Botones principales */}
			<div className='flex justify-between'>
				{showPrev && !isFirstStep ? (
					<Button type='button' variant='outline' onClick={handlePrev} disabled={isLoading}>
						{prevLabel || 'Anterior'}
					</Button>
				) : (
					<div />
				)}

				{showNext && !isLastStep && (
					<Button type='button' onClick={handleNext} disabled={nextDisabled || isLoading}>
						{isLoading ? 'Cargando...' : nextLabel || 'Siguiente'}
					</Button>
				)}

				{isLastStep && (
					<Button type='button' onClick={handlePublish} disabled={nextDisabled || isLoading}>
						{isLoading ? 'Publicando...' : publishLabel || 'Publicar'}
					</Button>
				)}
			</div>

			{/* Botón de cancelar */}
			{showCancel && (
				<div className='flex justify-center'>
					<Button
						type='button'
						variant='ghost'
						onClick={handleCancel}
						disabled={isLoading}
						className='text-muted-foreground hover:text-foreground'
					>
						Cancelar y volver
					</Button>
				</div>
			)}
		</div>
	);
}

export {
  Wizard,
  WizardStep,
  WizardStepsIndicator,
  WizardNavigation,
  useWizard,
  type WizardProps,
  type WizardStepProps,
  type WizardStepsIndicatorProps,
  type WizardNavigationProps,
}