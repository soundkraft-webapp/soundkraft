const SectionDivider = () => {
    return (
        <div className="relative w-full py-1 sm:py-6 md:py-8 overflow-hidden">
            <div className="w-full max-w-6xl mx-auto flex items-center gap-8">
                {/* Left line - 30% */}
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-orange-500/40"></div>

                {/* Sound wave / Equalizer bars - centered */}
                <div className="flex items-center justify-center gap-2 h-10">
                    {/* Left side bars - gradual increase */}
                    <div className="w-1 h-1.5 bg-orange-500/30 rounded-full"></div>
                    <div className="w-1 h-2 bg-orange-500/35 rounded-full"></div>
                    <div className="w-1 h-2.5 bg-orange-500/40 rounded-full"></div>
                    <div className="w-1 h-4 bg-orange-500/50 rounded-full"></div>
                    <div className="w-1 h-5 bg-orange-500/60 rounded-full"></div>
                    <div className="w-1 h-6 bg-orange-500/70 rounded-full"></div>
                    <div className="w-1 h-7 bg-orange-500/80 rounded-full"></div>
                    <div className="w-1 h-8 bg-orange-500/90 rounded-full"></div>

                    {/* Center peak with glow */}
                    <div className="w-1.5 h-10 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>

                    {/* Right side bars (mirror) */}
                    <div className="w-1 h-8 bg-orange-500/90 rounded-full"></div>
                    <div className="w-1 h-7 bg-orange-500/80 rounded-full"></div>
                    <div className="w-1 h-6 bg-orange-500/70 rounded-full"></div>
                    <div className="w-1 h-5 bg-orange-500/60 rounded-full"></div>
                    <div className="w-1 h-4 bg-orange-500/50 rounded-full"></div>
                    <div className="w-1 h-2.5 bg-orange-500/40 rounded-full"></div>
                    <div className="w-1 h-2 bg-orange-500/35 rounded-full"></div>
                    <div className="w-1 h-1.5 bg-orange-500/30 rounded-full"></div>
                </div>

                {/* Right line - 30% */}
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-orange-500/40"></div>
            </div>
        </div>
    );
};

export default SectionDivider;
