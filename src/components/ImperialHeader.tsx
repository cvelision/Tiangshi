import React from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';

interface ImperialHeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const ImperialHeader: React.FC<ImperialHeaderProps> = ({
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#080001]/92 border-b border-[#e6d5c3]/20 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand wordmark in Beige */}
        <a
          href="#top"
          className="font-cinzel text-sm sm:text-base md:text-lg font-bold tracking-[0.18em] text-[#f5ebe0] hover:text-[#fff] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2"
        >
          <Flame className="w-4 h-4 text-[#ff3b1e]" />
          <span>FIRE EMPIRE</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-[0.18em] uppercase text-[#e6d5c3]/85 font-mn">
          <a
            href="#anniversary"
            className="hover:text-[#f5ebe0] transition-colors whitespace-nowrap shrink-0"
          >
            Ойн баяр
          </a>
          <a
            href="#chronicles"
            className="hover:text-[#f5ebe0] transition-colors whitespace-nowrap shrink-0"
          >
            Ойн бэлэг
          </a>
          <a
            href="#hymn"
            className="hover:text-[#f5ebe0] transition-colors whitespace-nowrap shrink-0"
          >
            5 жилийн бадрал
          </a>
          <a
            href="#epistle"
            className="hover:text-[#f5ebe0] transition-colors whitespace-nowrap shrink-0"
          >
            Илгээлт бичиг
          </a>
        </nav>

        {/* Zone 3: Sound Toggle Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMute}
            className="px-3 py-1.5 text-xs font-medium text-[#e6d5c3] border border-[#e6d5c3]/30 rounded hover:border-[#f5ebe0] hover:bg-[#380508]/60 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            title={isMuted ? 'Дууг асаах' : 'Дууг хаах'}
            aria-label={isMuted ? 'Дууг асаах' : 'Дууг хаах'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] tracking-wider uppercase font-mn">
              {isMuted ? 'Дуугүй' : 'Аялгуутай'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
