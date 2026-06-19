import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FadeInUp } from './UI';

export const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('PL');
  const location = useLocation();

  const languages = ['PL', 'ENG', 'DE', 'FR', 'ES', 'CN'];
  const menuItems = [
    { name: 'Start', path: '/' },
    { name: 'O nas', path: '/o-nas' },
    { name: 'Historia', path: '/nasza-historia' },
    { name: 'Realizacje', path: '/realizacje' },
    { name: 'Kontakt', path: '/kontakt' }
  ];

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check if we are on the homepage to style the navbar differently (transparent on hero)
  // Actually, keeping the sticky navbar unified is requested. We can use a backdrop blur when scrolled.
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen font-sans flex flex-col bg-gray-900">
      {/* Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-[#11161B]/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Name */}
            <Link to="/" className="text-2xl font-light tracking-widest text-white z-50 hover:text-gray-200 transition-colors">
              zych.com
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 z-50">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`transition-colors text-sm font-medium tracking-wide ${location.pathname === item.path ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
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
              className="md:hidden z-50 p-2 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 w-full h-screen bg-gray-900/95 backdrop-blur z-40 flex flex-col pt-24 px-8 pb-8 shadow-xl">
          <nav className="flex flex-col space-y-6 flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-light transition-colors ${location.pathname === item.path ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="pt-8 border-t border-gray-800">
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
                      currentLang === lang ? 'font-medium text-white' : 'text-gray-500 hover:text-gray-300'
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

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Contact & Footer Section (Shared across all pages) */}
      <section className="bg-[#11161B] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Contact Block */}
          <FadeInUp className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
            
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

          </FadeInUp>

          {/* Footer Block */}
          <div className="border-t border-gray-800 mt-24 mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © 2026 Zych Zakłady Organowe. Wszelkie prawa zastrzeżone.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <Link to="/polityka-prywatnosci" className="text-xs text-gray-400 hover:text-white transition-colors">
                Polityka prywatności i cookies
              </Link>
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
};
