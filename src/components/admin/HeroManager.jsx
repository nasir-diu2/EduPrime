import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { api, BACKEND_BASE_URL } from '../../services/api.js';

export default function HeroManager() {
  const [slides, setSlides] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({ title: '', subtitle: '', image_url: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    loadSlides();
  }, []);
  
  const loadSlides = async () => {
    setLoading(true);
    try {
      const slidesData = await api.getHeroSliders();
      setSlides(slidesData);
    } catch (error) {
      console.error('Error loading slides:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSlide) {
        await api.updateHeroSlider(editingSlide.id, formData);
      } else {
        await api.createHeroSlider(formData);
      }
      await loadSlides();
      resetForm();
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Error saving slide. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (slide) => {
    setEditingSlide(slide);
    setFormData({ 
      title: slide.title, 
      subtitle: slide.subtitle, 
      image_url: slide.image_url 
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setLoading(true);
      try {
        await api.deleteHeroSlider(id);
        await loadSlides();
      } catch (error) {
        console.error('Error deleting slide:', error);
        alert('Error deleting slide. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const resetForm = () => {
    setFormData({ title: '', subtitle: '', image_url: '' });
    setEditingSlide(null);
    setShowForm(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await api.uploadImage(file);
      setFormData((prev) => ({ ...prev, image_url: res.url }));
    } catch (err) {
      console.error('Upload failed', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Hero Slides</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          Add Slide
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h4 className="text-lg font-semibold mb-4">
            {editingSlide ? 'Edit Slide' : 'Add New Slide'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter slide title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <textarea
                required
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Enter slide subtitle/description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slide Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploading || loading}
                className="mt-1 block w-full text-sm"
              />
              {(uploading) && (
                <p className="text-xs text-gray-500 mt-1">Uploading image...</p>
              )}
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="mt-2 h-20 w-32 object-cover rounded-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (editingSlide ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <img
                  src={slide.image_url?.startsWith('/') ? `${BACKEND_BASE_URL}${slide.image_url}` : slide.image_url}
                  alt={slide.title}
                  className="w-32 h-20 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMC42NjY3IDEwTDE2IDEzLjMzMzNMMjEuMzMzMyAxMEwxNiA2LjY2NjY3TDEwLjY2NjcgMTBaIiBmaWxsPSIjOTQ5NkE4Ii8+Cjwvc3ZnPgo=';
                  }}
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">{slide.title}</h4>
                  <p className="text-gray-600 mt-1 line-clamp-2">{slide.subtitle}</p>
                  {slide.created_at && (
                    <p className="text-sm text-gray-400 mt-2">
                      Created: {new Date(slide.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {slides.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No slides found. Add your first slide to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}