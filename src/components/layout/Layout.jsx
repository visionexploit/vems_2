import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiBook, FiFileText, FiDollarSign, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/', icon: FiHome },
    { name: 'Applications', path: '/applications', icon: FiFileText },
    { name: 'Students', path: '/students', icon: FiUsers },
    { name: 'Universities', path: '/universities', icon: FiBook },
    { name: 'Payments', path: '/payments', icon: FiDollarSign },
    { name: 'Reports', path: '/reports', icon: FiBarChart2 },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#011ff3] bg-opacity-5">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-4 bg-[#011ff3]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#011ff3]" />
              </div>
              <span className="text-xl font-semibold text-white">VEMS</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                  isActive(item.path)
                    ? 'bg-[#011ff3] text-white'
                    : 'text-gray-600 hover:bg-[#011ff3] hover:bg-opacity-10 hover:text-[#011ff3]'
                }`}
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-[#011ff3] hover:bg-opacity-10 hover:text-[#011ff3]"
            >
              <FiLogOut className="mr-3 h-6 w-6" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 bg-[#011ff3]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#011ff3]" />
              </div>
              <span className="text-xl font-semibold text-white">VEMS</span>
            </div>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                  isActive(item.path)
                    ? 'bg-[#011ff3] text-white'
                    : 'text-gray-600 hover:bg-[#011ff3] hover:bg-opacity-10 hover:text-[#011ff3]'
                }`}
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-[#011ff3] hover:bg-opacity-10 hover:text-[#011ff3]"
            >
              <FiLogOut className="mr-3 h-6 w-6" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 flex items-center h-16 px-4 bg-white border-b border-gray-200 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-[#011ff3]"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2 ml-4">
            <div className="w-8 h-8 bg-[#011ff3] rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-[#011ff3]">VEMS</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
