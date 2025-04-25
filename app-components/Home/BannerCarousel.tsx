"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CarouselSlide = {
    id: number
    title: string
    subtitle: string
    logoSrc?: string
    imageSrc1?: string
    imageSrc2?: string
    // bgColor: string
    bgPattern: string
}

export default function BannerCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [direction, setDirection] = useState<"left" | "right">("right")

    const slides: CarouselSlide[] = [
        {
            id: 1,
            title: "Des produits frais qui ont du goût.",
            subtitle: "Directement de nos producteurs locaux",
            logoSrc: "vegetable.png",
            imageSrc1: "vegetable2.png",
            imageSrc2: "sample.png",
            // bgColor: "from-[#5a7052] to-[#8fb573]",
            bgPattern: "url('/banner-carousel/hollowed-boxes.png') no-repeat center center/cover",
        },
        {
            id: 2,
            title: "Savourez les fruits de saison.",
            subtitle: "Cueillis à maturité pour une saveur optimale",
            logoSrc: "vegetable.png",
            imageSrc1: "vegetable2.png",
            imageSrc2: "sample.png",
            // bgColor: "from-[#e4a14e] to-[#f0c078]",
            bgPattern: "url('/banner-carousel/flat-mountains.png') no-repeat center 90%/cover",
        },
        {
            id: 3,
            title: "L'agriculture biologique à l'honneur.",
            subtitle: "Respectueux de l'environnement et de votre santé",
            logoSrc: "vegetable.png",
            imageSrc1: "vegetable2.png",
            imageSrc2: "sample.png",
            // bgColor: "from-[#3c5a3e] to-[#5a7052]",
            bgPattern: "url('/banner-carousel/leaves.png') no-repeat center center/cover",
        },
    ]

    const nextSlide = useCallback(() => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setDirection("right")
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        setTimeout(() => setIsTransitioning(false), 500)
    }, [isTransitioning, slides.length])

    const prevSlide = useCallback(() => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setDirection("left")
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        setTimeout(() => setIsTransitioning(false), 500)
    }, [isTransitioning, slides.length])

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 6000)
        return () => clearInterval(interval)
    }, [nextSlide])

    return (
        <div className="relative w-full overflow-hidden rounded-xl mb-8">
            {/* Slides */}
            <div className="relative h-[300px] md:h-[400px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={cn(
                            "absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out",
                            index === currentSlide
                                ? "translate-x-0"
                                : index < currentSlide
                                    ? "-translate-x-full"
                                    : "translate-x-full",
                            isTransitioning && index === currentSlide
                                ? direction === "right"
                                    ? "animate-slide-in-right"
                                    : "animate-slide-in-left"
                                : "",
                        )}
                    >
                        <div
                            className={
                                "h-full w-full bg-gradient-to-r px-8 md:px-12 flex items-center relative overflow-hidden"
                            }
                            style={{
                                background: `${slide.bgPattern}`,
                            }}
                        >
                            {/* Cercles décoratifs */}
                            <div className="absolute -top-20 right-1/4 w-40 h-40 rounded-full bg-white/10"></div>
                            <div className="absolute bottom-10 right-1/3 w-60 h-60 rounded-full bg-white/5"></div>
                            <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-white/5"></div>

                            {/* Contenu */}
                            <div className="w-full flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 z-10 mb-8 md:mb-0">
                                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${slide.id === 2 ? 'text-zinc-700' : 'text-white'}  mb-4 leading-tight`}>
                                        {slide.title}
                                    </h2>
                                    <p className={`${slide.id === 2 ? 'text-zinc-700' : 'text-white/90'} mb-6`}>{slide.subtitle}</p>
                                    {slide.logoSrc && (
                                        <div className="mb-6">
                                            <img
                                                src={slide.logoSrc || "/placeholder.svg"}
                                                alt="Marché Fermier"
                                                className="h-10 object-contain"
                                            />
                                        </div>
                                    )}
                                    <Button className="bg-white hover:bg-gray-100 text-[#3c5a3e] px-6 py-3 rounded-full font-medium">
                                        Découvrir
                                    </Button>
                                </div>

                                <div className="md:w-1/2 flex justify-center md:justify-end relative">
                                    {slide.imageSrc1 && (
                                        <img
                                            src={slide.imageSrc1 || "/placeholder.svg"}
                                            alt="Produit principal"
                                            className="h-56 md:h-80 w-56 md:w-80 object-contain relative z-10 animate-float"
                                        />
                                    )}
                                    {slide.imageSrc2 && (
                                        <img
                                            src={slide.imageSrc2 || "/placeholder.svg"}
                                            alt="Produit secondaire"
                                            className="absolute right-0 bottom-0 h-44 md:h-64 w-44 md:w-64 object-contain z-20 animate-float-delayed"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                onClick={nextSlide}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicateurs */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/80",
                        )}
                        onClick={() => {
                            setDirection(index > currentSlide ? "right" : "left")
                            setCurrentSlide(index)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
