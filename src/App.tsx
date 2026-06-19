import { useState } from 'react';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('PL');

  const languages = ['PL', 'ENG', 'DE', 'FR', 'ES', 'CN'];
  const menuItems = ['Start', 'O nas', 'Historia', 'Realizacje', 'Kontakt'];

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/organy.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay to ensure white text readability against the bright video */}
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

        {/* Content Wrapper */}
        <div className="relative h-full flex flex-col">
          {/* Navigation Bar */}
          <header className="w-full max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Brand Name */}
              <a href="#" className="text-2xl font-light tracking-widest text-white z-50">
                zych.com
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8 z-50">
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-200 hover:text-white transition-colors text-sm font-medium tracking-wide"
                  >
                    {item}
                  </a>
                ))}
                
                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center space-x-1 text-gray-200 hover:text-white transition-colors"
                  >
                    <Globe size={18} />
                    <span className="text-sm font-medium">{currentLang}</span>
                  </button>
                  
                  {isLangMenuOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-24 bg-white/95 backdrop-blur rounded-lg shadow-lg">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setCurrentLang(lang);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-1 text-sm hover:bg-gray-100 transition-colors ${
                            currentLang === lang ? 'font-bold text-gray-900' : 'text-gray-600'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden z-50 p-2 transition-colors ${isMobileMenuOpen ? 'text-gray-900' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </header>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-0 left-0 w-full h-auto min-h-screen bg-white/95 backdrop-blur z-40 flex flex-col pt-24 px-8 pb-8 shadow-xl">
              <nav className="flex flex-col space-y-6 flex-1">
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-2xl font-light text-gray-900 hover:text-gray-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                
                {/* Mobile Language Selector */}
                <div className="pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-4 tracking-wider uppercase">Język</p>
                  <div className="flex flex-wrap gap-4">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-lg transition-colors ${
                          currentLang === lang ? 'font-medium text-gray-900' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          )}

          {/* Main Hero Content */}
          <main className="flex-1 flex items-center justify-center px-4">
            <div className="text-center w-full max-w-5xl mx-auto z-10">
              <p className="text-sm md:text-base font-semibold text-gray-300 tracking-wider mb-8 uppercase">
                POLSKA MANUFAKTURA ORGANOWA
              </p>
              
              <div className="flex flex-col items-center justify-center gap-2 mb-12">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-jost font-semibold text-white/95 leading-snug tracking-tight">
                  ZYCH
                </h1>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-jost font-semibold text-white leading-snug tracking-tight whitespace-nowrap">
                  ZAKŁADY ORGANOWE
                </h2>
              </div>
              
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
                Tworzymy brzmienia, które przetrwają wieki. Pasja, tradycja i doskonałość rzemiosła.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 backdrop-blur-md transition-all">
                  Odkryj nasze realizacje
                </button>
                <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors shadow-lg">
                  Złóż zapytanie
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Text & Story Summary */}
            <div className="flex flex-col">
              <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-widest mb-4 uppercase">
                O nas
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-8">
                Pasja, tradycja i doskonałość rzemiosła.
              </h2>
              
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                Zakłady Organowe ZYCH to synonim najwyższej europejskiej jakości i bezkompromisowej perfekcji. Realizujemy kompleksowe prace organmistrzowskie – od wizji lokalnej, analizy akustycznej i komputerowej wizualizacji CAD, aż po precyzyjną intonację w miejscu przeznaczenia. Każdy instrument traktujemy indywidualnie, samodzielnie projektując menzurację piszczałek oraz dbając o bezbłędną lekkość mechanicznej traktury gry.
              </p>
              
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                Własna infrastruktura o powierzchni 1000 m², komora stabilizacji 10-letniego drewna oraz niezależna produkcja metalowych piszczałek z autorskich stopów cyny i ołowiu pozwalają nam zachować pełną kontrolę nad każdym detalem. Łącząc szlachetne, naturalne materiały z doświadczeniem zdobytym przy budowie blisko 90 instrumentów, tworzymy dzieła konkurujące z wiodącymi manufakturami zachodnimi – zachowując przy tym wyjątkowo konkurencyjne warunki współpracy.
              </p>
              
              <a 
                href="/o-nas" 
                className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-gray-600 transition-colors border-b border-gray-900 pb-1 self-start group"
              >
                Poznaj naszą historię
                <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
              </a>

              {/* Micro-Stats Row */}
              <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12">
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    90+ zrealizowanych<br/>instrumentów
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    10 lat sezonowania<br/>drewna
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    100% własna<br/>produkcja części
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Assets */}
            <div className="w-full relative overflow-hidden rounded-sm aspect-[3/4] lg:aspect-[4/5] bg-gray-200 shadow-2xl">
              <img 
                src="/organy1.jpg" 
                alt="Detale budowy organów ZYCH" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Our History Preview Section */}
      <section className="bg-[#181E24] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Visual Assets */}
            <div className="w-full relative overflow-hidden rounded-sm aspect-[3/4] lg:aspect-[4/5] bg-gray-800">
              <img 
                src="/organy2.jpg" 
                alt="Historia Zakładów Organowych ZYCH" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>

            {/* Right Column: Text & History Summary */}
            <div className="flex flex-col">
              <p className="text-xs sm:text-sm font-semibold text-gray-400 tracking-widest mb-4 uppercase">
                Nasza historia
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-100 tracking-tight leading-tight mb-8">
                Od małego warsztatu do europejskiego formatu.
              </h2>
              
              <p className="text-base text-gray-300 leading-relaxed mb-6">
                Historia Zakładów Organowych ZYCH rozpoczęła się w 1967 roku od skromnego warsztatu Jana Zycha. Przełomem technologicznym było wdrożenie sterowania elektrycznego w latach 80., a następnie pełne przejście na szlachetną trakturę mechaniczną w 1995 roku według najlepszych wzorców zachodnich. Kamieniem milowym stało się otwarcie w 1996 roku nowoczesnego kompleksu produkcyjnego o powierzchni 1000 m², co otworzyło marce drzwi do prestiżowych realizacji w kraju i za granicą.
              </p>
              
              <p className="text-base text-gray-300 leading-relaxed mb-8">
                Uwieńczeniem naszej dotychczasowej drogi było stworzenie w latach 2002–2006 Wielkich Organów w Bazylice w Licheniu – trzynastogłosowego instrumentu będącego trzecim co do wielkości w Europie i dwunastym na świecie. Dziś, jako dumny członek International Society of Organbuilders (ISO), nasz kilkunastoosobowy zespół tworzy unikalne instrumenty symfoniczne, barokowe oraz koncertowe dla wiodących filharmonii i akademii muzycznych.
              </p>
              
              <a 
                href="/nasza-historia" 
                className="inline-flex items-center gap-2 text-gray-100 font-medium hover:text-gray-400 transition-colors border-b border-gray-100 hover:border-gray-400 pb-1 self-start group"
              >
                Odkryj pełną chronologię
                <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
              </a>

              {/* Micro-Stats Row */}
              <div className="mt-12 md:mt-16 pt-8 border-t border-gray-700/50 flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12">
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-gray-700 hidden sm:block"></div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    Rok założenia<br/>1967
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-gray-700 hidden sm:block"></div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    3. największe organy<br/>w Europie
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-gray-700 hidden sm:block"></div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    Członek<br/>ISO Global
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects (Realizacje) Section */}
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Header Block */}
          <div className="mb-16">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-widest mb-4 uppercase">
              Realizacje
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-6">
              Brzmienie, które kształtuje przestrzeń.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Każdy instrument traktujemy jak autonomiczne dzieło sztuki. Nasze indywidualne podejście, poparte wnikliwą analizą architektury oraz akustyki wnętrza, zaowocowało stworzeniem ponad 100 najwyższej klasy instrumentów. Od monumentalnych organów w Bazylice Licheńskiej, przez prestiżowe sale koncertowe w Polsce, aż po unikalne realizacje międzynarodowe w Korei Południowej, Rosji i Białorusi – łączymy wizjonerską architekturę z doskonałością brzmienia.
            </p>
          </div>

          {/* Dynamic Bento Grid Component */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            
            {/* Card 1 (Vertical, Left Column) */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900 md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto md:h-full min-h-[400px] cursor-pointer">
              <img src="/organy3.jpg" alt="Projekt 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-500 group-hover:opacity-0" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full transition-opacity duration-500 group-hover:opacity-0">
                <h3 className="text-lg md:text-xl font-medium text-white">Together Church – Chungju</h3>
                <p className="text-sm text-gray-100 mt-1">Chungju - Korea Południowa</p>
                <p className="text-xs uppercase tracking-wider text-gray-200 mt-3 font-medium">Rok budowy: 2027 | Manuały: II/P</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <button className="rounded-full px-6 py-3 text-sm font-medium bg-white/95 text-gray-900 backdrop-blur-sm shadow-xl hover:bg-white transition-colors">
                  Szczegóły realizacji
                </button>
              </div>
            </div>

            {/* Card 2 (Wide, Top Right) */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900 md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-[21/9] cursor-pointer">
              <img src="/organy3.jpg" alt="Projekt 2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-500 group-hover:opacity-0" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full transition-opacity duration-500 group-hover:opacity-0">
                <h3 className="text-lg md:text-xl font-medium text-white">Bazylika Matki Bożej Licheńskiej</h3>
                <p className="text-sm text-gray-100 mt-1">Licheń Stary - Polska</p>
                <p className="text-xs uppercase tracking-wider text-gray-200 mt-3 font-medium">Rok budowy: 2006 | Manuały: VI/P | 157 głosów</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <button className="rounded-full px-6 py-3 text-sm font-medium bg-white/95 text-gray-900 backdrop-blur-sm shadow-xl hover:bg-white transition-colors">
                  Szczegóły realizacji
                </button>
              </div>
            </div>

            {/* Card 3 (Standard, Bottom Center) */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900 md:col-span-1 md:row-span-1 aspect-square md:aspect-[4/3] cursor-pointer">
              <img src="/organy3.jpg" alt="Projekt 3" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-500 group-hover:opacity-0" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full transition-opacity duration-500 group-hover:opacity-0">
                <h3 className="text-lg md:text-xl font-medium text-white">Kościół Św. Floriana</h3>
                <p className="text-sm text-gray-100 mt-1">Kraków - Polska</p>
                <p className="text-xs uppercase tracking-wider text-gray-200 mt-3 font-medium">Rok budowy: 2015 | Manuały: III/P</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <button className="rounded-full px-6 py-3 text-sm font-medium bg-white/95 text-gray-900 backdrop-blur-sm shadow-xl hover:bg-white transition-colors">
                  Szczegóły realizacji
                </button>
              </div>
            </div>

            {/* Card 4 (Standard, Bottom Right) */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900 md:col-span-1 md:row-span-1 aspect-square md:aspect-[4/3] cursor-pointer">
              <img src="/organy3.jpg" alt="Projekt 4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-500 group-hover:opacity-0" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full transition-opacity duration-500 group-hover:opacity-0">
                <h3 className="text-lg md:text-xl font-medium text-white">Filharmonia Bałtycka</h3>
                <p className="text-sm text-gray-100 mt-1">Gdańsk - Polska</p>
                <p className="text-xs uppercase tracking-wider text-gray-200 mt-3 font-medium">Rok budowy: 2008 | Manuały: IV/P</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                <button className="rounded-full px-6 py-3 text-sm font-medium bg-white/95 text-gray-900 backdrop-blur-sm shadow-xl hover:bg-white transition-colors">
                  Szczegóły realizacji
                </button>
              </div>
            </div>

          </div>

          {/* View All Button */}
          <div className="mt-16 flex justify-center">
            <a 
              href="/realizacje" 
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Zobacz wszystkie realizacje
              <ArrowRight size={20} className="transform transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <section className="bg-[#11161B] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Contact Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Invitation to Collaborate */}
            <div className="flex flex-col">
              <p className="text-xs sm:text-sm font-semibold text-gray-400 tracking-widest mb-4 uppercase">
                Kontakt
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-100 tracking-tight leading-tight mb-6">
                Skontaktuj się z nami.
              </h2>
              <p className="text-base text-gray-400 leading-relaxed">
                Wszelkie zapytania dotyczące budowy nowych organów, renowacji instrumentów historycznych oraz potencjalnej współpracy prosimy kierować bezpośrednio drogą mailową lub telefoniczną. Nasz zespół ekspertów odpowie na każde pytanie, analizując wstępne założenia architektoniczne i akustyczne.
              </p>
            </div>

            {/* Right Column: Structured Corporate Credentials */}
            <div className="flex flex-col md:pt-12">
              <h3 className="text-xl font-medium text-gray-100 mb-6">
                Zych Zakłady Organowe
              </h3>
              
              <div className="flex flex-col space-y-1">
                <p className="text-gray-300 text-base">ul. Lipińska 110</p>
                <p className="text-gray-300 text-base">05-200 Wołomin</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">Polska (PL)</p>
              </div>

              <div className="border-t border-gray-800 my-6 w-full"></div>

              <div className="flex flex-col space-y-2">
                <a href="mailto:organy@zych.com" className="text-gray-300 text-base hover:text-white transition-colors block w-fit">
                  e-mail: organy@zych.com
                </a>
                <a href="tel:+48227872012" className="text-gray-300 text-base hover:text-white transition-colors block w-fit mt-2">
                  tel: +48 22 787 20 12
                </a>
                <span className="text-gray-400 text-sm block mt-2">
                  fax: +48 22 787 91 57
                </span>
              </div>
            </div>

          </div>

          {/* Footer Block */}
          <div className="border-t border-gray-800 mt-24 mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © 2026 Zych Zakłady Organowe. Wszelkie prawa zastrzeżone.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                Polityka prywatności i cookies
              </a>
              <a 
                href="https://www.facebook.com/zychzakladyorganowe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors font-light"
              >
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default App;
