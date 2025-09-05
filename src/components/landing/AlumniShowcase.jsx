import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';

export default function AlumniShowcase() {
  const [alumni, setAlumni] = useState([]);
  
  useEffect(() => {
    loadAlumni();
  }, []);
  
  const loadAlumni = async () => {
    try {
      const alumniData = await api.getAlumniShowcase();
      setAlumni(alumniData);
    } catch (error) {
      console.error('Error loading alumni:', error);
    }
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Alumni
          </h2>
          <p className="text-xl text-gray-600">
            Meet our distinguished graduates making impact across industries
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {alumni.map((person) => (
            <div key={person.id} className="text-center group">
              <div className="relative mb-4">
                <img
                  src={person.imageUrl}
                  alt={person.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto shadow-md group-hover:shadow-lg transition-shadow duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {person.name}
              </h3>
              <p className="text-blue-600 text-sm">
                {person.designation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}