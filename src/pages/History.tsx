import { useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FadeInUp } from '../components/UI';

type Milestone = {
  year: string;
  title: string;
  description: string;
  major: boolean;
};

type Era = {
  id: string;
  alignSticky: 'left' | 'right';
  milestones: Milestone[];
};

const eras: Era[] = [
  {
    id: 'era-1',
    alignSticky: 'left',
    milestones: [
      {
        year: '1967',
        title: 'Początki manufaktury.',
        description: 'Założenie firmy przez Jana Zycha w małym zakładzie o powierzchni 24 m². Samodzielna produkcja pneumatycznych stołów gry, wiatrownic, miechów i drewnianych piszczałek.',
        major: false
      },
      {
        year: '1975',
        title: 'Pierwszy instrument.',
        description: 'Budowa pierwszych nowych organów kościelnych (10 głosów) dla parafii Siennów, zapoczątkowująca powolny, stabilny rozwój i rozbudowę warsztatu.',
        major: false
      },
      {
        year: '1982',
        title: 'Rewolucja elektroniczna.',
        description: 'Do zespołu dołącza Dariusz Zych (elektronik), który wdraża nowoczesne sterowanie elektryczne w miejsce dotychczasowej traktury pneumatycznej.',
        major: false
      },
      {
        year: '1985',
        title: 'Przełom w Otwocku.',
        description: 'Realizacja monumentalnych, III-manuałowych organów w Otwocku. Oficjalny odbiór prof. Feliksa Rączkowskiego kończy się prestiżowym protokołem-laurką, otwierając drzwi do większych zleceń.',
        major: true
      }
    ]
  },
  {
    id: 'era-2',
    alignSticky: 'right',
    milestones: [
      {
        year: '1989-1990',
        title: 'Katedra Łowicka i Kielce.',
        description: 'Rozbudowa i modernizacja organów w Katedrze Łowickiej (inauguracja Festiwalu Bachowskiego) oraz realizacja 44-głosowego instrumentu w Kielcach. Rozbudowa zakładu do 130 m².',
        major: false
      },
      {
        year: '1995',
        title: 'Wdrożenie traktury mechanicznej.',
        description: 'Nawiązanie zachodnich kontaktów owocuje wdrożeniem mechanicznego systemu traktury gry według najwyższych standardów europejskich. System staje się bazą dla wszystkich kolejnych dzieł.',
        major: false
      },
      {
        year: '1996',
        title: 'Nowy Kompleks Produkcyjny.',
        description: 'Przeniesienie działalności do nowoczesnego zakładu o powierzchni 1000 m² z halą montażową (dla instrumentów do 40 głosów), profesjonalną suszarnią drewna i bezpyłową lakiernią. Powstanie przełomowego, 64-głosowego instrumentu symfoniczno-koncertowego w Warszawie oraz ekspansja zagraniczna (Katedra w Teagu, Korea Południowa).',
        major: true
      }
    ]
  },
  {
    id: 'era-3',
    alignSticky: 'left',
    milestones: [
      {
        year: '2002-2006',
        title: 'Dzieło Życia – Licheń.',
        description: 'Opracowanie oferty i realizacja Wielkich Organów Licheńskich (157 głosów) według koncepcji prof. Andrzeja Chorosińskiego. Powstaje trzeci co do wielkości instrument w Europie i dwunasty na świecie.',
        major: true
      },
      {
        year: '2008',
        title: 'Tradycja Północnoniemiecka.',
        description: 'Budowa unikalnego barokowego instrumentu w Markowicach, wzorowanego na historycznym stylu Arpa Schnitgera – strój Valotti, piszczałki przycinane do tonu, wisząca traktura gry.',
        major: false
      },
      {
        year: '2009-2010',
        title: 'Własna Odlewnia i Instytucje Świeckie.',
        description: 'Uruchomienie własnego działu produkcji piszczałek metalowych wraz z odlewnią blach cynowych. Realizacja prestiżowych organów dydaktyczno-koncertowych dla Opery i Filharmonii Podlaskiej w Białymstoku, Akademii Muzycznej we Wrocławiu oraz Uniwersytetu w Siedlcach.',
        major: true
      }
    ]
  }
];

export const History = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState<string>('1967');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <div className="bg-[#11161B] min-h-screen font-sans overflow-hidden relative">
      
      {/* Ambient Glow following the fixed center (gives a soft luminous pulse in the background) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-amber-500/[0.03] blur-[120px] rounded-full z-0 pointer-events-none"></div>

      {/* Giant Background Typography */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] font-bold text-white/[0.02] select-none z-0 pointer-events-none whitespace-nowrap transition-all duration-1000 ease-out">
        {activeYear}
      </div>

      {/* 1. Subpage Header */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-24 relative z-10 text-center px-6">
        <FadeInUp>
          <p className="text-xs font-semibold tracking-widest text-gray-500 mb-4 uppercase">
            KAMIENIE MILOWE
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-100 tracking-tighter max-w-5xl mx-auto leading-tight">
            Ponad pół wieku pasji i innowacji
          </h1>
        </FadeInUp>
      </section>

      {/* 2. Interactive Timeline Component */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-8 pb-32" ref={containerRef}>
        
        {/* The Timeline Track Line */}
        <div className="absolute top-0 bottom-0 left-6 lg:left-1/2 lg:-translate-x-1/2 w-[1px] bg-gray-800 z-0"></div>
        
        {/* The Animated Fill Line */}
        <motion.div 
          className="absolute top-0 bottom-0 left-6 lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-gray-400 origin-top z-0"
          style={{ scaleY: scrollYProgress }}
        ></motion.div>

        <div className="relative z-10 flex flex-col space-y-32 lg:space-y-48">
          {eras.map((era) => {
            const isLeftSticky = era.alignSticky === 'left';
            
            return (
              <div key={era.id} className="relative flex flex-col lg:flex-row w-full min-h-screen">
                
                {/* Sticky Panel (Hidden on mobile) */}
                <div className={`hidden lg:block w-1/2 ${isLeftSticky ? 'order-1 pr-16' : 'order-2 pl-16'}`}>
                  <div className="sticky top-32 h-[60vh] w-full rounded-sm overflow-hidden shadow-2xl bg-[#181E24]">
                    <img
                      src="/organy2.jpg"
                      alt="Historia Zakładów Organowych ZYCH"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Milestones Column */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center space-y-24 py-16 ${isLeftSticky ? 'order-2 lg:pl-16' : 'order-1 lg:pr-16'}`}>
                  {era.milestones.map((milestone) => {
                    const isActive = activeYear === milestone.year;

                    return (
                      <motion.div 
                        key={milestone.year}
                        onViewportEnter={() => setActiveYear(milestone.year)}
                        viewport={{ amount: 0.5, margin: "-20% 0px -20% 0px" }}
                        className={`relative flex flex-col ${isLeftSticky ? 'items-start text-left pl-12 lg:pl-0' : 'items-start text-left pl-12 lg:pl-0 lg:items-end lg:text-right'}`}
                      >
                        {/* Node Dot Indicator */}
                        <div 
                          className={`absolute w-3 h-3 rounded-full border-2 transition-all duration-500 z-20 
                            ${isLeftSticky 
                              ? 'left-6 lg:left-auto lg:-left-16 -translate-x-1/2' 
                              : 'left-6 lg:left-auto lg:-right-16 -translate-x-1/2 lg:translate-x-1/2'} 
                            mt-2 lg:mt-3
                            ${isActive 
                              ? 'bg-gray-100 border-gray-100 scale-150 shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                              : 'bg-[#11161B] border-gray-600 scale-100'}`}
                        ></div>

                        {/* Content */}
                        <div className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                          <h3 className={`text-3xl md:text-4xl font-semibold mb-3 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                            {milestone.year}
                          </h3>
                          <h4 className="text-xl md:text-2xl font-light tracking-wide text-gray-200 mb-4">
                            {milestone.title}
                          </h4>
                          <p className={`text-sm md:text-base leading-relaxed ${milestone.major ? 'max-w-xl text-gray-300' : 'max-w-md text-gray-400'}`}>
                            {milestone.description}
                          </p>

                          {/* Mobile-only Image (if major) */}
                          {milestone.major && (
                            <div className="lg:hidden mt-8 w-full max-w-md rounded-sm overflow-hidden aspect-video shadow-xl bg-gray-800">
                              <img src="/organy2.jpg" alt={milestone.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Closing Statement Section */}
      <section className="py-24 text-center px-6 relative z-10 border-t border-gray-800/50">
        <FadeInUp>
          <span className="block text-xs font-semibold tracking-widest text-gray-500 mb-4 uppercase">
            SPOJRZENIE W PRZYSZŁOŚĆ
          </span>
          <h2 className="text-2xl md:text-4xl font-light text-gray-100 mb-6">
            Historia, którą piszemy każdego dnia.
          </h2>
          <p className="text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Dzisiejsze Zakłady Organowe ZYCH to zgrany zespół wybitnych rzemieślników: stolarzy, mechaników, intonatorów, piszczałkarzy oraz muzyków. Specyfika tworzenia tak monumentalnych i skomplikowanych instrumentów wymaga wieloletniego planowania. Z dumą informujemy, że portfel zamówień naszej manufaktury oraz harmonogram prac projektowych i wykonawczych zostały w pełni zabezpieczone na kolejne lata, gwarantując ciągłość tradycji oraz nieprzerwany rozwój sztuki organmistrzowskiej.
          </p>
        </FadeInUp>
      </section>

    </div>
  );
};
