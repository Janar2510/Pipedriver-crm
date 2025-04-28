import React, { useState } from 'react';
import { CRMProvider } from './context/CRMContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Contacts } from './pages/Contacts';
import { Deals } from './pages/Deals';
import { Tasks } from './pages/Tasks';
import { Settings } from './pages/Settings';
import { Products } from './pages/Products';
import { Reports } from './pages/Reports';
import { Calendar } from './pages/Calendar';
import { Email } from './pages/Email';

function App() {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  const renderContent = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'contacts':
        return <Contacts />;
      case 'deals':
        return <Deals />;
      case 'tasks':
        return <Tasks />;
      case 'settings':
        return <Settings />;
      case 'products':
        return <Products />;
      case 'reports':
        return <Reports />;
      case 'calendar':
        return <Calendar />;
      case 'email':
        return <Email />;
      case 'help':
        return <div className="p-6">Help and Documentation (Coming Soon)</div>;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <CRMProvider>
      <div className="flex h-screen bg-dark-950">
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-200 ${
            isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleMobileSidebar}
        />
        
        <div 
          className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            toggleMobileSidebar={toggleMobileSidebar} 
            isMobileSidebarOpen={isMobileSidebarOpen} 
          />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-950">
            {renderContent()}
          </main>
        </div>
      </div>
    </CRMProvider>
  );
}

export default App;