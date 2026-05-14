import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Citizens from '../pages/Citizens/Citizens';
import CitizenDetails from '../pages/CitizenDetails/CitizenDetails';
import AIAnalysis from '../pages/AIAnalysis/AIAnalysis';
import CallCenter from '../pages/CallCenter/CallCenter';
import Users from '../pages/Users/Users';
import Reports from '../pages/Reports/Reports';
import Login from '../pages/Login/Login';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission) {
    const hasPermission = 
      user?.role === 'Administrator' || 
      user?.permissions?.includes(requiredPermission);
    
    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
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
        <Route 
          path="/citizens" 
          element={
            <ProtectedRoute requiredPermission="Tahrirlash">
              <Citizens />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/citizens/:id" 
          element={
            <ProtectedRoute requiredPermission="Tahrirlash">
              <CitizenDetails />
            </ProtectedRoute>
          } 
        />
        <Route path="/ai-analysis" element={<AIAnalysis />} />
        <Route 
          path="/call-center" 
          element={
            <ProtectedRoute requiredPermission="Qo'ng'iroq">
              <CallCenter />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute requiredPermission="Admin">
              <Users />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute requiredPermission="Hisobotlar">
              <Reports />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
