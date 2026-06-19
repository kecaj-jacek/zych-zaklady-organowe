import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';

import { History } from './pages/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="o-nas" element={<About />} />
          <Route path="nasza-historia" element={<History />} />
          {/* Fallback for other paths for now, rendering Home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
