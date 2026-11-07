import React, { useState, useEffect, useRef } from 'react';
import { Flame, Upload, Image as ImageIcon, Trash2, ZoomIn, X, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface GiftItem {
  id: number;
  roman: string;
  titleMn: string;
  titleEn: string;
  description: string;
  purpose?: string;
  symbolism: string;
}

export const GIFTS_DATA: GiftItem[] = [
  {
    id: 1,
    roman: 'I',
    titleEn: 'THE PHOENIX',
    titleMn: 'ГАЛТ ШУВУУ',
    description: 'Калверат улсаас онцгойлон авчруулсан ховор нандин галт шувуу Феникс.',
    symbolism:
      'Феникс нь дахин мандах амьдрал, мөнхийн оршихуй, үл мөхөх галын бэлгэдэл билээ. Тэрбээр үнсэн дундаас дахин төрдөг домогтой тул Тианши улсын сүр хүч, хөгжил цэцэглэлт үеийн үед тасралтгүй үргэлжлэхийн ерөөл болгон өргөн барьж байна.',
  },
  {
    id: 2,
    roman: 'II',
    titleEn: 'THE GOLDEN CELESTIAL GLOBE',
    titleMn: 'ОДОН ОРНЫ АЛТАН БӨМБӨРЦӨГ',
    description: 'Саффирын нэрт урчуудын гараар урласан, алтадсан хүрэл суурь бүхий одон орны бөмбөрцөг.',
    purpose: 'Эзэн хааны ордны номын сан, одон орны танхимд байрлуулах зориулалттай.',
    symbolism:
      'Тэнгэр эрхэс, цаг хугацаа, эрдэм мэдлэг болон ертөнцийн уудам хязгаарыг төлөөлнө. Мөн Тианши улсын ирээдүй од мэт гэрэлтэж, эзэнт гүрний нэр алдар дэлхийн өнцөг булан бүрд түгэхийн бэлгэдэл болно.',
  },
  {
    id: 3,
    roman: 'III',
    titleEn: 'THE ROYAL FLEET FLAGSHIP',
    titleMn: 'ХААНЫ ФЛОТЫН ТЭРГҮҮН ХӨЛӨГ',
    description:
      'Саффирийн усан онгоцны урчуудын бүтээсэн, бүрэн тоноглогдсон, тансаг хийц бүхий хааны далбаат хөлөг онгоц. Далай тэнгисийн ноёрхол, алсын хараа, хоёр улсын хамтын ирээдүйг бэлгэдэнэ.',
    symbolism: 'Далай тэнгисийн ноёрхол, алсын хараа, хоёр улсын хамтын ирээдүйг бэлгэдэнэ.',
  },
  {
    id: 4,
    roman: 'IV',
    titleEn: 'THE CROWN JEWEL',
    titleMn: 'ЭЗЭН ХААНЫ ТЭРГҮҮНД ЗАЛАХ ОЧИР ГОЁЛ',
    description:
      'Саффирийн эрдэнэсийн сангаас сонгосон ховор улаан индранил, бадмаараг болон шар алт цагаан алтаар хослуулан урласан, дахин давтагдашгүй хааны үнэт зүйл.',
    symbolism:
      'Эзэн хааны эрхэм дээд байр суурь, мандан бадрал, төрийн сүр жавхланг илэрхийлнэ. Мөн Саффирийн нэрийн өмнөөс өргөн барьж буй онцгой хүндэтгэлийн илэрхийлэл юм.',
  },
  {
    id: 5,
    roman: 'V',
    titleEn: 'THE IMPERIAL WINE COLLECTION',
    titleMn: 'ДЭЭД ЗЭРЭГЛЭЛИЙН ДАРСНЫ ЦУГЛУУЛГА',
    description:
      'Саффирийн өмнөд Гэгээн Элинтиа болон зүүн Месопотами нутгийн тусгай зооринд олон зуун жилийн турш хадгалсан, ховор ургацын дарсны цуглуулгыг Тианши улсын хааны ордонд дурсгал болгон өргөн барина.',
    symbolism:
      'Цаг хугацааны үнэ цэн, тансаг хэрэглээ, чинээлэг байдал болон хоёр улсын найрамдал урт удаан үргэлжлэхийн бэлгэдэл болно.',
  },
];

export const SapphireGiftsSection: React.FC = () => {
  // Primary state: map gift id -> image url (file path or dataUrl)
  const [giftImages, setGiftImages] = useState<Record<number, string>>(() => {
    const saved: Record<number, string> = {};
    GIFTS_DATA.forEach((g) => {
      try {
        const val = localStorage.getItem(`sapphire_gift_img_${g.id}`);
        if (val) saved[g.id] = val;
      } catch {
        // ignore
      }
    });
    return saved;
  });

  const [activeGiftIndex, setActiveGiftIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [savedBadgeId, setSavedBadgeId] = useState<number | null>(null);

  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // On mount: fetch server-stored images and auto-sync any local storage images to the server
  useEffect(() => {
    const syncImages = async () => {
      let serverImages: Record<string, string> = {};
      try {
        const res = await fetch('/api/get-gift-images');
        if (res.ok) {
          serverImages = await res.json();
        } else {
          // fallback to public/gift_images.json
          const res2 = await fetch('/gift_images.json');
          if (res2.ok) serverImages = await res2.json();
        }
      } catch {
        // ignore
      }

      const merged = { ...giftImages };

      // Apply server images
      Object.entries(serverImages).forEach(([k, v]) => {
        const id = parseInt(k, 10);
        if (id && v) {
          merged[id] = v;
          try {
            localStorage.setItem(`sapphire_gift_img_${id}`, v);
          } catch {
            // ignore
          }
        }
      });

      // If user has local images not yet in serverImages, send them to server now
      GIFTS_DATA.forEach((g) => {
        const localImg = localStorage.getItem(`sapphire_gift_img_${g.id}`);
        if (localImg && !serverImages[String(g.id)]) {
          merged[g.id] = localImg;
          // Send to server in background
          fetch('/api/save-gift-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ giftId: g.id, dataUrl: localImg }),
          }).catch(() => {});
        }
      });

      setGiftImages(merged);
    };

    syncImages();
  }, []);

  const handleFileChange = (giftId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSavingId(giftId);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;

      // Update state and localStorage immediately
      setGiftImages((prev) => ({ ...prev, [giftId]: dataUrl }));
      try {
        localStorage.setItem(`sapphire_gift_img_${giftId}`, dataUrl);
      } catch (err) {
        console.warn('Storage quota note:', err);
      }

      // Persist to server disk permanently
      try {
        const res = await fetch('/api/save-gift-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ giftId, dataUrl }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            setGiftImages((prev) => ({ ...prev, [giftId]: data.url }));
            try {
              localStorage.setItem(`sapphire_gift_img_${giftId}`, data.url);
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        console.warn('Could not save to server file system, saved to local cache:', err);
      } finally {
        setSavingId(null);
        setSavedBadgeId(giftId);
        setTimeout(() => setSavedBadgeId(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = async (giftId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setGiftImages((prev) => {
      const copy = { ...prev };
      delete copy[giftId];
      return copy;
    });
    try {
      localStorage.removeItem(`sapphire_gift_img_${giftId}`);
      await fetch('/api/delete-gift-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ giftId }),
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="chronicles" className="my-16 sm:my-24 pt-4 sm:pt-8 w-full">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14 px-2">
        <div className="flex items-center justify-center gap-2 mb-2.5">
          <Flame className="w-4 h-4 text-[#ff3b1e]" />
          <span className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#e6d5c3] uppercase font-bold glow-beige">
            Skill Faith ZGRP
          </span>
          <Flame className="w-4 h-4 text-[#ff3b1e]" />
        </div>

        <h3 className="font-mn text-xl sm:text-3xl md:text-4xl text-[#f5ebe0] tracking-wide font-bold leading-snug max-w-3xl mx-auto">
          Саффир улсаас Тианши улсад өргөн барьж буй ойн баярын бэлэг
        </h3>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#e6d5c3]/60 to-transparent mx-auto mt-4" />
      </div>

      {/* Gift Tabs Navigation */}
      <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-3 px-2 scrollbar-none">
        {GIFTS_DATA.map((gift, idx) => {
          const isActive = activeGiftIndex === idx;
          const hasImage = Boolean(giftImages[gift.id]);
          return (
            <button
              key={gift.id}
              type="button"
              onClick={() => setActiveGiftIndex(idx)}
              className={`px-3.5 sm:px-5 py-2.5 rounded-sm border font-cinzel text-xs font-bold tracking-[0.15em] uppercase transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#800e13] border-[#f5ebe0] text-[#f5ebe0] shadow-[0_0_20px_rgba(245,235,224,0.35)] scale-[1.02]'
                  : 'bg-[#2b0507]/80 border-[#e6d5c3]/30 text-[#e6d5c3]/70 hover:border-[#f5ebe0]/70 hover:text-[#f5ebe0]'
              }`}
            >
              <span>{gift.roman}.</span>
              <span className="font-mn font-medium text-[11px] sm:text-xs">
                {gift.titleMn}
              </span>
              {hasImage && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5ebe0]" title="Зураг бүр мөсөн хадгалагдсан" />
              )}
            </button>
          );
        })}
      </div>

      {/* Featured Gift Presentation Card - Centerpiece of the Site */}
      {(() => {
        const gift = GIFTS_DATA[activeGiftIndex];
        const uploadedImg = giftImages[gift.id];

        return (
          <div className="relative rounded-md bg-[#2d0507]/90 border-2 border-[#e6d5c3]/40 p-5 sm:p-8 md:p-10 royal-box-shadow transition-all duration-500">
            {/* Ornate Beige Corner Filigree */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#f5ebe0]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#f5ebe0]" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#f5ebe0]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#f5ebe0]" />

            {/* Header info */}
            <div className="text-center mb-6">
              <div className="font-cinzel text-xs tracking-[0.3em] text-[#e6d5c3] uppercase font-semibold mb-1">
                GIFT {gift.roman}
              </div>
              <h4 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-wider">
                {gift.roman}. {gift.titleEn} — <span className="font-mn">{gift.titleMn}</span>
              </h4>
            </div>

            {/* Image Centerpiece Area - Core of the site */}
            <div className="my-6 max-w-2xl mx-auto">
              <input
                type="file"
                accept="image/*"
                ref={(el) => {
                  fileInputRefs.current[gift.id] = el;
                }}
                onChange={(e) => handleFileChange(gift.id, e)}
                className="hidden"
              />

              {uploadedImg ? (
                /* Display Uploaded Image as Proud Focal Centerpiece */
                <div className="relative group rounded-md overflow-hidden border-2 border-[#e6d5c3]/60 bg-[#160305] shadow-[0_10px_40px_rgba(0,0,0,0.85)]">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: uploadedImg,
                        title: `${gift.roman}. ${gift.titleEn} — ${gift.titleMn}`,
                      })
                    }
                    className="cursor-zoom-in relative block bg-black/60"
                  >
                    <img
                      src={uploadedImg}
                      alt={gift.titleMn}
                      className="w-full max-h-[440px] sm:max-h-[520px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded bg-[#0d0203]/90 border border-[#e6d5c3] text-[#f5ebe0] text-xs font-cinzel font-semibold tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,235,224,0.4)]">
                        <ZoomIn className="w-4 h-4" />
                        <span>Томоор харах</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions & Permanent Storage Confirmation Bar */}
                  <div className="p-3.5 bg-[#1b0305] border-t border-[#e6d5c3]/35 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                    <span className="text-[#f5ebe0] font-mn flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Сайтын санд бүр мөсөн хадгалагдсан үндсэн зураг</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[gift.id]?.click()}
                        className="px-3.5 py-1.5 rounded bg-[#38070b] border border-[#e6d5c3]/40 text-[#f5ebe0] hover:bg-[#540a0e] transition-colors font-mn font-semibold tracking-wider uppercase text-[11px] cursor-pointer"
                      >
                        Зураг солих
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveImage(gift.id, e)}
                        className="p-1.5 text-red-300 hover:text-red-100 transition-colors cursor-pointer"
                        title="Зураг устгах"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Upload Prompt Frame */
                <div
                  onClick={() => fileInputRefs.current[gift.id]?.click()}
                  className="border-2 border-dashed border-[#e6d5c3]/50 hover:border-[#f5ebe0] rounded-md p-8 sm:p-14 text-center cursor-pointer bg-[#1e0406]/70 hover:bg-[#2e0609]/90 transition-all group shadow-[0_0_25px_rgba(0,0,0,0.5)]"
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto mb-3.5 rounded-full border border-[#e6d5c3]/50 flex items-center justify-center bg-[#3a060a] text-[#f5ebe0] group-hover:scale-110 group-hover:border-[#f5ebe0] transition-all shadow-[0_0_25px_rgba(255,59,30,0.35)]">
                    <Upload className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <p className="font-mn text-sm sm:text-base font-bold text-[#f5ebe0] tracking-wider mb-1">
                    ЭНД ДАРЖ ЗУРГАА ОРУУЛНА УУ
                  </p>
                  <p className="font-mn text-xs text-[#e6d5c3]/80 max-w-md mx-auto font-light leading-relaxed">
                    (Оруулсан зураг сайтад бүр мөсөн хадгалагдаж, уг бэлгийн үндсэн төрх болон тогтоно)
                  </p>
                </div>
              )}

              {/* Status notifications */}
              {savingId === gift.id && (
                <div className="mt-2 text-center text-xs text-[#e6d5c3] font-mn animate-pulse">
                  Зургийг сайтын файлын санд хадгалж байна...
                </div>
              )}

              {savedBadgeId === gift.id && (
                <div className="mt-2 text-center text-xs text-emerald-400 font-mn flex items-center justify-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Зураг сайтад бүр мөсөн амжилттай хадгалагдлаа!</span>
                </div>
              )}
            </div>

            {/* Content Details in Mongolian */}
            <div className="space-y-4 max-w-2xl mx-auto text-left font-mn text-sm sm:text-base text-[#f5ebe0]/90 leading-relaxed bg-[#1d0305]/70 p-5 sm:p-7 rounded border border-[#e6d5c3]/20">
              {/* Description */}
              <div>
                <p className="text-[#f5ebe0] leading-relaxed font-normal">
                  {gift.description}
                </p>
              </div>

              {/* Purpose (if exists) */}
              {gift.purpose && (
                <div className="pt-2 border-t border-[#e6d5c3]/15">
                  <span className="font-bold text-[#e6d5c3] font-cinzel tracking-wider text-xs uppercase block mb-1">
                    Зориулалт:
                  </span>
                  <p className="text-[#f5ebe0]/90 font-light">{gift.purpose}</p>
                </div>
              )}

              {/* Symbolism */}
              <div className="pt-2 border-t border-[#e6d5c3]/15">
                <span className="font-bold text-[#e6d5c3] font-cinzel tracking-wider text-xs uppercase block mb-1">
                  Бэлгэдэл:
                </span>
                <p className="text-[#f5ebe0]/90 font-light">{gift.symbolism}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Grid of all 5 Gifts Quick Access with live thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {GIFTS_DATA.map((item, idx) => {
          const imgUrl = giftImages[item.id];
          const hasImg = Boolean(imgUrl);
          return (
            <div
              key={item.id}
              onClick={() => setActiveGiftIndex(idx)}
              className={`p-4 rounded border transition-all cursor-pointer text-left flex flex-col justify-between ${
                activeGiftIndex === idx
                  ? 'bg-[#40070a] border-[#f5ebe0] shadow-[0_0_15px_rgba(245,235,224,0.25)]'
                  : 'bg-[#1e0405]/80 border-[#e6d5c3]/25 hover:border-[#f5ebe0]/60 hover:bg-[#320608]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-cinzel text-[#e6d5c3] mb-2">
                  <span className="font-bold tracking-widest">GIFT {item.roman}</span>
                  {hasImg ? (
                    <span className="text-[10px] text-emerald-400 font-mn flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Хадгалагдсан
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#e6d5c3]/60 font-mn">+ Зураг оруулах</span>
                  )}
                </div>

                {/* Thumbnail if present */}
                {hasImg && (
                  <div className="w-full h-28 mb-2.5 rounded overflow-hidden border border-[#e6d5c3]/30 bg-black/50">
                    <img
                      src={imgUrl}
                      alt={item.titleMn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h5 className="font-mn font-bold text-white text-sm sm:text-base tracking-wide mb-1">
                  {item.roman}. {item.titleMn}
                </h5>

                <p className="text-xs text-[#e6d5c3]/70 font-mn line-clamp-2 mt-1 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enlarged Image Lightbox */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded bg-[#2b0507] border border-[#e6d5c3] text-[#f5ebe0] hover:bg-[#540a0e] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] p-2 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-w-full max-h-[75vh] object-contain rounded border border-[#e6d5c3]/50 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            />
            <p className="mt-3 font-mn text-xs sm:text-sm text-[#f5ebe0] tracking-wider text-center font-medium">
              {lightboxImage.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
