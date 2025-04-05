import React, { useState } from 'react';
import { MessageSquare, BarChart2, Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'reviews', label: 'Moderate Reviews', icon: <MessageSquare size={20} /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={`h-screen bg-sidebar transition-all duration-300 ease-in-out relative ${
        collapsed ? 'w-20' : 'w-64'
      } border-r border-sidebar-border shadow-sm`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h2 className="text-xl font-semibold text-sidebar-foreground animate-fade-in">
              Admin Panel
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-sidebar-accent transition-colors duration-200"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-orange-400 text-sidebar-primary-foreground font-medium shadow-md'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="ml-3 transition-opacity duration-200">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
