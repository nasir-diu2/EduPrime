import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';

export default function Statistics() {
  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    loadStatistics();
  }, []);
  
  const loadStatistics = async () => {
    try {
      const statsData = await api.getStatistics();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };
  
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl mb-2 text-white">
                {stat.icon_url ? <i className={`${stat.icon_url}`}></i> : null}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}