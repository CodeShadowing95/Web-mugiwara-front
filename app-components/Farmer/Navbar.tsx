'use client';

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Bell, ChevronDown, Menu, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFarm2 } from '@/app/FarmContext2';
import { Farm } from '@/types';
import { getAvatarInitials } from '@/utils/utilities';

const Navbar = () => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    
    const farm2Context = useFarm2()
    
    if (!farm2Context) {
        return <div>Erreur : Contexte Farm2 non disponible</div>
    }

    const { farms, selectedFarm, setSelectedFarm } = farm2Context;

    // Initialiser activeFarm avec selectedFarm s'il existe, sinon avec la première ferme disponible
    const [activeFarm, setActiveFarm] = useState<Farm | null>(() => {
        return selectedFarm || (farms.length > 0 ? farms[0] : null);
    });

    // Mettre à jour activeFarm quand selectedFarm ou farms change
    useEffect(() => {
        if (selectedFarm) {
            setActiveFarm(selectedFarm);
        } else if (farms.length > 0) {
            setActiveFarm(farms[0]);
            setSelectedFarm(farms[0]);
            localStorage.setItem('selectedFarm', JSON.stringify(farms[0]));
        }
    }, [selectedFarm, farms, setSelectedFarm]);

    const handleFarm = (f: Farm) => {
        setSelectedFarm(f);
        setActiveFarm(f);
        localStorage.setItem('selectedFarm', JSON.stringify(f));
        router.push(`/fermier/mes-fermes`);
    }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        className="lg:hidden mr-4 text-gray-600"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Ouvrir le menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    {/* Dropdown de sélection de ferme */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center space-x-2 hover:bg-farm-green/5 p-3 rounded-lg border border-transparent hover:border-farm-green/20 transition-all duration-200"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={activeFarm?.avatar} alt={activeFarm?.avatar} />
                                    {/* <AvatarFallback className={`${activeFarm?.color} text-white font-semibold`}>
                                        {activeFarm?.name.split(' ').map(word => word[0]).join('')}
                                    </AvatarFallback> */}
                                </Avatar>
                                <div className="text-left hidden sm:block">
                                    <p className="font-semibold text-farm-green-dark text-sm">{activeFarm?.name}</p>
                                    <p className="text-xs text-gray-500">{activeFarm?.address}</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 p-2" align="start">
                            <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                                Mes fermes
                            </DropdownMenuLabel>

                            {farms.map((farm) => (
                                <DropdownMenuItem
                                    key={farm.id}
                                    className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-colors ${farm.id === activeFarm?.id ? "bg-[var(--farm-green)]/10 border border-farm-green/20" : "hover:bg-gray-50"
                                        }`}
                                >
                                    <Avatar className="h-10 w-10">        
                                        <AvatarImage src={farm?.id === activeFarm?.id ? activeFarm?.avatar : farm?.avatar} alt={farm?.id === activeFarm?.id ? activeFarm?.avatar : farm?.avatar} />
                                        <AvatarFallback className="bg-[var(--farm-orange)] text-white font-bold">{getAvatarInitials(farm.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center space-x-2">
                                            <p className="font-medium text-gray-900 text-sm truncate">{farm.name}</p>
                                            {farm.id === activeFarm?.id && (
                                                <Badge className="bg-farm-green text-white text-xs border-0">Actuelle</Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">{farm.address}</p>
                                    </div>
                                    {farm.id !== activeFarm?.id && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-farm-green hover:text-farm-green-dark hover:bg-farm-green/10 text-xs font-medium rounded-full px-4 py-1.5 transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                                            onClick={() => handleFarm(farm)}
                                        >
                                            <span className="relative inline-block">
                                                Gérer
                                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-farm-green transform scale-x-0 transition-transform duration-200 origin-left group-hover:scale-x-100" />
                                            </span>
                                        </Button>
                                    )}
                                </DropdownMenuItem>
                            ))}

                            <DropdownMenuSeparator className="my-2" />

                            <DropdownMenuItem className="p-0">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start p-3 text-farm-green hover:text-farm-green-dark hover:bg-farm-green/10 font-medium"
                                    onClick={() => router.push('/fermier/add-farm')}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Ajouter une ferme
                                </Button>
                            </DropdownMenuItem>

                            <div className="px-3 py-2 mt-2 bg-farm-beige/50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">💡 Astuce</p>
                                <p className="text-xs text-gray-500">
                                    Gérez plusieurs fermes depuis un seul compte et basculez facilement entre elles.
                                </p>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Rechercher..."
                            className="pl-10 w-64 h-10 rounded-lg border-gray-200"
                        />
                    </div>
                    <div className="relative">
                        <button className="relative p-2 rounded-full hover:bg-gray-100">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar