import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { History } from './pages/History';
import { Contact } from './pages/Contact';
import { Projects } from './pages/Projects';
import { ProjectList } from './pages/admin/ProjectList';
import { ProjectForm } from './pages/admin/ProjectForm';
import { ProjectDetail } from './pages/ProjectDetail';
import { Login } from './pages/admin/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="o-nas" element={<About />} />
          <Route path="nasza-historia" element={<History />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="realizacje" element={<Projects />} />
          <Route path="realizacje/:slug" element={<ProjectDetail />} />
          
          {/* Admin Routes */}
          <Route path="admin/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="admin/realizacje" element={<ProjectList />} />
            <Route path="admin/realizacje/dodaj" element={<ProjectForm />} />
            <Route path="admin/realizacje/edytuj/:id" element={<ProjectForm />} />
          </Route>
          
          {/* Fallback for other paths for now, rendering Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
