import React from "react";


const UnderConstruction = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-red via-black to-brand-accent-gold text-white px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 relative inline-block animate-pulse">
                <span className="relative z-10">Under Construction</span>
                <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-brand-red to-brand-accent-gold opacity-20 blur-lg z-0"></span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-white/80 text-center max-w-xl">
                We're working on something awesome. Stay tuned!
            </p>
            <div className="w-full max-w-md h-4 bg-white/10 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-brand-red to-brand-accent-gold animate-progressBar" style={{ width: '60%' }}></div>
            </div>
            <style>{`
                @keyframes progressBar {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
                .animate-progressBar {
                  animation: progressBar 2s infinite alternate;
                }
            `}</style>
        </div>
    );
};

export default UnderConstruction;
