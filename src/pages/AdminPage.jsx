import Login from '../components/admin/Login.jsx';
import Dashboard from '../components/admin/Dashboard.jsx';

export default function AdminPage({ isAuthenticated, onLogin, onLogout }) {
  if (!isAuthenticated) {
    return <Login onLogin={onLogin} />;
  }

  return <Dashboard onLogout={onLogout} />;
}