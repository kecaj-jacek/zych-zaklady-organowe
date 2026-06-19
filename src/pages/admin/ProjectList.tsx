import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { type Project, getProjects, deleteProject } from '../../lib/db';
import { Edit, Trash2, Plus } from 'lucide-react';

export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const data = await getProjects();
    data.sort((a, b) => b.yearBuilt - a.yearBuilt);
    return data;
  };

  useEffect(() => {
    fetchProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Czy na pewno chcesz usunąć projekt "${name}"?`)) {
      await deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900 tracking-tight">Realizacje</h1>
            <p className="text-sm text-gray-500 mt-1">Panel zarządzania projektami organów</p>
          </div>
          <Link 
            to="/admin/realizacje/dodaj" 
            className="flex items-center px-4 py-2 bg-[#11161B] text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Dodaj nową realizację
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          {loading ? (
             <div className="p-12 text-center text-gray-500">Ładowanie bazy danych...</div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Brak zrealizowanych projektów. Dodaj pierwszą realizację.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-medium">Nazwa (Miejsce)</th>
                  <th className="p-4 font-medium">Rok</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Głosy / Manuały</th>
                  <th className="p-4 font-medium text-right">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{project.venueName}</div>
                      <div className="text-xs text-gray-500">{project.city}, {project.country}</div>
                    </td>
                    <td className="p-4 text-gray-700">{project.yearBuilt}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {project.status === 'completed' ? 'Zrealizowane' : 'W budowie'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700 text-sm">
                      {project.voicesCount} gł. / {project.manuals}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          to={`/admin/realizacje/edytuj/${project.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(project.id, project.venueName)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Usuń"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
