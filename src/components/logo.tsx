import type { HTMLAttributes } from 'react'
import { FramerIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex select-none items-center gap-4', className)}
      {...props}
    >
      <FramerIcon className="h-7 w-7 rounded-lg bg-foreground p-1 text-background" />
      <span className="font-bold">gocommerce</span>
    </div>
  )
}
