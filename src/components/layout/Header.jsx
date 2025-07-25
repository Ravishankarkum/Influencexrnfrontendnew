import { Bell, LogOut, Menu, User, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header({ isSidebarOpen, toggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            {user?.userType === 'brand' ? 'Brand Dashboard' : ''}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.userType}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}