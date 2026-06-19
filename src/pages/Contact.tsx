import { FadeInUp, AmbientGrid } from '../components/UI';

export const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 1. Subpage Header (Minimalist Editorial Hero) */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 bg-gray-50 overflow-hidden">
        <AmbientGrid />
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <FadeInUp>
            <p className="text-xs font-semibold tracking-widest text-gray-400 mb-4 uppercase">
              KONTAKT Z MANUFAKTURĄ
            </p>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tighter">
              Zapraszamy do kontaktu
            </h1>
          </FadeInUp>
        </div>
      </section>

      {/* 2. Two-Column Information Architecture Grid */}
      <section className="relative bg-gray-50 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start py-12">
            
            {/* Left Column (Corporate Credentials & Communication Hub) */}
            <div className="lg:col-span-5 flex flex-col">
              <FadeInUp>
                <h2 className="text-xl font-medium text-gray-900 mb-8">
                  Dane rejestrowe i teleadresowe
                </h2>
                
                {/* Company Block */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Zych Zakłady Organowe
                  </h3>
                  <div className="flex flex-col space-y-1">
                    <p className="text-gray-600 text-base leading-relaxed">ul. Lipińska 110</p>
                    <p className="text-gray-600 text-base leading-relaxed">05-200 Wołomin</p>
                    <p className="text-gray-600 text-base leading-relaxed">Polska (PL)</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6 w-full"></div>

                {/* Communication Channels */}
                <div className="flex flex-col space-y-3">
                  <a 
                    href="mailto:organy@zych.com" 
                    className="text-gray-700 text-base hover:text-gray-900 transition-colors block w-fit font-medium"
                  >
                    e-mail: organy@zych.com
                  </a>
                  <a 
                    href="tel:+48227872012" 
                    className="text-gray-700 text-base hover:text-gray-900 transition-colors block w-fit font-medium"
                  >
                    tel: +48 22 787 20 12
                  </a>
                  <span className="text-gray-500 text-sm block">
                    fax: +48 22 787 91 57
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-6 w-full"></div>

                {/* Direct Call-to-Action Text */}
                <p className="text-sm text-gray-500 italic leading-relaxed">
                  Wszelkie informacje w sprawie współpracy czy zamówień nowych instrumentów oraz renowacji prosimy kierować bezpośrednio drogą mailową lub telefoniczną. Nasz zespół pozostaje do Państwa dyspozycji.
                </p>
              </FadeInUp>
            </div>

            {/* Right Column (Premium Integrated Google Map) */}
            <div className="lg:col-span-7 w-full h-full min-h-[400px]">
              <FadeInUp delay={0.2} className="w-full h-full">
                <div className="w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm border border-gray-200 shadow-sm relative bg-gray-100 group">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.5354362999!2d21.250742512882578!3d52.342573449233186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471eda91f55f294d%3A0x962be66efef7ade4!2sZych%20Zak%C5%82ady%20Organowe!5e0!3m2!1spl!2spl!4v1781905567952!5m2!1spl!2spl" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale contrast-125 invert-[5%] sepia-[10%] saturate-[80%] transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100 group-hover:invert-0 group-hover:sepia-0 group-hover:saturate-100"
                  ></iframe>
                </div>
              </FadeInUp>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
