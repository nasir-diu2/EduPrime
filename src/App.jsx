import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AtAGlancePage from './pages/AtAGlancePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CareerPage from './pages/CareerPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import AcademicInfoPage from './pages/AcademicInfoPage.jsx';
import DIITNoticePage from './pages/DIITNoticePage.jsx';
import NUNoticePage from './pages/NUNoticePage.jsx';
import FacultyPage from './pages/FacultyPage.jsx';
import AlumniPage from './pages/AlumniPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { api } from './services/api.js';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = () => {
      setIsAuthenticated(api.isAuthenticated());
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/at-a-glance" element={<AtAGlancePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/academic-info" element={<AcademicInfoPage />} />
        <Route path="/notice/diit" element={<DIITNoticePage />} />
        <Route path="/notice/nu" element={<NUNoticePage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route 
          path="/admin/*" 
          element={
            <AdminPage 
              isAuthenticated={isAuthenticated}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;