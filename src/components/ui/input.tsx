import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fileInputLabel?: string;
  maxSize?: number
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, maxSize, fileInputLabel, ...props }, ref) => {
  const [fileName, setFileName] = React.useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileName(file ? file.name : null)
    props.onChange && props.onChange(event)
  }

  const { onChange, ...prop } = props

  if (type === "file") {
    return (
      <div className="relative">
        <input type="file" className="sr-only" ref={ref} {...prop} onChange={handleFileChange} />
        <label
          htmlFor={props.id}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer items-center",
            className,
          )}
        >
          <span className={fileName ? "text-foreground" : "text-muted-foreground"}>
            {fileName || fileInputLabel || "เลือกไฟล์ของคุณ..."}
          </span>
        </label>
        <button
          type="button"
          className="absolute right-1 top-1 h-7 px-2 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded"
          onClick={() => document.getElementById(props.id || "")?.click()}
        >
          อัพโหลด
        </button>
      </div>
    )
  }

  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

