import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { type Project, getProjectBySlug } from '../lib/db';
import { ArrowLeft } from 'lucide-react';

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (slug) {
        const data = await getProjectBySlug(slug);
        if (data) {
          setProject(data);
        } else {
          // Not found
          navigate('/');
        }
      }
    };
    fetchProject();
  }, [slug, navigate]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Hero Image */}
      <div className="w-full h-[60vh] bg-[#11161B] relative overflow-hidden">
        {project.mainImage ? (
          <img src={project.mainImage} alt={project.venueName} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full bg-gray-800"></div>
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto w-full z-10">
          <Link to="/" className="text-gray-300 hover:text-white flex items-center mb-6 text-sm transition-colors w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Powrót
          </Link>
          <span className="text-amber-500 font-semibold tracking-widest text-sm uppercase mb-2">
            {project.status === 'completed' ? 'Realizacja Ukończona' : 'W Budowie'}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tighter mb-4">
            {project.venueName}
          </h1>
          <p className="text-xl text-gray-300 font-light">
            {project.city}, {project.country} • {project.yearBuilt}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Specs Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-sm sticky top-32">
            <h3 className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-6">Specyfikacja</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Miejscowość</span>
                <span className="font-medium text-gray-900">{project.city}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Głosy</span>
                <span className="font-medium text-gray-900">{project.voicesCount}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Manuały</span>
                <span className="font-medium text-gray-900">{project.manuals}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">Rok ukończenia</span>
                <span className="font-medium text-gray-900">{project.yearBuilt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-8">
          <div 
            className="prose prose-lg prose-gray max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-[#11161B]"
            dangerouslySetInnerHTML={{ __html: project.longDescription || '<p>Brak opisu szczegółowego.</p>' }}
          />

          {/* Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-light text-gray-900 mb-8">Galeria projektu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.galleryImages.map((img, i) => (
                  <div key={i} className="aspect-square bg-gray-100 overflow-hidden rounded-sm">
                    <img src={img} alt={`Galeria ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
