import React, { useState, useEffect,useContext } from 'react';
import { LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import ReviewModeration from './ReviewModeration';
import Announcements from './Announcements';
import Analytics from './Analytics';
import { useNavigate ,Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import img from "../../assets/musafir-high-resolution-logo-transparent.png"


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated ,setIsAdmin, isAdmin } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('reviews');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  useEffect(() => {
            // Check token on mount to sync authentication state
            const token = localStorage.getItem('token');
            if (token && !isAuthenticated) {
                setIsAuthenticated(true);
            }
    // Show welcome toast on first render
  }, []);

  const handleLogout = () => {
                setIsAuthenticated(false);
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                setIsAuthenticated(false);
                setIsAdmin(false);
                navigate('/');
                setTimeout(() => {   toast.info("Logged out successfully", {
                  description: "You have been logged out of the admin panel.",
                }); }, 1000);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'reviews':
        return <ReviewModeration />;
      case 'announcements':
        return <Announcements />;
      case 'analytics':
        return <Analytics />;
      default:
        return <ReviewModeration />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={img} alt="Musafir" className="h-8" />
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <div className="relative">
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    
                    {notifications.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification, index) => (
                          <div 
                            key={notification.id} 
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                              index < unreadCount ? 'bg-blue-50' : ''
                            }`}
                          >
                            <p className="font-medium text-sm">{notification.title}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <p>No notifications</p>
                      </div>
                    )}
                    
                    <div className="px-4 py-2 border-t border-gray-100 text-center">
                      <button className="text-sm text-primary hover:text-blue-700 transition-colors">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-1.5 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
