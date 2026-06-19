import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { type Project, getProjects, saveProject, createSlug } from '../../lib/db';
import { ArrowLeft, UploadCloud, X } from 'lucide-react';

export const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<Omit<Project, 'id'>>(() => {
    if (id) {
      const projects = getProjects();
      const existing = projects.find(p => p.id === id);
      if (existing) return existing;
    }
    return {
      slug: '',
      venueName: '',
      city: '',
      country: 'Polska',
      yearBuilt: new Date().getFullYear(),
      voicesCount: 20,
      manuals: 'II/P',
      status: 'completed',
      mainImage: '',
      galleryImages: [],
      longDescription: ''
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: name === 'yearBuilt' || name === 'voicesCount' ? Number(value) : value };
      
      // Auto-generate slug when typing venueName
      if (name === 'venueName' && !id) {
        updated.slug = createSlug(value);
      }
      
      return updated;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleQuillChange = (content: string) => {
    setFormData(prev => ({ ...prev, longDescription: content }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.venueName.trim()) newErrors.venueName = 'Nazwa obiektu jest wymagana';
    if (!formData.city.trim()) newErrors.city = 'Miasto jest wymagane';
    if (!formData.yearBuilt) newErrors.yearBuilt = 'Rok jest wymagany';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    saveProject(id ? { ...formData, id } : formData);
    navigate('/admin/realizacje');
  };

  // Image Upload Handlers (converts files to base64 for local dev storage)
  const onDropMain = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, mainImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onDropGallery = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          galleryImages: [...prev.galleryImages, e.target?.result as string] 
        }));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps: getMainProps, getInputProps: getMainInput } = useDropzone({ onDrop: onDropMain, accept: {'image/*': []}, maxFiles: 1 });
  const { getRootProps: getGalleryProps, getInputProps: getGalleryInput } = useDropzone({ onDrop: onDropGallery, accept: {'image/*': []} });

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/admin/realizacje')}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Wróć do listy
        </button>

        <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-8">
          {id ? 'Edytuj realizację' : 'Dodaj nową realizację'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-gray-200 rounded-sm shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Venue Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa obiektu / Instytucji *</label>
              <input 
                type="text" 
                name="venueName" 
                value={formData.venueName} 
                onChange={handleTextChange}
                className={`w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-[#11161B] focus:border-[#11161B] outline-none ${errors.venueName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="np. Parafia św. Jana Apostoła i Ewangelisty"
              />
              {errors.venueName && <p className="text-red-500 text-xs mt-1">{errors.venueName}</p>}
            </div>

            {/* Slug */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleTextChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm bg-gray-50 text-gray-500 outline-none"
                placeholder="generowany-automatycznie"
              />
              <p className="text-xs text-gray-400 mt-1">Końcówka adresu URL, np. /realizacje/{formData.slug || '...'}</p>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Miasto *</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleTextChange}
                className={`w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-[#11161B] outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kraj</label>
              <input 
                type="text" 
                name="country" 
                value={formData.country} 
                onChange={handleTextChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#11161B] outline-none"
              />
            </div>

            {/* Year & Voices */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rok ukończenia *</label>
              <input 
                type="number" 
                name="yearBuilt" 
                value={formData.yearBuilt} 
                onChange={handleTextChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#11161B] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Liczba głosów</label>
              <input 
                type="number" 
                name="voicesCount" 
                value={formData.voicesCount} 
                onChange={handleTextChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#11161B] outline-none"
              />
            </div>

            {/* Manuals & Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manuały</label>
              <input 
                type="text" 
                name="manuals" 
                value={formData.manuals} 
                onChange={handleTextChange}
                placeholder="np. III/P"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#11161B] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleTextChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#11161B] outline-none bg-white"
              >
                <option value="completed">Zrealizowane</option>
                <option value="upcoming">W budowie / Projekt</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-100 my-8"></div>

          {/* Main Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zdjęcie główne (Miniatura)</label>
            <div {...getMainProps()} className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <input {...getMainInput()} />
              {formData.mainImage ? (
                <div className="relative inline-block">
                  <img src={formData.mainImage} alt="Main" className="h-40 object-cover rounded shadow-sm" />
                  <p className="text-xs text-gray-500 mt-2">Kliknij lub przeciągnij, aby zmienić zdjęcie</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm">Przeciągnij zdjęcie tutaj, lub kliknij aby wybrać</p>
                </div>
              )}
            </div>
          </div>

          {/* Gallery Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Galeria zdjęć (Opcjonalnie)</label>
            <div {...getGalleryProps()} className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors mb-4">
              <input {...getGalleryInput()} />
              <div className="flex flex-col items-center text-gray-500">
                <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm">Dodaj zdjęcia do galerii</p>
              </div>
            </div>
            {formData.galleryImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {formData.galleryImages.map((img, i) => (
                  <div key={i} className="relative group rounded overflow-hidden aspect-square border border-gray-200">
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 my-8"></div>

          {/* Long Description (Rich Text) */}
          <div className="mb-12">
             <label className="block text-sm font-medium text-gray-700 mb-2">Szczegółowy opis</label>
             <div className="bg-white">
               <ReactQuill 
                 theme="snow" 
                 value={formData.longDescription} 
                 onChange={handleQuillChange} 
                 className="h-64 mb-12"
               />
             </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button 
              type="submit" 
              className="px-6 py-3 bg-[#11161B] text-white font-medium rounded hover:bg-gray-800 transition-colors shadow-sm"
            >
              Zapisz i publikuj
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
