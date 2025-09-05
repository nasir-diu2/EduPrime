import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  PhotoIcon, 
  ChartBarIcon, 
  StarIcon, 
  AcademicCapIcon, 
  ChatBubbleLeftIcon,
  UserGroupIcon,
  NewspaperIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import HeroManager from './HeroManager.jsx';
import StatisticsManager from './StatisticsManager.jsx';
import WhyChooseUsManager from './WhyChooseUsManager.jsx';
import ProgramsManager from './ProgramsManager.jsx';
import TestimonialsManager from './TestimonialsManager.jsx';
import AlumniManager from './AlumniManager.jsx';
import NewsManager from './NewsManager.jsx';
import LogosManager from './LogosManager.jsx';
import NavbarManager from './NavbarManager.jsx';
import { api } from '../../services/api.js';

const menuItems = [
  { id: 'navbar', name: 'Navigation', icon: HomeIcon, component: NavbarManager },
  { id: 'hero', name: 'Hero Slider', icon: PhotoIcon, component: HeroManager },
  { id: 'statistics', name: 'Statistics', icon: ChartBarIcon, component: StatisticsManager },
  { id: 'why-choose', name: 'Why Choose Us', icon: StarIcon, component: WhyChooseUsManager },
  { id: 'programs', name: 'Programs', icon: AcademicCapIcon, component: ProgramsManager },
  { id: 'testimonials', name: 'Testimonials', icon: ChatBubbleLeftIcon, component: TestimonialsManager },
  { id: 'alumni', name: 'Alumni Showcase', icon: UserGroupIcon, component: AlumniManager },
  { id: 'news', name: 'News & Articles', icon: NewspaperIcon, component: NewsManager },
  { id: 'logos', name: 'Partner Logos', icon: BuildingOfficeIcon, component: LogosManager }
];

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('hero');
  const [user] = useState({ name: 'Admin User', email: 'admin@edu.com' });
  
  const handleLogout = async () => {
    await api.logout();
    onLogout();
  };
  
  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed h-full">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">EduPrime Admin</h1>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${
                  activeTab === item.id ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-64 flex-1">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {menuItems.find(item => item.id === activeTab)?.name}
          </h2>
        </header>
        
        <main className="p-6">
          {ActiveComponent && <ActiveComponent />}
        </main>
      </div>
    </div>
  );
}