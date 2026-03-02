import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const hostelBlocks = ['A Block', 'B Block', 'C Block', 'D Block', 'E Block', 'F Block', 'Girls Hostel'];

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', phone: '', hostel_block: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await API.post(endpoint, form);
      login(data.user, data.token);
      navigate('/menu');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>🌙 Midnight Bites</div>
        <h2 style={styles.title}>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <>
              <input
                style={styles.input}
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <select
                style={styles.input}
                name="hostel_block"
                value={form.hostel_block}
                onChange={handleChange}
                required
              >
                <option value="">Select Hostel Block</option>
                {hostelBlocks.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </>
          )}
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p style={styles.toggle}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#0f0f1a',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
  },
  logo: { fontSize: '24px', fontWeight: '800', color: '#ff6b35', textAlign: 'center', marginBottom: '8px' },
  title: { color: '#fff', textAlign: 'center', marginBottom: '24px', fontSize: '20px' },
  error: {
    background: 'rgba(255,59,48,0.1)',
    border: '1px solid rgba(255,59,48,0.3)',
    color: '#ff3b30',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    background: '#0f0f1a',
    border: '1px solid #2d2d4e',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '15px',
    marginBottom: '12px',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%',
    background: '#ff6b35',
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px',
  },
  toggle: { color: '#888', textAlign: 'center', marginTop: '20px', fontSize: '14px' },
  toggleLink: { color: '#ff6b35', cursor: 'pointer', fontWeight: '600' },
};

export default Login;