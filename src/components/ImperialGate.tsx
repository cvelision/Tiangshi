import React from 'react';
import { Flame } from 'lucide-react';

interface ImperialGateProps {
  isOpen: boolean;
  onOpen: () => void;
  title?: string;
}

export const ImperialGate: React.FC<ImperialGateProps> = ({
  isOpen,
  onOpen,
  title = '5th anniversary of fire empire',
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label="Tap to enter the 5th anniversary of fire empire"
      className={`fixed inset-0 w-full h-[100dvh] min-h-[100dvh] z-40 flex flex-col items-center justify-center text-center p-4 sm:p-6 cursor-pointer select-none transition-all duration-1000 ease-out overflow-hidden ${
        isOpen
          ? 'opacity-0 invisible pointer-events-none scale-105'
          : 'opacity-100 visible pointer-events-auto scale-100'
      }`}
    >
      {/* High-Resolution Enhanced Moving Artwork Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          src="/assets/intro_bg_enhanced.jpg"
          alt="Fire Empire Celestial Hearth Painting"
          className="w-full h-full object-cover object-[50%_36%] animate-ken-burns filter brightness-[0.84] contrast-[1.06]"
          style={{ imageRendering: 'auto' }}
        />

        {/* Soft Vignette Scrims calibrated for crisp text readability */}
        <div className="absolute inset-0 bg-radial from-[#240305]/50 via-[#120102]/70 to-[#080001]/92" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080001] via-transparent to-[#080001]/75" />
      </div>

      {/* Outer and Inner Imperial Frames in Beige */}
      <div className="absolute inset-2.5 sm:inset-5 border border-[#e6d5c3]/35 pointer-events-none z-10">
        <div className="absolute inset-1 sm:inset-2 border border-[#f5ebe0]/20" />

        {/* Corner Accents in Antique Beige */}
        <div className="absolute top-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-l-2 border-[#f5ebe0]" />
        <div className="absolute top-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-r-2 border-[#f5ebe0]" />
        <div className="absolute bottom-0 left-0 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-l-2 border-[#f5ebe0]" />
        <div className="absolute bottom-0 right-0 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-r-2 border-[#f5ebe0]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto px-2">
        {/* Decorative Fire Crest */}
        <div className="mb-3 sm:mb-5 relative flex items-center justify-center">
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-[#e6d5c3]/60 flex items-center justify-center bg-[#2c0305]/90 shadow-[0_0_35px_rgba(255,59,30,0.5)] backdrop-blur-sm">
            <Flame className="w-7 h-7 sm:w-9 sm:h-9 text-[#f5ebe0] animate-pulse" />
          </div>
        </div>

        {/* Kicker */}
        <small className="font-cinzel tracking-[0.3em] text-[11px] sm:text-xs text-[#e6d5c3] uppercase block mb-1 font-bold glow-beige">
          IMPERIAL CELEBRATION
        </small>

        {/* 5th anniversary of fire empire */}
        <h1 className="font-script text-[clamp(40px,9.5vw,90px)] my-1 text-white glow-script leading-[1.05] px-2 capitalize">
          {title}
        </h1>

        {/* Hanzi Subtitle: 火之帝國：天石之國 */}
        <div className="font-calligraphy text-2xl sm:text-4xl text-[#f5ebe0] tracking-[0.22em] glow-beige my-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          火之帝國：天石之國
        </div>

        {/* Subtitle updated per user request */}
        <p className="font-cinzel tracking-[0.2em] text-[11px] sm:text-xs text-[#e6d5c3]/90 max-w-md mx-auto mt-1 mb-6 sm:mb-8 font-medium uppercase">
          Five years of sovereignty in ZGRP
        </p>

        {/* Tap to enter button */}
        <div className="tracking-[0.25em] text-xs sm:text-sm text-[#f5ebe0] animate-pulse-subtle font-cinzel font-bold py-2.5 px-8 sm:px-9 border border-[#e6d5c3]/60 rounded-sm bg-[#3a0508]/85 shadow-[0_0_25px_rgba(255,59,30,0.45)] hover:border-[#f5ebe0] hover:bg-[#5e090f] transition-all backdrop-blur-sm">
          TAP TO ENTER
        </div>
      </div>
    </div>
  );
};
