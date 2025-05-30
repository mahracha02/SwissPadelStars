import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import { ThemeProvider } from './contexts/ThemeContext';

// Admin Pages
import AdminLogin from './admin/pages/Login';
import AdminLayout from './admin/components/Layout';
import AdminDashboard from './admin/pages/Dashboard';
import AdminEvents from './admin/pages/Events';
import AdminGallery from './admin/pages/Gallery';
import AdminContacts from './admin/pages/Contacts';
import AdminSponsors from './admin/pages/Sponsors';
import AdminPartners from './admin/pages/Partners';
import AdminFeedback from './admin/pages/Feedback';
import AdminProfessionalServices from './admin/pages/ProfessionalServices';
import AdminParticularServices from './admin/pages/ParticularServices';
import AdminUsers from './admin/pages/Users';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout>{children}</AdminLayout>;
};

// Layout Component for Public Routes
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route
                path="*"
                element={
                  <PublicLayout>
                    <Routes>
                      <Route index element={<Accueil />} />
                      <Route path="evenements" element={<Evenements />} />
                      <Route path="sponsors" element={<Sponsors />} />
                      <Route path="galerie" element={<Galerie />} />
                      <Route path="contact" element={<Contact />} />
                      <Route path="services" element={<Services />} />
                      <Route path="particulier" element={<Particulier />} />
                      <Route path="professionnel" element={<Professionnel />} />
                    </Routes>
                  </PublicLayout>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="events" element={<AdminEvents />} />
                      <Route path="gallery" element={<AdminGallery />} />
                      <Route path="contacts" element={<AdminContacts />} />
                      <Route path="sponsors" element={<AdminSponsors />} />
                      <Route path="partners" element={<AdminPartners />} />
                      <Route path="feedback" element={<AdminFeedback />} />
                      <Route path="professional-services" element={<AdminProfessionalServices />} />
                      <Route path="particular-services" element={<AdminParticularServices />} />
                      <Route path="users" element={<AdminUsers />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;