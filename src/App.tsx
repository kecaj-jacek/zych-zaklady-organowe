import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { History } from './pages/History';
import { Contact } from './pages/Contact';
import { ProjectList } from './pages/admin/ProjectList';
import { ProjectForm } from './pages/admin/ProjectForm';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="o-nas" element={<About />} />
          <Route path="nasza-historia" element={<History />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="realizacje/:slug" element={<ProjectDetail />} />
          {/* Fallback for other paths for now, rendering Home */}
          <Route path="*" element={<Home />} />
        </Route>
        
        {/* Admin Routes (No Layout/Navbar) */}
        <Route path="/admin/realizacje" element={<ProjectList />} />
        <Route path="/admin/realizacje/dodaj" element={<ProjectForm />} />
        <Route path="/admin/realizacje/edytuj/:id" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
}

export default App;
