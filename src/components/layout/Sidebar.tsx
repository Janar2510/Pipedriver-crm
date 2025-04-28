import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  active = false, 
  onClick,
  collapsed = false 
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} w-full px-3 py-2 rounded-md transition-colors border ${
          active 
            ? 'bg-primary-900/50 text-primary-50 border-primary-500/50'
            : 'text-primary-100 hover:bg-dark-800/50 hover:text-white border-transparent hover:border-dark-700/50'
        }`}
        title={collapsed ? label : undefined}
      >
        <span className={active ? 'text-primary-300' : 'text-primary-300'}>{icon}</span>
        {!collapsed && <span className="font-medium">{label}</span>}
      </button>
    </li>
  );
};

interface SidebarProps {
  activeRoute: string;
  setActiveRoute: (route: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute, setActiveRoute }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'w-20' : 'w-60'} h-screen flex flex-col transition-all duration-300`}>
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-3xl font-bold text-primary-50">
            Pipedriver
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-dark-800/50 text-primary-300 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <ul className="space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeRoute === 'dashboard'}
            onClick={() => setActiveRoute('dashboard')}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Users size={20} />}
            label="Contacts"
            active={activeRoute === 'contacts'}
            onClick={() => setActiveRoute('contacts')}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<DollarSign size={20} />}
            label="Deals"
            active={activeRoute === 'deals'}
            onClick={() => setActiveRoute('deals')}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<CheckSquare size={20} />}
            label="Tasks"
            active={activeRoute === 'tasks'}
            onClick={() => setActiveRoute('tasks')}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Calendar size={20} />}
            label="Calendar"
            active={activeRoute === 'calendar'}
            onClick={() => setActiveRoute('calendar')}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<BarChart3 size={20} />}
            label="Reports"
            active={activeRoute === 'reports'}
            onClick={() => setActiveRoute('reports')}
            collapsed={collapsed}
          />
        </ul>
        
        <div className="mt-10 pt-6 border-t border-white/10">
          <ul className="space-y-1">
            <SidebarItem
              icon={<Settings size={20} />}
              label="Settings"
              active={activeRoute === 'settings'}
              onClick={() => setActiveRoute('settings')}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<HelpCircle size={20} />}
              label="Help"
              active={activeRoute === 'help'}
              onClick={() => setActiveRoute('help')}
              collapsed={collapsed}
            />
          </ul>
        </div>
      </nav>
    </aside>
  );
};