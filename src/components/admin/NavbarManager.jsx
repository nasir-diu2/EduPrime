import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { api } from '../../services/api.js';

export default function NavbarManager() {
  const [navItems, setNavItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ 
    label: '', 
    link: '', 
    order: 0, 
    parent_id: null, 
    has_dropdown: false 
  });
  
  useEffect(() => {
    loadNavItems();
  }, []);
  
  const loadNavItems = async () => {
    try {
      const itemsData = await api.getNavbarItems();
      const sortedItems = itemsData.sort((a, b) => a.order - b.order);
      setNavItems(sortedItems);
    } catch (error) {
      console.error('Error loading nav items:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateNavbarItem(editingItem.id, formData);
      } else {
        await api.createNavbarItem(formData);
      }
      await loadNavItems();
      resetForm();
    } catch (error) {
      console.error('Error saving nav item:', error);
    }
  };
  
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ 
      label: item.label, 
      link: item.link, 
      order: item.order,
      parent_id: item.parent_id || null,
      has_dropdown: item.has_dropdown || false
    });
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this navigation item?')) {
      try {
        await api.deleteNavbarItem(id);
        await loadNavItems();
      } catch (error) {
        console.error('Error deleting nav item:', error);
      }
    }
  };
  
  const moveItem = async (id, direction) => {
    const item = navItems.find(item => item.id === id);
    if (!item) return;
    
    const newOrder = direction === 'up' ? item.order - 1 : item.order + 1;
    try {
      await api.updateNavbarItem(id, { ...item, order: newOrder });
      await loadNavItems();
    } catch (error) {
      console.error('Error moving nav item:', error);
    }
  };
  
  const resetForm = () => {
    setFormData({ 
      label: '', 
      link: '', 
      order: 0, 
      parent_id: null, 
      has_dropdown: false 
    });
    setEditingItem(null);
    setShowForm(false);
  };
  
  // Get parent items for dropdown selection
  const parentItems = navItems.filter(item => !item.parent_id);
  
  // Group items for display
  const groupedItems = navItems.reduce((acc, item) => {
    if (!item.parent_id) {
      acc.push({
        ...item,
        children: navItems.filter(child => child.parent_id === item.id)
      });
    }
    return acc;
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Navigation Menu</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          Add Menu Item
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h4 className="text-lg font-semibold mb-4">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Label</label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Order</label>
                <input
                  type="number"
                  required
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Item</label>
                <select
                  value={formData.parent_id || ''}
                  onChange={(e) => setFormData({ ...formData, parent_id: e.target.value ? parseInt(e.target.value) : null })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">None (Top Level)</option>
                  {parentItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.has_dropdown}
                    onChange={(e) => setFormData({ ...formData, has_dropdown: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">Has Dropdown</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                {editingItem ? 'Update' : 'Create'}
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
      
      <div className="space-y-4">
        {groupedItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">#{item.order}</span>
                  <div className="flex flex-col">
                    <button
                      onClick={() => moveItem(item.id, 'up')}
                      className="text-gray-400 hover:text-blue-600 p-1"
                    >
                      <ArrowUpIcon className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => moveItem(item.id, 'down')}
                      className="text-gray-400 hover:text-blue-600 p-1"
                    >
                      <ArrowDownIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    {item.label}
                    {item.has_dropdown && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Dropdown
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">{item.link}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-700 p-2"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {item.children.length > 0 && (
              <div className="ml-8 space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Dropdown Items:</h5>
                {item.children.map((child) => (
                  <div key={child.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">#{child.order}</span>
                      <span className="text-sm font-medium text-gray-900">{child.label}</span>
                      <span className="text-xs text-gray-500">→ {child.link}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(child)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                      >
                        <PencilIcon className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(child.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <TrashIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {groupedItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No navigation items found. Add your first menu item to get started.
          </div>
        )}
      </div>
    </div>
  );
}