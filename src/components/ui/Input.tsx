import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-white text-sm',
              'placeholder:text-[#6B6B6B]',
              'focus:outline-none focus:border-[#34D186] transition-colors',
              icon && 'pl-10',
              error && 'border-red-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input