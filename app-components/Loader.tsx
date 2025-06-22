import React from 'react'

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50"
            style={{
                backgroundColor: "var(--farm-beige-light)",
            }}
        >
            <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                        style={{
                            background: "linear-gradient(135deg, var(--farm-orange) 0%, var(--farm-orange-dark) 100%)",
                        }}
                    >
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6l1 9H8l1-9z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7V6a2 2 0 012-2h6a2 2 0 012 2v1"></path>
                        </svg>
                    </div>
                    <div className="absolute inset-0 animate-spin">
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full shadow-md"
                            style={{
                                backgroundColor: "var(--farm-green)",
                            }}
                        />
                    </div>
                    <div className="absolute inset-0 animate-spin"
                        style={{
                            animationDirection: "reverse",
                            animationDuration: "3s",
                        }}
                    >
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full shadow-md"
                            style={{
                                backgroundColor: "var(--farm-green-light)",
                            }}
                        />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2"
                    style={{
                        color: "var(--farm-green-dark)",
                    }}
                >
                    Chargement de votre ferme...
                </h2>
                <p className="text-gray-600 mb-6">Préparation de vos produits frais</p>
                <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                    <div className="h-full rounded-full animate-pulse"
                        style={{
                            background: "linear-gradient(90deg, var(--farm-green) 0%, var(--farm-orange) 100%)",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Loader