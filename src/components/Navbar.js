import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🌙 Midnight Bites</Link>
      <div style={styles.links}>
        <Link to="/menu" style={styles.link}>Menu</Link>
        {user && (
          <>
            <Link to="/my-orders" style={styles.link}>My Orders</Link>
            <Link to="/account" style={styles.link}>Account</Link>
          </>
        )}
        <Link to="/cart" style={styles.cartBtn}>
          🛒 Cart {cart.length > 0 && <span style={styles.badge}>{cart.length}</span>}
        </Link>
        {user ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        ) : (
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#1a1a2e',
    padding: '16px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #2d2d4e',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#ff6b35',
    textDecoration: 'none',
  },
  links: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: '#ccc', textDecoration: 'none', fontSize: '15px' },
  cartBtn: {
    color: '#fff',
    textDecoration: 'none',
    background: '#ff6b35',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    position: 'relative',
  },
  badge: {
    background: '#fff',
    color: '#ff6b35',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '11px',
    marginLeft: '4px',
  },
  loginBtn: {
    color: '#0f0f1a',
    textDecoration: 'none',
    background: '#ff6b35',
    padding: '8px 20px',
    borderRadius: '8px',
    fontWeight: '600',
  },
  logoutBtn: {
    color: '#ccc',
    background: 'transparent',
    border: '1px solid #2d2d4e',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Navbar;