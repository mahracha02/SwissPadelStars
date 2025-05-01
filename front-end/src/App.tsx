import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Evenements from './pages/Evenements';
import Sponsors from './pages/Sponsors';
import Galerie from './pages/Galerie';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Particulier from './pages/Particulier';
import Professionnel from './pages/Professionnel';
import Footer from './layout/Footer';
import Menu from './layout/Menu';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/particulier" element={<Particulier />} />
          <Route path="/professionnel" element={<Professionnel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;