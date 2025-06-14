"use client";

import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, CloudSnow, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WeatherWidget: React.FC = () => {
    const [toggleWeather, setToggleWeather] = useState(false);

    const weatherData = {
        location: 'Ferme Bio Martin',
        currentDay: 'Lundi',
        currentTime: '14:32 PM',
        temperature: 18,
        condition: 'Partiellement nuageux',
        humidity: 65,
        windSpeed: 12,
        uvIndex: 6,
        forecast: [
            { day: 'Mar', temp: 22, icon: Sun, condition: 'Ensoleillé' },
            { day: 'Mer', temp: 15, icon: CloudRain, condition: 'Pluvieux' },
            { day: 'Jeu', temp: 11, icon: Cloud, condition: 'Nuageux' },
            { day: 'Ven', temp: 18, icon: Sun, condition: 'Ensoleillé' },
            { day: 'Sam', temp: 12, icon: CloudRain, condition: 'Pluvieux' },
            { day: 'Dim', temp: 10, icon: CloudSnow, condition: 'Neigeux' }
        ]
    };

    const getWeatherIcon = () => {
        if (weatherData.condition.includes('nuageux')) return Cloud;
        if (weatherData.condition.includes('soleil')) return Sun;
        if (weatherData.condition.includes('pluie')) return CloudRain;
        return Cloud;
    };

    const WeatherIcon = getWeatherIcon();

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden mb-6">
            {/* Header */}
            <div className={`p-4 ${toggleWeather ? 'border-b border-[var(--farm-green)]/10' : ''} flex justify-between`}>
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Cloud className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[var(--farm-green-dark)]">Conditions Météo</h2>
                        <p className="text-xs text-[var(--farm-green)] opacity-80">Prévisions pour vos cultures</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Button className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center group transition-all duration-300 hover:from-slate-700 hover:to-slate-800" onClick={() => setToggleWeather(prev => !prev)}>
                        <ArrowDown className={`w-4 h-4 text-white ${toggleWeather ? 'rotate-180' : 'rotate-0'} transition-all duration-300`} />
                    </Button>
                </div>
            </div>

            {/* Weather Content */}
            <div className={`p-4 ${toggleWeather ? 'block' : 'hidden'}`}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                    {/* Current Weather Card */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 text-white shadow-xl min-w-[240px] relative overflow-hidden flex-shrink-0">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-6 translate-x-6"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-xs text-white/70">{weatherData.currentDay}</p>
                                    <p className="text-xs text-white/50">{weatherData.currentTime}</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center animate-float">
                                    <WeatherIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-4xl font-bold mb-1">{weatherData.temperature}°</p>
                                <p className="text-base text-white/90 mb-1">{weatherData.condition}</p>
                                <p className="text-xs text-white/60">{weatherData.location}</p>
                            </div>

                            {/* Detailed stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <Droplets className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/60">Humidité</p>
                                        <p className="text-xs font-semibold text-white">{weatherData.humidity}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                                        <Wind className="w-3 h-3 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/60">Vent</p>
                                        <p className="text-xs font-semibold text-white">{weatherData.windSpeed} km/h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Forecast Cards */}
                    <div className="flex-1 w-full">
                        <h3 className="text-base font-semibold text-[var(--farm-green-dark)] mb-3">Prévisions 7 jours</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {weatherData.forecast.map((day, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-[var(--farm-beige)] rounded-xl p-3 shadow-md border border-white/50 text-center hover:scale-105 hover:shadow-lg transition-all duration-300 organic-shape group"
                                >
                                    <p className="text-xs font-medium text-[var(--farm-green)] opacity-80 mb-2">{day.day}</p>

                                    <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <day.icon className="w-5 h-5 text-blue-600" />
                                    </div>

                                    <p className="text-lg font-bold text-[var(--farm-green-dark)] mb-1">{day.temp}°</p>
                                    <p className="text-xs text-[var(--farm-green)] opacity-70 leading-tight">{day.condition}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Agricultural Tips */}
                <div className="mt-6 p-3 bg-gradient-to-r from-[var(--farm-green)]/5 to-[var(--farm-orange)]/5 rounded-xl border border-[var(--farm-green)]/10">
                    <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-[var(--farm-green)] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Thermometer className="w-3 h-3 text-white" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-[var(--farm-green-dark)] mb-1">Conseil agricole</h4>
                            <p className="text-xs text-[var(--farm-green)] opacity-80">
                                Conditions idéales pour l'arrosage ce matin. Évitez les heures chaudes de l'après-midi avec ce temps partiellement nuageux.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;