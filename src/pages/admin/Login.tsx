import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { FadeInUp } from '../../components/UI';

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this should be validated on a backend server.
    // However, since we are using IndexedDB for local data and don't have a backend, 
    // we use Vite env variables (which are embedded in JS but at least hidden from public GitHub via .env).
    const envLogin = import.meta.env.VITE_ADMIN_LOGIN;
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (login === envLogin && password === envPass) {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/realizacje');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <FadeInUp className="w-full max-w-md">
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-8 md:p-10">
          
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <h1 className="text-2xl font-light text-gray-900 tracking-tight">Panel Administracyjny</h1>
            <p className="text-sm text-gray-500 mt-1 text-center">Wprowadź dane dostępowe, aby zarządzać realizacjami.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Login</label>
              <input 
                type="text" 
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-2 border rounded-sm outline-none transition-colors ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-[#11161B] focus:ring-1 focus:ring-[#11161B]'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-2 border rounded-sm outline-none transition-colors ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-[#11161B] focus:ring-1 focus:ring-[#11161B]'}`}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 font-medium">
                Nieprawidłowy login lub hasło.
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-3 bg-[#11161B] text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Zaloguj się
            </button>
          </form>

        </div>
      </FadeInUp>
    </div>
  );
};
