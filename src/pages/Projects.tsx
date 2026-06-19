import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Project, getProjects } from '../lib/db';
import { FadeInUp } from '../components/UI';

type FilterType = 'all' | 'completed' | 'upcoming';
type SortType = 'newest' | 'oldest' | 'voices';

const ITEMS_PER_PAGE = 9;

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      const data = await getProjects();
      if (mounted) {
        setProjects(data);
        setLoading(false);
      }
    };
    fetchProjects();
    return () => { mounted = false; };
  }, []);

  // Filter and Sort Logic
  const filteredAndSorted = useMemo(() => {
    let result = [...projects];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.venueName.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (activeFilter !== 'all') {
      result = result.filter(p => p.status === activeFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
      if (sortBy === 'oldest') return a.yearBuilt - b.yearBuilt;
      if (sortBy === 'voices') return b.voicesCount - a.voicesCount;
      return 0;
    });

    return result;
  }, [projects, searchQuery, activeFilter, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  // Handlers to reset pagination when filters change
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortType) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 font-sans selection:bg-[#11161B] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <FadeInUp>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tighter mb-4">
              Realizacje
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl font-light">
              Katalog zbudowanych instrumentów oraz wizualizacje planowanych projektów.
            </p>
          </div>
        </FadeInUp>

        {/* Filter & Search Hub */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-12 bg-white p-4 rounded-sm border border-gray-100 shadow-sm sticky top-24 z-30">
            
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Szukaj miasta lub obiektu..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm outline-none focus:border-gray-400 transition-colors bg-gray-50"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <button 
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${activeFilter === 'all' ? 'bg-[#202A36] text-white border-[#202A36]' : 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-300'}`}
              >
                Wszystkie
              </button>
              <button 
                onClick={() => handleFilterChange('completed')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${activeFilter === 'completed' ? 'bg-[#202A36] text-white border-[#202A36]' : 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-300'}`}
              >
                Ukończone
              </button>
              <button 
                onClick={() => handleFilterChange('upcoming')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${activeFilter === 'upcoming' ? 'bg-[#202A36] text-white border-[#202A36]' : 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-300'}`}
              >
                Nadchodzące (Wizualizacje)
              </button>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-auto shrink-0">
              <select 
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortType)}
                className="w-full lg:w-auto px-4 py-2 bg-transparent border border-gray-200 rounded-full text-xs text-gray-600 outline-none focus:border-gray-400 cursor-pointer"
              >
                <option value="newest">Rok budowy (Najnowsze)</option>
                <option value="oldest">Rok budowy (Najstarsze)</option>
                <option value="voices">Liczba głosów</option>
              </select>
            </div>
          </div>
        </FadeInUp>

        {/* Dynamic Presentation Grid */}
        {loading ? (
          <div className="py-24 text-center text-gray-400">Ładowanie portfolio...</div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="py-24 text-center text-gray-500 font-light text-lg">
            Brak projektów spełniających kryteria wyszukiwania.
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <AnimatePresence mode="popLayout">
              {currentItems.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group flex flex-col"
                >
                  <Link to={`/realizacje/${project.slug}`} className="block relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200 mb-4 cursor-pointer">
                    
                    {/* Badge for upcoming */}
                    {project.status === 'upcoming' && (
                      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm shadow-sm">
                        <span className="text-[10px] font-semibold tracking-widest text-[#11161B] uppercase">Wizualizacja / Projekt</span>
                      </div>
                    )}

                    {/* Image */}
                    {project.mainImage ? (
                      <img 
                        src={project.mainImage} 
                        alt={project.venueName} 
                        loading="lazy"
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Brak zdjęcia</div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#11161B]/0 group-hover:bg-[#11161B]/30 transition-colors duration-500 flex items-center justify-center z-10">
                      <div className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                        <span className="bg-white text-gray-900 px-6 py-3 rounded-sm text-sm font-medium shadow-lg hover:bg-gray-50 transition-colors">
                          Szczegóły realizacji &raquo;
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Static Typography */}
                  <div className="px-1">
                    <h2 className="text-lg font-medium text-gray-900 tracking-tight leading-tight mb-1 group-hover:text-[#11161B] transition-colors">
                      {project.venueName}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3">
                      {project.city}, {project.country}
                    </p>
                    <div className="flex flex-wrap items-center text-xs uppercase tracking-wider text-gray-400 gap-3">
                      <span>Rok: <strong className="font-medium text-gray-600">{project.yearBuilt}</strong></span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>Głosy: <strong className="font-medium text-gray-600">{project.voicesCount}</strong></span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>Manuały: <strong className="font-medium text-gray-600">{project.manuals}</strong></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeInUp delay={0.2}>
            <div className="mt-20 flex justify-center items-center space-x-4 border-t border-gray-200 pt-8">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Poprzednia
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${currentPage === i + 1 ? 'bg-[#11161B] text-white' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
              >
                Następna
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </FadeInUp>
        )}

      </div>
    </div>
  );
};
