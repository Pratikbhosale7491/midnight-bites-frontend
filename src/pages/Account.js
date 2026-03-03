import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/auth/me')
      .then(res => { setUser(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return (
    <div style={{ ...styles.container, textAlign: 'center', paddingTop: '100px' }}>
      Loading... 🌙
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👤 My Account</h1>

      {/* Profile Card */}
      <div style={styles.card}>
        <div style={styles.avatar}>
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <h2 style={styles.email}>{user?.email}</h2>
        <p style={styles.joined}>
          Member since {new Date(user?.created_at).toLocaleDateString('en-IN', {
            month: 'long', year: 'numeric'
          })}
        </p>
      </div>

      {/* Details Card */}
      <div style={styles.detailsCard}>
        <h3 style={styles.sectionTitle}>Profile Details</h3>

        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>📧 Email</span>
          <span style={styles.detailValue}>{user?.email}</span>
        </div>
        <div style={styles.divider} />

        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>📞 Phone</span>
          <span style={styles.detailValue}>{user?.phone}</span>
        </div>
        <div style={styles.divider} />

        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>🏠 Hostel Block</span>
          <span style={styles.detailValue}>{user?.hostel_block}</span>
        </div>
      </div>

      {/* Quick Links */}
      <div style={styles.detailsCard}>
        <h3 style={styles.sectionTitle}>Quick Links</h3>
        <button
          onClick={() => navigate('/my-orders')}
          style={styles.linkBtn}
        >
          🛒 My Orders
          <span style={styles.arrow}>→</span>
        </button>
        <div style={styles.divider} />
        <button
          onClick={() => navigate('/menu')}
          style={styles.linkBtn}
        >
          🍽️ Browse Menu
          <span style={styles.arrow}>→</span>
        </button>
      </div>

      {/* Logout */}
      <button onClick={handleLogout} style={styles.logoutBtn}>
        🚪 Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px 16px',
    maxWidth: '500px',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#0f0f1a',
    color: '#fff',
  },
  title: { fontSize: '24px', fontWeight: '800', marginBottom: '20px' },
  card: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    borderRadius: '16px',
    padding: '32px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  avatar: {
    width: '72px',
    height: '72px',
    background: '#ff6b35',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: '800',
    margin: '0 auto 16px',
  },
  email: { fontSize: '18px', fontWeight: '700', marginBottom: '8px' },
  joined: { color: '#888', fontSize: '13px' },
  detailsCard: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
  detailLabel: { color: '#888', fontSize: '14px' },
  detailValue: { color: '#fff', fontSize: '14px', fontWeight: '600' },
  divider: { height: '1px', background: '#2d2d4e', margin: '8px 0' },
  linkBtn: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '15px',
    padding: '10px 0',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
  },
  arrow: { color: '#888' },
  logoutBtn: {
    width: '100%',
    background: 'rgba(255,59,48,0.1)',
    border: '1px solid rgba(255,59,48,0.3)',
    color: '#ff3b30',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px',
  },
};

export default Account;