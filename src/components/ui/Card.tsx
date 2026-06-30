import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#141414] border border-[#222222] rounded-2xl p-6',
        hover && 'transition-all duration-300 hover:border-[#34D186] hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}