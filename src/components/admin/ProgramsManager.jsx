import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { api, BACKEND_BASE_URL } from '../../services/api.js';

export default function ProgramsManager() {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image_url: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    loadPrograms();
  }, []);
  
  const loadPrograms = async () => {
    setLoading(true);
    try {
      const programsData = await api.getPrograms();
      setPrograms(programsData);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProgram) {
        await api.updateProgram(editingProgram.id, formData);
      } else {
        await api.createProgram(formData);
      }
      await loadPrograms();
      resetForm();
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Error saving program. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({ 
      title: program.title, 
      description: program.description, 
      image_url: program.image_url 
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setLoading(true);
      try {
        await api.deleteProgram(id);
        await loadPrograms();
      } catch (error) {
        console.error('Error deleting program:', error);
        alert('Error deleting program. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const resetForm = () => {
    setFormData({ title: '', description: '', image_url: '' });
    setEditingProgram(null);
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
        <h3 className="text-lg font-semibold text-gray-900">Programs</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          Add Program
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h4 className="text-lg font-semibold mb-4">
            {editingProgram ? 'Edit Program' : 'Add New Program'}
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
                placeholder="e.g., Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Describe the program..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Program Image</label>
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
                {loading ? 'Saving...' : (editingProgram ? 'Update' : 'Create')}
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
          {programs.map((program) => (
            <div key={program.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <img
                  src={program.image_url?.startsWith('/') ? `${BACKEND_BASE_URL}${program.image_url}` : program.image_url}
                  alt={program.title}
                  className="w-32 h-20 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAzMiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMC42NjY3IDEwTDE2IDEzLjMzMzNMMjEuMzMzMyAxMEwxNiA2LjY2NjY3TDEwLjY2NjcgMTBaIiBmaWxsPSIjOTQ5NkE4Ii8+Cjwvc3ZnPgo=';
                  }}
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">{program.title}</h4>
                  <p className="text-gray-600 mt-1">{program.description}</p>
                  {program.created_at && (
                    <p className="text-sm text-gray-400 mt-2">
                      Created: {new Date(program.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(program)}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(program.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {programs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No programs found. Add your first program to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}