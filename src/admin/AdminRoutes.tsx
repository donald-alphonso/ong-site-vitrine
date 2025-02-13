import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from '../routes/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import UserTable from './components/UserTable';
import  ContactTable  from './components/ContactTable';

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
      <Route
        path="users"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <UserTable />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="contacts"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout>
              <ContactTable />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}
