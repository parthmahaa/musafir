import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import api from '../../services/api';

const AnnouncementBadge = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasNewAnnouncements, setHasNewAnnouncements] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
    // Check for new announcements every 5 minutes
    const interval = setInterval(fetchAnnouncements, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/announcement/all');
      const data = response.data;
      
      if (data.success) {
        setAnnouncements(data.announcements);
        // Check if there are any announcements from the last 24 hours
        const hasNew = data.announcements.some(
          a => new Date(a.date) > new Date(Date.now() - 86400000)
        );
        setHasNewAnnouncements(hasNew);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-700 hover:text-orange-700"
      >
        <Bell size={20} />
        {hasNewAnnouncements && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 max-h-96 overflow-y-auto">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement._id}
                className="px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{announcement.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                    announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No announcements available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnnouncementBadge;