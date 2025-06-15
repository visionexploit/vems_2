import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      language: 'en'
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30
    }
  });

  const handleNotificationChange = (type) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
    toast.success(`${type} notifications updated`);
  };

  const handleAppearanceChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [type]: value
      }
    }));
    toast.success(`${type} updated to ${value}`);
  };

  const handleSecurityChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [type]: value
      }
    }));
    toast.success(`${type} updated`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>SMS Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.sms}
                onChange={() => handleNotificationChange('sms')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <select
              className="border rounded-md px-3 py-2"
              value={settings.appearance.theme}
              onChange={(e) => handleAppearanceChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Font Size</span>
            <select
              className="border rounded-md px-3 py-2"
              value={settings.appearance.fontSize}
              onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Language</span>
            <select
              className="border rounded-md px-3 py-2"
              value={settings.appearance.language}
              onChange={(e) => handleAppearanceChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Two-Factor Authentication</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.security.twoFactor}
                onChange={(e) => handleSecurityChange('twoFactor', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Session Timeout (minutes)</span>
            <select
              className="border rounded-md px-3 py-2"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="120">120</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
