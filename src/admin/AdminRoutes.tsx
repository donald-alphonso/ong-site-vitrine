import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from '../routes/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';
import Dashboard from './pages/Dashboard';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
