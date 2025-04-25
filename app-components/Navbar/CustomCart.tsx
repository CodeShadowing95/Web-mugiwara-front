"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, X, ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { productsCart } from "@/constants"

type Product = {
    id: number
    name: string
    description: string
    price: number
    quantity: number
    image: string
    organic: boolean
}

export default function CustomCart({ isScrolled }: { isScrolled: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const [products, setProducts] = useState<Product[]>(productsCart)

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return

        setProducts(products.map((product) => (product.id === id ? { ...product, quantity: newQuantity } : product)))
    }

    const removeProduct = (id: number) => {
        setProducts(products.filter((product) => product.id !== id))
    }

    const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    const shipping = 4.95
    const total = subtotal + shipping

    useEffect(() => {
        isScrolled === true && setIsOpen(false);
    }, [isScrolled])

    return (
        <>
            {/* Cart Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="relative bg-[#8fb573] hover:bg-[#7a9c62] text-white rounded-full p-3 h-auto"
            >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-[#e05252] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {products.reduce((sum, product) => sum + product.quantity, 0)}
                </span>
            </Button>

            {/* Cart Overlay */}
            <div
                className={cn(
                    "fixed top-0 left-0 w-screen h-screen bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Cart Panel */}
            <div
                className={cn(
                    "fixed right-0 top-0 h-screen w-full sm:w-[450px] bg-white shadow-xl z-50 transition-transform duration-500 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Cart Header */}
                    <div className="p-6 border-b border-[#e8e1d4] flex items-center justify-between bg-[#f7f4eb]">
                        <div className="flex items-center gap-3">
                            <ShoppingCart className="h-6 w-6 text-[#5a7052]" />
                            <h2 className="text-xl font-semibold text-[#3c5a3e]">Mon Panier</h2>
                            <div className="bg-[#8fb573] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {products.reduce((sum, product) => sum + product.quantity, 0)}
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-[#5a7052] hover:bg-[#e8e1d4] hover:text-[#3c5a3e]"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1">
                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                <div className="bg-[#f7f4eb] p-6 rounded-full mb-4">
                                    <ShoppingCart className="h-12 w-12 text-[#8fb573]" />
                                </div>
                                <h3 className="text-lg font-medium text-[#3c5a3e] mb-2">Votre panier est vide</h3>
                                <p className="text-[#6b6b6b] mb-6">Ajoutez des produits fermiers à votre panier</p>
                                <Button className="bg-[#8fb573] hover:bg-[#7a9c62] text-white" onClick={() => setIsOpen(false)}>
                                    Découvrir nos produits
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-white max-h-[370px] p-6 space-y-4 overflow-auto">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex gap-4 p-4 rounded-xl border border-[#e8e1d4] bg-white hover:shadow-md transition-shadow group"
                                    >
                                        <div className="relative h-20 w-20 rounded-lg bg-[#f7f4eb] flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                width={80}
                                                height={80}
                                                className="object-cover transition-transform group-hover:scale-110 duration-500"
                                            />
                                            {product.organic && (
                                                <div className="absolute top-0 left-0 bg-[#8fb573] text-white p-1 rounded-br-lg">
                                                    <Leaf className="h-3 w-3" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-[#3c5a3e]">{product.name}</h3>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 rounded-full text-[#6b6b6b] hover:bg-[#f7f4eb] hover:text-[#e05252] -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeProduct(product.id)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <p className="text-sm text-[#6b6b6b]">{product.description}</p>

                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center border border-[#e8e1d4] rounded-full overflow-hidden">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-full text-[#5a7052] hover:bg-[#f7f4eb] hover:text-[#3c5a3e] p-0"
                                                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium text-[#3c5a3e]">{product.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-full text-[#5a7052] hover:bg-[#f7f4eb] hover:text-[#3c5a3e] p-0"
                                                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <div className="font-medium text-[#3c5a3e]">
                                                    {(product.price * product.quantity).toFixed(2)} €
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Summary */}
                    {products.length > 0 && (
                        <div className="border-t border-[#e8e1d4] p-6 bg-[#f7f4eb]">
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-[#5a7052]">
                                    <span>Sous-total</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between text-[#5a7052]">
                                    <span>Livraison</span>
                                    <span>{shipping.toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg text-[#3c5a3e] pt-3 border-t border-[#e8e1d4]">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)} €</span>
                                </div>
                            </div>

                            <Button className="w-full bg-[#8fb573] hover:bg-[#7a9c62] text-white h-12 rounded-xl group">
                                <span>Passer la commande</span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <button
                                className="w-full text-center mt-4 text-sm text-[#5a7052] hover:text-[#3c5a3e]"
                                onClick={() => setIsOpen(false)}
                            >
                                Continuer mes achats
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
