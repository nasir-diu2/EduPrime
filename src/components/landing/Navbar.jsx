import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { api } from '../../services/api.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});
  
  useEffect(() => {
    loadNavItems();
  }, []);
  
  const loadNavItems = async () => {
    try {
      const items = await api.getNavbarItems();
      const sortedItems = items.sort((a, b) => a.order - b.order);
      setNavItems(sortedItems);
    } catch (error) {
      console.error('Error loading nav items:', error);
    }
  };
  
  const toggleDropdown = (itemId) => {
    setDropdownOpen(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const closeAllDropdowns = () => {
    setDropdownOpen({});
  };

  // Group items by parent/child relationship
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
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">EduPrime</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {groupedItems.map((item) => (
              <div key={item.id} className="relative">
                {item.has_dropdown && item.children.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                    >
                      {item.label}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen[item.id] ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen[item.id] && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                        {item.children.map((child) => (
                          <a
                            key={child.id}
                            href={child.link}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            onClick={closeAllDropdowns}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <a
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Admin
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {groupedItems.map((item) => (
              <div key={item.id}>
                {item.has_dropdown && item.children.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(`mobile-${item.id}`)}
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen[`mobile-${item.id}`] ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen[`mobile-${item.id}`] && (
                      <div className="pl-6">
                        {item.children.map((child) => (
                          <a
                            key={child.id}
                            href={child.link}
                            className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <a
              href="/admin"
              className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </a>
          </div>
        </div>
      )}
      
      {/* Click outside to close dropdowns */}
      {Object.values(dropdownOpen).some(Boolean) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeAllDropdowns}
        ></div>
      )}
    </nav>
  );
}