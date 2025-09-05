import { useState, useEffect } from 'react';
import { api, BACKEND_BASE_URL } from '../../services/api.js';

export default function LogoMarquee() {
  const [logos, setLogos] = useState([]);
  
  useEffect(() => {
    loadLogos();
  }, []);
  
  const loadLogos = async () => {
    try {
      const logosData = await api.getLogos();
      setLogos(logosData);
    } catch (error) {
      console.error('Error loading logos:', error);
    }
  };
  
  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by leading organizations worldwide
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex space-x-12 animate-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0">
                <a
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src={logo.image_url?.startsWith('/') ? `${BACKEND_BASE_URL}${logo.image_url}` : logo.image_url}
                    alt={logo.name}
                    className="h-16 w-auto object-contain"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}