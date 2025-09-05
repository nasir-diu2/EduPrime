import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { api, BACKEND_BASE_URL } from '../../services/api.js';

export default function AlumniManager() {
  const [alumni, setAlumni] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState(null);
  const [formData, setFormData] = useState({ name: '', designation: '', image_url: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    loadAlumni();
  }, []);
  
  const loadAlumni = async () => {
    setLoading(true);
    try {
      const alumniData = await api.getAlumniShowcase();
      setAlumni(alumniData);
    } catch (error) {
      console.error('Error loading alumni:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingAlumni) {
        await api.updateAlumniShowcase(editingAlumni.id, formData);
      } else {
        await api.createAlumniShowcase(formData);
      }
      await loadAlumni();
      resetForm();
    } catch (error) {
      console.error('Error saving alumni:', error);
      alert('Error saving alumni. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (alumniItem) => {
    setEditingAlumni(alumniItem);
    setFormData({ 
      name: alumniItem.name, 
      designation: alumniItem.designation, 
      image_url: alumniItem.image_url 
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alumni profile?')) {
      setLoading(true);
      try {
        await api.deleteAlumniShowcase(id);
        await loadAlumni();
      } catch (error) {
        console.error('Error deleting alumni:', error);
        alert('Error deleting alumni. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const resetForm = () => {
    setFormData({ name: '', designation: '', image_url: '' });
    setEditingAlumni(null);
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
        <h3 className="text-lg font-semibold text-gray-900">Alumni Showcase</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          Add Alumni
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h4 className="text-lg font-semibold mb-4">
            {editingAlumni ? 'Edit Alumni Profile' : 'Add New Alumni Profile'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Emily Davis"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Data Scientist"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
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
                  className="mt-2 h-20 w-20 object-cover rounded-full"
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
                {loading ? 'Saving...' : (editingAlumni ? 'Update' : 'Create')}
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
          {alumni.map((person) => (
            <div key={person.id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src={person.image_url?.startsWith('/') ? `${BACKEND_BASE_URL}${person.image_url}` : person.image_url}
                alt={person.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iOCIgZmlsbD0iIzk0OTZBOCIvPgo8cGF0aCBkPSJNMTYgNDhDMTYgNDAgMjMuMTYzIDM0IDMyIDM0QzQwLjgzNyAzNCA0OCA0MCA0OCA0OCIgZmlsbD0iIzk0OTZBOCIvPgo8L3N2Zz4K';
                }}
              />
              <h4 className="text-lg font-semibold text-gray-900">{person.name}</h4>
              <p className="text-blue-600 text-sm mb-4">{person.designation}</p>
              {person.created_at && (
                <p className="text-xs text-gray-400 mb-3">
                  Added: {new Date(person.created_at).toLocaleDateString()}
                </p>
              )}
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(person)}
                  className="text-blue-600 hover:text-blue-700 p-2"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(person.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          
          {alumni.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No alumni profiles found. Add your first alumni profile to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}