"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageDropInputProps {
    onChange?: (file: File) => void
    maxSize?: number // in MB
    className?: string
    placeholder?: string
}

export default ({ onChange, maxSize = 5, className, placeholder }: ImageDropInputProps) => {
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFile = (file: File): string | null => {
        // Check if file is an image
        if (!file.type.startsWith("image/")) {
            return "Please select an image file"
        }

        // Check file size
        const fileSizeMB = file.size / (1024 * 1024)
        if (fileSizeMB > maxSize) {
            return `File size must be less than ${maxSize}MB`
        }

        return null
    }

    const handleFile = (file: File) => {
        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            return
        }

        setError(null)
        setSelectedImage(file)

        // Create preview URL
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        onChange?.(file)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            handleFile(files[0])
        }
    }

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            handleFile(files[0])
        }
    }

    const handleRemoveImage = () => {
        setSelectedImage(null)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={cn("w-full max-w-md mx-auto", className)}>
            {selectedImage && previewUrl ? (
                // Preview mode
                <div className="relative">
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-64 object-cover" />
                    <div
                        onClick={handleRemoveImage}
                        className={cn(
                            "flex items-center justify-center cursor-pointer",
                            "absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200"
                        )}
                    >
                        <X className="h-4 w-4" />
                    </div>
                    <div className="p-4 bg-background">
                        <p className="text-sm font-medium truncate">{selectedImage.name}</p>
                        <p className="text-xs text-muted-foreground">{(selectedImage.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                </div>
            ) : (
                // Drop zone
                <div
                    className={cn(
                        "rounded-md p-8 text-center cursor-pointer transition-colors duration-200",
                        isDragOver && "border-primary bg-primary/5",
                        error && "border-destructive",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div
                            className={cn(
                                "rounded-full p-4 transition-colors duration-200",
                                isDragOver ? "bg-primary/10" : "bg-muted",
                            )}
                        >
                            {isDragOver ? (
                                <Upload className="h-8 w-8 text-primary" />
                            ) : (
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg font-medium">{isDragOver ? "Drop your image here" : placeholder ? placeholder : "Upload an image"}</p>
                            <p className="text-sm text-muted-foreground">Drag and drop or click to select</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to {maxSize}MB</p>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="p-4 bg-destructive/10">
                    <p className="text-sm text-destructive">{error}</p>
                </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
        </div>
    )
}
