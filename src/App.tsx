/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { ImperialGate } from './components/ImperialGate';
import { ImperialHeader } from './components/ImperialHeader';
import { SapphireGiftsSection } from './components/SapphireGiftsSection';
import { FireHymnSection } from './components/FireHymnSection';
import { ImperialEpistleSection } from './components/ImperialEpistleSection';
import { playChimeChord } from './utils/audio';
import { Share2, Check, ArrowDown, Flame, Sparkles } from 'lucide-react';

export default function App() {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Triggered when user clicks "TAP TO ENTER" on the intro screen
  const handleOpenGate = () => {
    setIsGateOpen(true);
    playChimeChord(isMuted);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      playChimeChord(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  return (
    <div id="top" className="min-h-[100dvh] w-full text-[#f5ebe0] relative overflow-x-hidden selection:bg-[#e6d5c3]/30 selection:text-[#fff]">
      {/* Background Deep Crimson Ember Canvas */}
      <ParticleCanvas />

      {/* The Ceremony Gate (Opening Screen) with High-Res Moving Painting Background */}
      <ImperialGate
        isOpen={isGateOpen}
        onOpen={handleOpenGate}
        title="5th anniversary of fire empire"
      />

      {/* Top Header Navigation */}
      <ImperialHeader
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Container - Responsive & Edge-to-Edge on Mobile */}
      <main className="w-full max-w-4xl mx-auto px-3 sm:px-6 pb-24 relative z-10">
        {/* Celebration Header */}
        <header id="anniversary" className="text-center pt-12 sm:pt-20 pb-10 sm:pb-14">
          {/* Imperial Crest Badge in Beige */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-10 h-[1px] bg-[#e6d5c3]/40" />
            <Flame className="w-4 sm:w-5 h-4 sm:h-5 text-[#ff3b1e] animate-pulse" />
            <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] text-[#e6d5c3] uppercase font-bold">
              FIRE EMPIRE
            </span>
            <Flame className="w-4 sm:w-5 h-4 sm:h-5 text-[#ff3b1e] animate-pulse" />
            <div className="w-8 sm:w-10 h-[1px] bg-[#e6d5c3]/40" />
          </div>

          {/* Glowing script number 5 in fire/beige */}
          <p className="font-script text-[clamp(90px,26vw,200px)] leading-[0.88] glow-five m-0 select-none text-[#f5ebe0]">
            5
          </p>

          <h2 className="font-cinzel font-bold tracking-[0.16em] uppercase text-[clamp(16px,4.2vw,28px)] text-[#f5ebe0] mt-3 sm:mt-4 mb-1 glow-beige">
            5th Anniversary of Fire Empire
          </h2>

          {/* Hanzi Subtitle under the 5th anniversary word */}
          <div className="font-calligraphy text-2xl sm:text-4xl text-[#f5ebe0] tracking-[0.22em] glow-beige my-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            火之帝國：天石之國
          </div>

          {/* Subtitle updated per user request */}
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.22em] text-[#e6d5c3]/85 uppercase mt-1">
            Five years of sovereignty in ZGRP
          </p>

          {/* May the Fire Empire flourish */}
          <div className="font-script text-[clamp(28px,7.5vw,52px)] text-white glow-script mt-4 sm:mt-5">
            May the Fire Empire flourish
          </div>

          {/* Decorative Divider in Beige */}
          <div className="flex items-center justify-center gap-3 my-6 sm:my-7">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#e6d5c3] to-transparent" />
            <Sparkles className="w-3.5 h-3.5 text-[#e6d5c3]" />
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#e6d5c3] to-transparent" />
          </div>

          <div className="mt-3 tracking-[0.3em] text-xs text-[#e6d5c3] opacity-85 font-cinzel font-bold flex items-center justify-center gap-1.5 animate-bounce">
            <span>SCROLL DOWN</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#e6d5c3]" />
          </div>
        </header>

        {/* Skill Faith ZGRP · Саффир улсаас Тианши улсад өргөн барьж буй ойн баярын бэлэг (With Picture Upload) */}
        <SapphireGiftsSection />

        {/* Sacred Hymn / Poetic Calligraphy Section (Mongolian Translation) */}
        <FireHymnSection />

        {/* Official Royal Congratulatory Epistle from Sapphire Country to Tiangshi Empire */}
        <ImperialEpistleSection />

        {/* Ceremonial Footer */}
        <footer className="text-center pt-12 pb-8 border-t border-[#e6d5c3]/25 mt-16 sm:mt-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1px] bg-[#e6d5c3]/40" />
            <Flame className="w-5 h-5 text-[#ff3b1e]" />
            <div className="w-10 h-[1px] bg-[#e6d5c3]/40" />
          </div>

          <p className="font-cinzel tracking-[0.3em] text-xs text-[#e6d5c3] my-2 font-bold uppercase">
            WITH WARMEST REGARDS
          </p>

          {/* Footer title updated per user request */}
          <div className="font-script text-[clamp(28px,7.5vw,56px)] text-white glow-script mt-1 mb-2">
            From the Sapphire Country for Tiangshi Empire
          </div>

          <div className="font-calligraphy text-xl text-[#f5ebe0]/80 tracking-widest my-2">
            火之帝國 · 天石之國
          </div>

          <p className="font-mn text-xs text-[#e6d5c3]/80 max-w-md mx-auto mb-6 px-4 font-light">
            Саффир болон Тианши улсуудын мөнхийн нөхөрлөл, бат бэх эвсэл, мандан бадралд зориулав.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleShare}
              className="px-5 py-2.5 rounded border border-[#e6d5c3]/50 bg-[#350407] text-[#f5ebe0] hover:bg-[#52070c] hover:border-[#f5ebe0] transition-colors text-xs font-cinzel font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(230,213,195,0.25)] cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Хуваалцах (Share Tribute)</span>
            </button>
          </div>

          <p className="text-[11px] text-[#e6d5c3]/50 font-cinzel tracking-widest uppercase mt-8">
            © 5th Year Jubilee · Sapphire Country for Tiangshi Empire
          </p>
        </footer>
      </main>

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3a0508] border-2 border-[#e6d5c3] text-[#f5ebe0] px-4 py-3 rounded shadow-[0_0_25px_rgba(255,59,30,0.5)] flex items-center gap-2 font-mn text-xs tracking-wider animate-fadeIn font-light">
          <Check className="w-4 h-4 text-[#e6d5c3]" />
          <span>Холбоос хуулагдлаа! (Link copied!)</span>
        </div>
      )}
    </div>
  );
}
