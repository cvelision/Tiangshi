import React from 'react';
import { Flame } from 'lucide-react';

interface Verse {
  roman: string;
  hanzi: string;
  pinyin: string;
  translationMn: string;
}

const VERSES: Verse[] = [
  {
    roman: 'I',
    hanzi: '烈火腾天照九重',
    pinyin: 'Liè huǒ téng tiān zhào jiǔ chóng',
    translationMn: 'Дүрэлзэх галын дөл есөн тэнгэрийг гийгүүлэн мандана',
  },
  {
    roman: 'II',
    hanzi: '金戈铁马镇乾坤',
    pinyin: 'Jīn gē tiě mǎ zhèn qián kūn',
    translationMn: 'Алтан жад, хуягт хүлгүүд тэнгэр газрыг түвшитгэн тохинуулна',
  },
  {
    roman: 'III',
    hanzi: '五载风云铸帝业',
    pinyin: 'Wǔ zǎi fēng yún zhù dì yè',
    translationMn: 'Таван жилийн салхи шуурган дунд эзэнт гүрний үйл хэрэг дархлагдав',
  },
  {
    roman: 'IV',
    hanzi: '丹心永炽耀长空',
    pinyin: 'Dān xīn yǒng chì yào cháng kōng',
    translationMn: 'Улаан зүрх хязгааргүй тэнгэрт мөнхөд гэрэлтэн бадарна',
  },
];

export const FireHymnSection: React.FC = () => {
  return (
    <section id="hymn" className="my-16 sm:my-24 border-t border-b border-[#e6d5c3]/20 py-12 sm:py-16 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Title updated per user request: "5 жилийн бадрал" */}
        <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10">
          <Flame className="w-5 h-5 text-[#ff3b1e]" />
          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-wider">
            5 жилийн бадрал
          </h3>
          <Flame className="w-5 h-5 text-[#ff3b1e]" />
        </div>

        {/* 4 Inscribed Tablets with "МӨР" instead of "БАДАГ" and no symbolism line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
          {VERSES.map((item) => (
            <div
              key={item.roman}
              className="p-5 sm:p-6 rounded bg-[#1e0204]/90 border border-[#e6d5c3]/30 hover:border-[#f5ebe0]/60 hover:bg-[#2b0306] transition-all group shadow-[0_4px_25px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3 text-xs font-cinzel text-[#e6d5c3]">
                <span className="tracking-[0.2em] font-bold">МӨР {item.roman}</span>
                <span className="text-[11px] text-[#e6d5c3]/60 uppercase tracking-widest font-mn">
                  Тианши улс
                </span>
              </div>

              <div className="font-calligraphy text-2xl sm:text-3xl text-[#f5ebe0] tracking-widest my-2 glow-beige">
                {item.hanzi}
              </div>

              <div className="text-xs text-[#e6d5c3]/75 font-mn italic mb-2">
                {item.pinyin}
              </div>

              <p className="text-sm text-[#f5ebe0] font-mn leading-relaxed mt-2 border-t border-[#e6d5c3]/15 pt-2.5 font-normal">
                "{item.translationMn}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
