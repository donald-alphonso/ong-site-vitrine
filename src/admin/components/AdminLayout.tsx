import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import api from '../../utils/api';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token to logout');
      return;
    }

    const decodedToken: any = jwtDecode(token);

    try {
      const response = await api.patch(`/auth/logout/${decodedToken.userId}`);
      console.log(response);
      logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-red-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-red-900">
            <h1 className="text-white text-xl font-bold">Administration</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center px-4 py-2 text-white hover:bg-red-700 rounded-lg"
            >
              <span className="mr-3">📊</span>
              Tableau de bord
            </Link>
            <Link
              to="/admin/contacts"
              className="flex items-center px-4 py-2 text-white hover:bg-red-700 rounded-lg"
            >
              <span className="mr-3">📧</span>
              Contacts
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center px-4 py-2 text-white hover:bg-red-700 rounded-lg"
            >
              <span className="mr-3">👤</span>
              Utilisateurs
            </Link>
            <Link
              to="/admin/missions"
              className="flex items-center px-4 py-2 text-white hover:bg-red-700 rounded-lg"
            >
              <span className="mr-3">🎯</span>
              Missions
            </Link>
            <Link
              to="/admin/programs"
              className="flex items-center px-4 py-2 text-white hover:bg-red-700 rounded-lg"
            >
              <span className="mr-3">📚</span>
              Programmes
            </Link>
            <Link
              to="/admin/testimonials"
              className="flex items-center px-4 py-2 text-white hover:bg-red-700 rounded-lg"
            >
              <span className="mr-3">💬</span>
              Témoignages
            </Link>
            <Link
              to="/admin/news"
              className="flex items-center px-4 py-2 text-white hover:bg-red-700 rounded-lg"
            >
              <span className="mr-3">📰</span>
              Actualités
            </Link>
          </nav>

          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-white hover:bg-red-700 rounded-lg"
            >
              <span className="mr-3">🚪</span>
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Espace Administration
              </h2>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
