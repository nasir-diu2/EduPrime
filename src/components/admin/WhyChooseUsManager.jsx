import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { api } from '../../services/api.js';
import IconPicker from './IconPicker.jsx';

export default function WhyChooseUsManager() {
  const [features, setFeatures] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon_url: '' });
  const [loading, setLoading] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  
  useEffect(() => {
    loadFeatures();
  }, []);
  
  const loadFeatures = async () => {
    setLoading(true);
    try {
      const featuresData = await api.getWhyChooseUs();
      setFeatures(featuresData);
    } catch (error) {
      console.error('Error loading features:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingFeature) {
        await api.updateWhyChooseUs(editingFeature.id, formData);
      } else {
        await api.createWhyChooseUs(formData);
      }
      await loadFeatures();
      resetForm();
    } catch (error) {
      console.error('Error saving feature:', error);
      alert('Error saving feature. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setFormData({ 
      title: feature.title, 
      description: feature.description, 
      icon_url: feature.icon_url 
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      setLoading(true);
      try {
        await api.deleteWhyChooseUs(id);
        await loadFeatures();
      } catch (error) {
        console.error('Error deleting feature:', error);
        alert('Error deleting feature. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const resetForm = () => {
    setFormData({ title: '', description: '', icon_url: '' });
    setEditingFeature(null);
    setShowForm(false);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Why Choose Us Features</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          Add Feature
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h4 className="text-lg font-semibold mb-4">
            {editingFeature ? 'Edit Feature' : 'Add New Feature'}
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
                placeholder="e.g., World-Class Faculty"
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
                placeholder="Describe this feature..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <div
                className="mt-1 flex items-center gap-3 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => setShowIconPicker(true)}
              >
                {formData.icon_url ? (
                  <i className={`${formData.icon_url} text-2xl`}></i>
                ) : (
                  <span className="text-gray-400">Choose icon</span>
                )}
              </div>
              <IconPicker
                open={showIconPicker}
                onClose={() => setShowIconPicker(false)}
                onSelect={(icon) => setFormData((p) => ({ ...p, icon_url: icon }))}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (editingFeature ? 'Update' : 'Create')}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{feature.icon_url}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(feature)}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(feature.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {features.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No features found. Add your first feature to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}