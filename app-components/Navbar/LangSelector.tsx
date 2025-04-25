"use client"

import { useState } from "react"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Language = {
  code: string
  name: string
  flag: string
}

export default function LangSelector() {
  const languages: Language[] = [
    {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
    },
    {
      code: "en",
      name: "English",
      flag: "🇬🇧",
    },
  ]

  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  return (
    <div className="flex gap-4 items-center">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
            variant="outline"
            className="h-10 px-4 gap-2 border-[#e8e1d4] bg-[#f7f4eb] hover:bg-[#efe9d9] text-[#5a7052] hover:text-[#3c5a3e]"
            >
            <span className="text-xl mr-1">{currentLanguage.flag}</span>
            <span>{currentLanguage.code.toUpperCase()}</span>
            <Globe className="h-4 w-4 ml-1 text-[#8fb573]" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-40 bg-[#f7f4eb] border-[#e8e1d4]">
            {languages.map((language) => (
            <DropdownMenuItem
                key={language.code}
                className={cn(
                "flex items-center gap-2 cursor-pointer text-[#5a7052] hover:bg-[#efe9d9] focus:bg-[#efe9d9]",
                currentLanguage.code === language.code && "font-medium",
                )}
                onClick={() => setCurrentLanguage(language)}
            >
                <span className="text-xl">{language.flag}</span>
                <span>{language.name}</span>
                {currentLanguage.code === language.code && <Check className="h-4 w-4 ml-auto text-[#8fb573]" />}
            </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
