import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';

export default function WhyChooseUs() {
  const [features, setFeatures] = useState([]);
  
  useEffect(() => {
    loadFeatures();
  }, []);
  
  const loadFeatures = async () => {
    try {
      const featuresData = await api.getWhyChooseUs();
      setFeatures(featuresData);
    } catch (error) {
      console.error('Error loading features:', error);
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes our institution the perfect choice for your educational journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4 text-center">{feature.iconUrl}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}