import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Citizens from '../pages/Citizens/Citizens';
import AIAnalysis from '../pages/AIAnalysis/AIAnalysis';
import CallCenter from '../pages/CallCenter/CallCenter';
import Users from '../pages/Users/Users';
import Reports from '../pages/Reports/Reports';
import Login from '../pages/Login/Login';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/citizens" element={<Citizens />} />
        <Route path="/ai-analysis" element={<AIAnalysis />} />
        <Route path="/call-center" element={<CallCenter />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
