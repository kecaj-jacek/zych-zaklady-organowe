import { AmbientGrid, ParallaxImage, FadeInUp } from '../components/UI';

export const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Subpage Header (Minimalist Editorial Hero) */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 bg-gray-50 overflow-hidden">
        <AmbientGrid />
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <FadeInUp>
            <p className="text-xs font-semibold tracking-widest text-gray-400 mb-4 uppercase">
              O MANUFAKTURZE
            </p>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tighter">
              Doskonałość w każdym detalu
            </h1>
          </FadeInUp>
        </div>
      </section>

      {/* 2. Section I: Od Wizji do Projektu */}
      <section className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Column */}
            <div className="flex flex-col">
              <FadeInUp>
                <p className="text-xs font-semibold text-gray-500 tracking-widest mb-4 uppercase">
                  ETAP I / PROJEKTOWANIE
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight leading-tight mb-8">
                  Indywidualna architektura i akustyka
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Firma wykonuje kompleksowe prace organmistrzowskie. Po wizji lokalnej w miejscu, gdzie mają być zbudowane organy, opracowujemy wstępny projekt architektoniczny (z wizualizacją komputerową) i projekt muzyczny z dyspozycją głosów w oparciu o warunki akustyczne przestrzeni. Wychodząc naprzeciw oczekiwaniom klientów wykonujemy organy o określonej stylistyce brzmieniowej. Dla każdego instrumentu, indywidualnie opracowujemy menzurację piszczałek (konstrukcję, średnice wielkości, kształt i szerokość warg itp.).
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Gdy plany budowy zostaną zatwierdzone przez Inwestora, przygotowujemy projekt wykonawczy w technice CAD. Zostaje rozrysowana każda część instrumentu. Według tych rysunków specjaliści w swoich dziedzinach wykonują części składowe organów.
                </p>
              </FadeInUp>
            </div>
            {/* Media Column */}
            <FadeInUp delay={0.2} className="w-full">
              <ParallaxImage 
                src="/organy1.jpg" 
                alt="Projektowanie architektoniczne i akustyczne organów" 
                className="w-full rounded-sm aspect-square md:aspect-[4/3] bg-gray-200 shadow-xl"
              />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 3. Section II: Kunszt Produkcji i Montażu */}
      <section className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Media Column (Left on Desktop) */}
            <FadeInUp delay={0.2} className="w-full order-2 md:order-1">
              <ParallaxImage 
                src="/organy1.jpg" 
                alt="Proces produkcji i montażu piszczałek" 
                className="w-full rounded-sm aspect-square md:aspect-[4/3] bg-gray-200 shadow-xl"
              />
            </FadeInUp>
            {/* Text Column (Right on Desktop) */}
            <div className="flex flex-col order-1 md:order-2">
              <FadeInUp>
                <p className="text-xs font-semibold text-gray-500 tracking-widest mb-4 uppercase">
                  ETAP II / MANUFAKTURA
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight leading-tight mb-8">
                  Własna odlewnia i najwyższa jakość materiałów
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Ważne jest to, że wszystkie części – od konstrukcji nośnych, przez stoły gry, wiatrownice, miechy, obudowy organów i układy elektroniczne – firma wykonuje we własnym zakładzie. Sami też wykonujemy wszystkie piszczałki. Proces produkcji piszczałek metalowych rozpoczyna się od przygotowania stopu cyny i ołowiu o różnym składzie procentowym cyny. Stopiony materiał odlewany jest na blachy o różnych grubościach, po czym skrawany i polerowany. Tak przygotowany materiał przechowywany jest przez wiele miesięcy przed rozpoczęciem obróbki. Dopiero sezonowana blacha poddawana jest dalszej obróbce. Przycinana na wymiar, zwijana, lutowana i ponownie czyszczona. Gotowe piszczałki przechodzą wstępną intonację w zakładzie.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Do budowanych organów stosujemy tylko materiały naturalne: szlachetne gatunki drewna, stali nierdzewnej, cyny i skóry. Po wykonaniu wszystkich części organy montowane są na hali montażowej firmy. Często inwestor dokonuje początkowego odbioru prac jeszcze w zakładzie, przed instalacją organów w miejscu przeznaczenia. Gotowy instrument jest demontowany, przewożony, ponownie składany, intonowany i strojony. Taki proces pozwala skrócić czas instalacji organów do niezbędnego minimum i jest gwarancją najwyższej jakości. Jeżeli budowa prowadzona jest etapami, staramy się choćby fragmentarycznie zmontować pewne zespoły.
                </p>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section III: Kinowy Komponent Wideo */}
      <section className="bg-[#11161B] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <FadeInUp className="flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-light text-gray-100 tracking-tight mb-12 text-center">
              Zobacz proces tworzenia
            </h2>
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0&showinfo=0" 
                title="Proces budowy organów" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 5. Section IV: Infrastruktura i Technologia */}
      <section className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Column */}
            <div className="flex flex-col">
              <FadeInUp>
                <p className="text-xs font-semibold text-gray-500 tracking-widest mb-4 uppercase">
                  LOGISTYKA I ZAKŁAD
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight leading-tight mb-8">
                  Nowoczesny kompleks rzemieślniczy
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Firma dysponuje terenem o powierzchni 1 ha umożliwiającym zmagazynowanie 400 m³ drewna oraz dużym zakładem liczącym 1000 metrów kwadratowych powierzchni, ulokowanym na trzech kondygnacjach. Przestrzenne wnętrza dają możliwość ustawienia wielu obrabiarek do drewna i do metalu. Zakład posiada własną komorę stabilizacji drewna, gdzie drewno stosowane do budowy organów (sezonowane minimum 10 lat) dosuszane jest do parametrów wilgotnościowych poszczególnych świątyń czy sal. Ma to ogromne znaczenie – instrumenty od razu dostosowane są do warunków wnętrza. Gotowe elementy malowane są w bezpyłowej komorze lakierniczej, która umożliwia uzyskanie trwałych, najwyższej jakości powłok w bardzo krótkim czasie.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Wieloletnie doświadczenie w budowie organów mechanicznych, małych i dużych, owocuje niespotykaną u innych wykonawców lekkością traktury gry. Efekt ów osiągamy dzięki bezbłędnemu projektowaniu przebiegu mechaniki od klawisza (punkt podparcia) do wentyla (wielkość, kształt, zamocowanie). Stosujemy również – jeżeli wymagają tego warunki – różnego rodzaju wspomagania pneumatyczne traktury. Posiadamy własny transport, rusztowania, a co najważniejsze, specjalistyczne urządzenia dźwigowe. Inwestor zlecający Firmie budowę organów musi wręczyć nam klucze na chór organowy i zapewnić dostęp do energii elektrycznej; są to jedyne stawiane przez nas wymogi.
                </p>
              </FadeInUp>
            </div>
            {/* Media Column */}
            <FadeInUp delay={0.2} className="w-full">
              <ParallaxImage 
                src="/organy1.jpg" 
                alt="Infrastruktura i hala montażowa" 
                className="w-full rounded-sm aspect-square md:aspect-[4/3] bg-gray-200 shadow-xl"
              />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 6. Section V: Nasza Filozofia i Partnerstwo */}
      <section className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Media Column (Left on Desktop) */}
            <FadeInUp delay={0.2} className="w-full order-2 md:order-1">
              <ParallaxImage 
                src="/organy1.jpg" 
                alt="Szczegóły wykonania i partnerstwo" 
                className="w-full rounded-sm aspect-square md:aspect-[4/3] bg-gray-200 shadow-xl"
              />
            </FadeInUp>
            {/* Text Column (Right on Desktop) */}
            <div className="flex flex-col md:col-span-1 order-1 md:order-2">
              <FadeInUp>
                <p className="text-xs font-semibold text-gray-500 tracking-widest mb-4 uppercase">
                  MISJA I PARTNERSTWO
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight leading-tight mb-8">
                  Europejska doskonałość w uczciwej cenie
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Kompleksowe wykonywanie wszystkich prac w przestrzennym zakładzie umożliwia utrzymanie najwyższej jakości na wszystkich etapach produkcji. Instrumenty Firmy cechuje wyjątkowa architektura, szlachetne brzmienie, perfekcja techniki, szlachetność materiałów, dbałość o szczegóły. W tej chwili procentuje doświadczenie zdobyte przy budowie prawie 90 instrumentów. Dokładamy wszelkich starań, aby instrumenty produkowane przez naszą firmę sprostały wymaganiom najsurowszych klientów. Wykwalifikowana załoga (w biurze pracują 2 osoby, a 15 przy produkcji) oraz niska struktura kosztów własnych pozwalają na wykonywanie prac na najwyższym poziomie europejskim, po niezwykle konkurencyjnych cenach.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Długoletnia współpraca z Inwestorami pozwala nam zrozumieć problemy płynące z finansowania tak dużych przedsięwzięć. Dlatego nasza Firma stara się, aby tego rodzaju problemy nie przysłaniały radości płynącej z budowania organów i tak ustala harmonogram prac i płatności, by zawsze osiągnąć kompromis. Naszą wizytówką są organy przedstawione na stronie internetowej. We wskazanych świątyniach można znaleźć nie tylko instrumenty, lecz także informacje o ich funkcjonowaniu, pochodzące od bezpośrednich Użytkowników, którzy pozostaną na zawsze naszymi Przyjaciółmi.
                </p>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};
