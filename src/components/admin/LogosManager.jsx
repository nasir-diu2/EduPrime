import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { api, BACKEND_BASE_URL } from '../../services/api.js';

export default function LogosManager() {
  const [logos, setLogos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);
  const [formData, setFormData] = useState({ name: '', image_url: '', link: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    loadLogos();
  }, []);
  
  const loadLogos = async () => {
    setLoading(true);
    try {
      const logosData = await api.getLogos();
      setLogos(logosData);
    } catch (error) {
      console.error('Error loading logos:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingLogo) {
        await api.updateLogo(editingLogo.id, formData);
      } else {
        await api.createLogo(formData);
      }
      await loadLogos();
      resetForm();
    } catch (error) {
      console.error('Error saving logo:', error);
      alert('Error saving logo. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (logo) => {
    setEditingLogo(logo);
    setFormData({ name: logo.name, image_url: logo.image_url, link: logo.link });
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this logo?')) {
      setLoading(true);
      try {
        await api.deleteLogo(id);
        await loadLogos();
      } catch (error) {
        console.error('Error deleting logo:', error);
        alert('Error deleting logo. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const resetForm = () => {
    setFormData({ name: '', image_url: '', link: '' });
    setEditingLogo(null);
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
        <h3 className="text-lg font-semibold text-gray-900">Partner Logos</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          Add Logo
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h4 className="text-lg font-semibold mb-4">
            {editingLogo ? 'Edit Partner Logo' : 'Add New Partner Logo'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Microsoft"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo Image</label>
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
                  className="mt-2 h-12 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Website</label>
              <input
                type="url"
                required
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://company.com"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (editingLogo ? 'Update' : 'Create')}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {logos.map((logo) => (
            <div key={logo.id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src={logo.image_url?.startsWith('/') ? `${BACKEND_BASE_URL}${logo.image_url}` : logo.image_url}
                alt={logo.name}
                className="h-16 w-auto object-contain mx-auto mb-4"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMkgzMk00NCAzMkg0NE00NCAyMEg0NEgzMkgyMEgyMEgyMCIgc3Ryb2tlPSIjOTQ5NkE4IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==';
                }}
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{logo.name}</h4>
              <a 
                href={logo.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 text-sm hover:text-blue-700 block mb-4 truncate"
              >
                {logo.link}
              </a>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(logo)}
                  className="text-blue-600 hover:text-blue-700 p-2"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(logo.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          
          {logos.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No logos found. Add your first partner logo to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}