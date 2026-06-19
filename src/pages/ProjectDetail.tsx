import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { type Project, getProjectBySlug } from '../lib/db';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeInUp } from '../components/UI';

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  
  // Lightbox State
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchProject = async () => {
      if (slug) {
        const data = await getProjectBySlug(slug);
        if (data && mounted) {
          setProject(data);
        } else if (!data) {
          navigate('/');
        }
      }
    };
    fetchProject();
    return () => { mounted = false; };
  }, [slug, navigate]);

  // Handle Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null || !project?.galleryImages) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => prev !== null && prev < project.galleryImages.length - 1 ? prev + 1 : prev);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => prev !== null && prev > 0 ? prev - 1 : prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, project]);

  if (!project) return null;

  const hasGallery = project.galleryImages && project.galleryImages.length > 0;

  return (
    <div className="font-sans">
      {/* Section 1: Hero Cover Section */}
      <div className="w-full h-[70vh] bg-[#11161B] relative overflow-hidden">
        {project.mainImage ? (
          <img src={project.mainImage} alt={project.venueName} className="w-full h-full object-cover opacity-70" />
        ) : (
          <div className="w-full h-full bg-gray-800"></div>
        )}
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11161B]/80 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 max-w-7xl mx-auto w-full z-10">
          <FadeInUp>
            <Link to="/realizacje" className="text-gray-300 hover:text-white flex items-center mb-6 text-sm transition-colors w-fit backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Wróć do realizacji
            </Link>
            <span className="text-amber-400 font-semibold tracking-widest text-xs md:text-sm uppercase mb-3 block drop-shadow-sm">
              {project.status === 'completed' ? 'Realizacja Ukończona' : 'W Budowie / Projekt'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white tracking-tight mb-4 drop-shadow-sm leading-tight">
              {project.venueName}
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 font-light drop-shadow-sm">
              {project.city}, {project.country}
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Section 2: Split Informational Grid */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <FadeInUp>
              <div 
                className="prose prose-lg prose-gray max-w-none text-gray-600 text-base leading-relaxed space-y-6 prose-headings:font-light prose-headings:tracking-tight prose-headings:text-gray-900 prose-a:text-[#11161B] prose-a:underline-offset-4 hover:prose-a:text-gray-600 transition-colors"
                dangerouslySetInnerHTML={{ __html: project.longDescription || '<p>Brak opisu szczegółowego dla tego projektu.</p>' }}
              />
            </FadeInUp>
          </div>

          {/* Technical Specification Passport Card */}
          <div className="lg:col-span-5 w-full">
            <FadeInUp delay={0.2}>
              <div className="bg-white border border-gray-100 shadow-sm p-8 rounded-sm sticky top-32">
                <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8">
                  Specyfikacja Instrumentu
                </h3>
                
                <div className="space-y-5">
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-light">Miejscowość</span>
                    <span className="font-medium text-gray-900 text-right">{project.city}, {project.country}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-light">Rok ukończenia</span>
                    <span className="font-medium text-gray-900">{project.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-light">Liczba głosów</span>
                    <span className="font-medium text-gray-900">{project.voicesCount}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500 font-light">Traktura</span>
                    <span className="font-medium text-gray-900 text-right">{project.actionType || 'Mechaniczna'}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-500 font-light">Układ klawiatur</span>
                    <span className="font-medium text-gray-900">{project.manuals}</span>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
          
        </div>
      </div>

      {/* Section 3: High-End Media Gallery */}
      {hasGallery && (
        <div className="bg-[#11161B] py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <FadeInUp>
              <h3 className="text-2xl md:text-3xl font-light text-white mb-12 tracking-tight">Galeria projektu</h3>
            </FadeInUp>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {project.galleryImages.map((img, idx) => {
                // Mixed Grid Logic: 
                // Index 0: spans full width
                // Index 1, 2: span 1 column each
                // Index 3: spans full width... etc.
                const isWide = idx % 3 === 0;

                return (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative overflow-hidden cursor-pointer group rounded-sm bg-gray-900 ${isWide ? 'md:col-span-2 aspect-[21/9]' : 'col-span-1 aspect-[4/3]'}`}
                  >
                    <img 
                      src={img} 
                      alt={`${project.venueName} - ujęcie ${idx + 1}`} 
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100" 
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-light tracking-widest text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                        POWIĘKSZ
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && project.galleryImages && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white transition-colors p-2"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(prev => prev !== null && prev > 0 ? prev - 1 : prev);
              }}
              disabled={selectedImageIndex === 0}
              className="absolute left-4 md:left-12 z-50 text-gray-400 hover:text-white transition-colors p-4 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
            </button>

            {/* Main Image */}
            <motion.div 
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full max-w-6xl max-h-screen p-8 md:p-12 flex items-center justify-center relative"
              onClick={() => setSelectedImageIndex(null)} // click outside to close
            >
              <img 
                src={project.galleryImages[selectedImageIndex]} 
                alt="Galeria" 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image itself
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 font-light tracking-widest text-sm">
                {selectedImageIndex + 1} / {project.galleryImages.length}
              </div>
            </motion.div>

            {/* Next Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(prev => prev !== null && prev < project.galleryImages!.length - 1 ? prev + 1 : prev);
              }}
              disabled={selectedImageIndex === project.galleryImages.length - 1}
              className="absolute right-4 md:right-12 z-50 text-gray-400 hover:text-white transition-colors p-4 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
