import React from 'react';
import { Scroll, Flame, Award, Sparkles } from 'lucide-react';

export const ImperialEpistleSection: React.FC = () => {
  return (
    <section id="epistle" className="my-16 sm:my-24 py-6 px-3 sm:px-4 max-w-4xl mx-auto">
      {/* Main Title per user instruction */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <Flame className="w-5 h-5 text-[#ff3b1e]" />
          <h3 className="font-mn text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-wide max-w-3xl mx-auto leading-snug glow-beige">
            Тианши улсын таван жилийн түүхэн ойд зориулсан хүндэтгэлийн бичиг
          </h3>
          <Flame className="w-5 h-5 text-[#ff3b1e]" />
        </div>
      </div>

      {/* Royal Scroll Container in Dark Wine Crimson with Beige Borders */}
      <div className="relative rounded-md bg-[#1d0204]/95 border-2 border-[#e6d5c3]/45 p-6 sm:p-10 md:p-12 royal-box-shadow">
        {/* Ornate Corner Elements in Beige */}
        <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#f5ebe0]" />
        <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#f5ebe0]" />
        <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#f5ebe0]" />
        <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#f5ebe0]" />

        {/* Center Imperial Crest */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full border-2 border-[#e6d5c3]/50 bg-[#2e0306] flex items-center justify-center shadow-[0_0_30px_rgba(255,59,30,0.4)]">
          <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#f5ebe0]" />
        </div>

        {/* Main Epistle Header in Capital Cyrillic */}
        <div className="text-center mb-8 pb-6 border-b border-[#e6d5c3]/25">
          <h4 className="font-mn font-semibold text-sm sm:text-base md:text-lg text-[#f5ebe0] tracking-wide leading-relaxed uppercase glow-beige">
            ТӨВХНӨН ТӨРТ ТИАНШИ УЛСЫН ЭРХЭМ ДЭЭД ТӨР, ХААНТ ЁС, ЭРХ БАРИГЧИД БОЛОН ЭРХЭМ АРД ИРГЭДЭД НЬ ТАВАН ЖИЛИЙН ОЙН БАЯРЫН ГАЛ ХАЛУУН МЭНДИЙГ ӨРГӨН ДЭВШҮҮЛЬЕ!
          </h4>
        </div>

        {/* The Full Official Epistle Body Text in Slender Elegant Font */}
        <div className="space-y-6 font-mn text-sm sm:text-base text-[#f5ebe0]/95 leading-relaxed text-justify font-light">
          <p className="first-letter:text-3xl first-letter:font-cinzel first-letter:text-[#f5ebe0] first-letter:mr-1 first-letter:float-left">
            Хүндэт Тианши улсын төр, засаг болон нийт Тианши иргэд Та бүхэнд Саффир улсын нэрийн өмнөөс мэндчилгээ дэвшүүлж, улс гүрний тань таван жилийн түүхэн ойг тохиолдуулан чин сэтгэлийн хүндэтгэл, баяр хүргэлтээ өргөн барьж байна.
          </p>

          <p>
            Таван жил гэдэг бол нэгэн улсын хувьд зөвхөн өнгөрсөн хугацааны хэмжүүр бус, харин оршин тогтнох хүсэл зориг, тууштай байдлын илэрхийлэл, ирээдүйгээ бүтээн байгуулахын төлөөх нэгдмэл хүчин чармайлтын гэрч билээ. Энэ хугацаанд Тианши улс өөрийн түүх, уламжлал, төрийн ёс жаягийг цогцлоон, улс гүрнийхээ нэр алдрыг өргөж, олон улсын тавцанд өөрийн гэсэн өнгө төрх, байр суурийг бий болгож ирсэн нь юутай хүндлүүштэй.
          </p>

          <p>
            Танай улсын оршин тогтнолын түүхэнд шингэсэн зүтгэл, төрийн үйл хэрэгтээ баримталсан тууштай байдал, хаад хатдынх нь мэргэн ухаан, ард иргэдийн нь эв нэгдэл, эх орныхоо төлөөх үнэнч сэтгэл бүхэн өнөөгийн Тианшигийн өнгө төрхийг тодорхойлж буй эрхэм үнэт зүйлс мөн. Улс гүрний сүр хүчийг зөвхөн эрх мэдэл, эд баялгаар бус, харин өв соёлоо хадгалж, үнэт зүйлээ хамгаалан, цаг үеийн сорилтыг нэр төртэй даван туулах чадвараар хэмждэг билээ.
          </p>

          <p>
            Саффир улс Тианши улсын таван жилийн ойгоо тэмдэглэж буй энэ өдөр өнгөрсөн хугацаанд бүтээн байгуулсан бүхний тань үнэ цэнийг өндрөөр үнэлж, цаашдын хөгжил дэвшил, мандан бадралд тань чин сэтгэлийн ерөөл өргөж байна.
          </p>

          <p className="bg-[#140102]/60 p-4 sm:p-5 rounded border border-[#e6d5c3]/20 italic font-normal text-[#f5ebe0]">
            Тианши улсын төрийн сүлд хийморь өнө мөнхөд өндөрт мандаж, хаант төрийн сүр жавхлан үеийн үед бадрах болтугай. Хаан ширээ нь бат оршиж, төрийн бодлого нь мэргэн, шийдвэр бүхэн нь шударга, улс гүрний тань алдар нэр алс холд түгэн дэлгэрэх болтугай. Ард иргэд нь амар амгалан, айл өрх бүр нь аз жаргалтай, газар нутаг нь энх тунх, ирээдүй нь гэрэл гэгээтэй байхыг хүсэн ерөөе.
          </p>

          <p>
            Мөн хоёр улсын найрсаг харилцаа, харилцан хүндэтгэлд суурилсан хамтын ажиллагаа улам бүр бэхжиж, өнө удаан жилийн турш итгэлцэл, нөхөрлөлийн бат бөх гүүр болон оршихын ерөөлийг өргөн дэвшүүлье.
          </p>

          <p className="font-semibold text-center text-[#f5ebe0] tracking-wide pt-2">
            Таван жилийн түүх нь алдар суугаар арвин, ирэх он жилүүд нь амжилт бүтээлээр дүүрэн байх болтугай.
          </p>

          <div className="text-center py-4 text-base sm:text-lg font-cinzel font-bold text-[#f5ebe0] tracking-widest uppercase glow-beige">
            Тианши улс мандан бадраг! Төрийн сүлд нь өнө мөнхөд ивээх болтугай!
          </div>

          {/* Signature and Seal Stamp */}
          <div className="pt-8 border-t border-[#e6d5c3]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
            <div className="flex items-center gap-2 text-xs text-[#e6d5c3]/70 font-cinzel tracking-widest uppercase">
              <Scroll className="w-4 h-4 text-[#e6d5c3]" />
              <span>ТӨРИЙН СОЁРХОЛТ ЗАРЛИГ</span>
            </div>

            <div className="text-center sm:text-right">
              <p className="font-mn font-semibold text-sm sm:text-base text-[#f5ebe0] tracking-wider">
                Хүндэтгэсэн, Саффир улсын төлөөлөл.
              </p>
              <p className="text-xs text-[#e6d5c3]/65 font-cinzel tracking-widest mt-1 uppercase">
                Sapphire Realm Plenipotentiary
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
