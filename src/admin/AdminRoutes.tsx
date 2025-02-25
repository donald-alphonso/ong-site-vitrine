import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import ContactsPage from './pages/ContactsPage';
import UsersPage from './pages/UsersPage';
import MissionsPage from './pages/MissionsPage';
import ProgramsPage from './pages/ProgramsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import NewsPage from './pages/NewsPage';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return <div>Chargement...</div>; // Ou votre composant de chargement personnalisé
  }

  if (!isAuthenticated) {
    // Sauvegarder l'URL actuelle avant la redirection
    const currentPath = window.location.pathname;
    sessionStorage.setItem('redirectPath', currentPath);
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/missions"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MissionsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/programs"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProgramsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/testimonials"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <TestimonialsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <NewsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ContactsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;
