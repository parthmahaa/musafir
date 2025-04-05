import React, { useState, useEffect, useContext } from 'react';
import { Send, Calendar, Clock, Edit, Trash2, Plus, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import {AuthContext} from '../../Context/AuthContext';
import api from '../../services/api';

const Announcements = () => {
  const {user} = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [isLoading, setIsLoading] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState({
    id: null,
    title: '',
    content: '',
    date: new Date().toISOString().slice(0, 16),
    priority: 'medium'
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await api.get('/announcement/all');
      
      if (data.success) {
        setAnnouncements(data.announcements);
      } else {
        toast.error("Failed to fetch announcements");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error.response?.data?.error || error.message);
      toast.error("Failed to fetch announcements");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentAnnouncement({
      id: null,
      title: '',
      content: '',
      date: new Date().toISOString().slice(0, 16),
      priority: 'medium'
    });
    setFormMode('create');
  };

  const handleCreateNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (announcement) => {
    setCurrentAnnouncement({
      ...announcement,
      date: new Date(announcement.date).toISOString().slice(0, 16)
    });
    setFormMode('edit');
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = formMode === 'create' ? '/announcement/create' : `/announcement/update/${currentAnnouncement._id}`;
      const method = formMode === 'create' ? 'post' : 'put';
      
      const { data } = await api[method](url, currentAnnouncement);
      
      if (data.success) {
        toast.success(`Announcement ${formMode === 'create' ? 'created' : 'updated'} successfully`);
        fetchAnnouncements();
        setShowForm(false);
        resetForm();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save announcement');
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/announcement/delete/${id}`);
      
      if (data.success) {
        setAnnouncements(announcements.filter(a => a._id !== id));
        toast.success('Announcement deleted successfully');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete announcement');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const priorityClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  if (isLoading) {
    return (
      <div className="p-6 w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full animate-fade-in">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Announcements</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage site-wide announcements
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 py-2 px-4 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Plus size={18} />
            <span>New Announcement</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 animate-fade-in">
            <h2 className="text-xl font-medium mb-4">
              {formMode === 'create' ? 'Create New Announcement' : 'Edit Announcement'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={currentAnnouncement.title}
                  onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter announcement title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  required
                  value={currentAnnouncement.content}
                  onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, content: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32"
                  placeholder="Enter announcement content"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={currentAnnouncement.date}
                    onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={currentAnnouncement.priority}
                    onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Send size={18} />
                  {formMode === 'create' ? 'Publish Announcement' : 'Update Announcement'}
                </button>
              </div>
            </form>
          </div>
        )}

        {announcements.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {announcements.map((announcement) => (
                <li 
                  key={announcement._id} 
                  className="p-5 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-lg">{announcement.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${priorityClasses[announcement.priority]}`}>
                          {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{announcement.content}</p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-3">{formatDate(announcement.date)}</span>
                        <Clock size={14} className="mr-1" />
                        <span>{formatTime(announcement.date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-2 md:mt-0">
                      <button
                        onClick={() => handleEdit(announcement._id)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(announcement._id)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Announcements</h3>
            <p className="text-gray-500 mb-4">There are no announcements currently available.</p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 py-2 px-4 bg-primary text-white rounded-lg shadow-sm hover:bg-blue-600 transition-colors"
            >
              <Plus size={18} />
              <span>Create Your First Announcement</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
