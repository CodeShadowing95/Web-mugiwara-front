'use client'

import React, { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { X } from 'lucide-react'

type ToastProps = {
    title: string
    description: string
    className: string
    icon: React.ReactNode
    actionLabel?: string
    duration?: number // facultatif
}

const Toast = ({
    title,
    description,
    className,
    icon,
    actionLabel,
    duration = 5000,
}: ToastProps) => {
    const hasShown = useRef(false)
    const toastId = useRef(`toast_${Math.random().toString(36).substring(2, 9)}`)

    useEffect(() => {
        if (hasShown.current) return
        hasShown.current = true

        toast.custom((t) => (
            <div className={`relative flex items-center gap-4 p-3 ${className} rounded-xl shadow-lg min-w-[300px] border border-gray-100 dark:border-zinc-800 overflow-hidden`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-emerald-900/30">
                    {icon}
                </div>
                <div className="flex-1 font-lato">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                    {description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                    )}
                </div>
                <button
                    onClick={() => toast.dismiss(toastId.current)}
                    className="absolute top-3 right-3 p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                    <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </button>
            </div>
        ), {
            id: toastId.current,
            duration,
        })
    }, [title, description, className, icon, actionLabel, duration])

    return null
}

export default Toast
