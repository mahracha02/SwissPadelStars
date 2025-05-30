import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Plus } from 'lucide-react';

const Users: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-dark-500 dark:text-brand-blanc">Users</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <p className="text-gray-700 dark:text-gray-300">This is the Users page. User management functionality will be implemented here.</p>
      </div>
    </div>
  );
};

export default Users; 