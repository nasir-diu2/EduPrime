import Navbar from '../components/landing/Navbar.jsx';
import HeroSlider from '../components/landing/HeroSlider.jsx';
import Statistics from '../components/landing/Statistics.jsx';
import WhyChooseUs from '../components/landing/WhyChooseUs.jsx';
import Programs from '../components/landing/Programs.jsx';
import AlumniTestimonials from '../components/landing/AlumniTestimonials.jsx';
import AlumniShowcase from '../components/landing/AlumniShowcase.jsx';
import NewsArticles from '../components/landing/NewsArticles.jsx';
import LogoMarquee from '../components/landing/LogoMarquee.jsx';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <Statistics />
      <WhyChooseUs />
      <Programs />
      <AlumniTestimonials />
      <AlumniShowcase />
      <NewsArticles />
      <LogoMarquee />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">EduPrime</h3>
            <p className="text-gray-400 mb-4">
              Empowering minds, shaping futures with excellence in education
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 EduPrime. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}