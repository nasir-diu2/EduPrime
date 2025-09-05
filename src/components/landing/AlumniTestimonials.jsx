import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { api } from '../../services/api.js';

export default function AlumniTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    loadTestimonials();
  }, []);
  
  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);
  
  const loadTestimonials = async () => {
    try {
      const testimonialsData = await api.getAlumniTestimonials();
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  if (testimonials.length === 0) return null;
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Words of Our Alumni
          </h2>
          <p className="text-xl text-gray-600">
            Hear from our graduates who are making their mark in the world
          </p>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].imageUrl}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-4">
                  "{testimonials[currentIndex].message}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-blue-600">
                    {testimonials[currentIndex].designation}
                  </div>
                </div>
              </div>
            </div>
            
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <ChevronLeftIcon className="h-8 w-8" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <ChevronRightIcon className="h-8 w-8" />
                </button>
                
                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}