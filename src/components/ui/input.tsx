import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "outline-none focus-visible:outline-none focus-visible:border-none focus-visible:!shadow-none focus-visible:!ring-0 appearance-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
