"use client";

import React from 'react'
import Link from 'next/link'
import { CategoryWithChildren } from '@/types';
import { genRandKey } from '@/utils/utilities';

const CategoryCard = ({ index, categorie }: { index: number, categorie: CategoryWithChildren }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e8e1d4]">
            <h2 className="text-xl font-bold text-[#3c5a3e] mb-4">{categorie.name}</h2>
            <div className="mb-2 text-[#5a7052] text-sm">{categorie.description}</div>
            <div className="grid grid-cols-2 gap-4">
                {categorie.children && categorie.children.length > 0 ? (
                    categorie.children.map((child) => {
                        const key = genRandKey();
                        const normalizedItem = child.name.toLowerCase()
                            .normalize('NFD')
                            .replace(/[^\w\s-]/g, '')
                            .replace(/\s+/g, '-');
                        return (
                            <Link key={key} href={`/category?item=${index}&q=${normalizedItem}`} className="group">
                                <div className="aspect-square rounded-lg mb-2 overflow-hidden">
                                    <img
                                        src="vegetable2.png"
                                        alt={child.name}
                                        className="h-full w-full object-contain transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <span className="text-sm text-[#5a7052]">{child.name}</span>
                            </Link>
                        )
                    })
                ) : (
                    <span className="text-xs text-gray-400">Aucune sous-catégorie</span>
                )}
            </div>
            <Link
                href="#"
                className="inline-block mt-4 text-sm font-medium text-[#8fb573] hover:text-[#7a9c62] hover:underline"
            >
                Voir plus
            </Link>
        </div>
    )
}

export default CategoryCard