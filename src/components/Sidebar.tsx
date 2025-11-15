import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ShoppingCart,
  Package,
  Zap,
  Users,
  MapPin,
  Menu,
  X,
  Wheat,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/sales', label: 'Ventas B2B', icon: ShoppingCart },
  { path: '/operations', label: 'Operaciones', icon: Package },
  { path: '/production', label: 'Producción', icon: Zap },
  { path: '/hr', label: 'Recursos Humanos', icon: Users },
  { path: '/logistics', label: 'Logística', icon: MapPin },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-amber-800 to-amber-900 text-white transition-transform duration-300 z-50 lg:z-30 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-amber-700">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Wheat size={28} />
            <span className="font-bold text-lg">Don Mamino</span>
          </Link>
          <button onClick={onClose} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                location.pathname.startsWith(item.path)
                  ? 'bg-amber-700 text-white'
                  : 'text-amber-100 hover:bg-amber-700 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-amber-100 hover:bg-red-600 hover:text-white transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <Menu size={24} className="text-gray-700" />
    </button>
  );
}
