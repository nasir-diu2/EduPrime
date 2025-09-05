import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';

export default function NewsArticles() {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    loadArticles();
  }, []);
  
  const loadArticles = async () => {
    try {
      const articlesData = await api.getNewsArticles();
      setArticles(articlesData);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News & Articles
          </h2>
          <p className="text-xl text-gray-600">
            Stay updated with the latest happenings and achievements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${article.imageUrl})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.description}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={article.link}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                  >
                    Read More →
                  </a>
                  <span className="text-sm text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}