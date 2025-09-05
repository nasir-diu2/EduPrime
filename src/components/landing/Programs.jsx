import { useState, useEffect } from 'react';
import { api, BACKEND_BASE_URL } from '../../services/api.js';

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  
  useEffect(() => {
    loadPrograms();
  }, []);
  
  const loadPrograms = async () => {
    try {
      const programsData = await api.getPrograms();
      setPrograms(programsData);
    } catch (error) {
      console.error('Error loading programs:', error);
    }
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of academic programs designed to prepare you for success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${program.image_url?.startsWith('/') ? `${BACKEND_BASE_URL}${program.image_url}` : program.image_url})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {program.description}
                </p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}