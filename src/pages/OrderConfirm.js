import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) return navigate('/');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.checkmark}>✅</div>
        <h1 style={styles.title}>Order Confirmed!</h1>
        <p style={styles.subtitle}>Your food is being prepared 🍗</p>

        <div style={styles.details}>
          <div style={styles.detail}>
            <span style={styles.label}>Order ID</span>
            <span style={styles.value}>{order.order_id}</span>
          </div>
          <div style={styles.detail}>
            <span style={styles.label}>Delivery Time</span>
            <span style={styles.value}>⏰ {order.delivery_time}</span>
          </div>
          <div style={styles.detail}>
            <span style={styles.label}>Status</span>
            <span style={styles.statusBadge}>✅ {order.status}</span>
          </div>
          <div style={styles.detail}>
            <span style={styles.label}>Contact</span>
            <span style={styles.value}>📞 +91 98765 43210</span>
          </div>
        </div>

        <button onClick={() => navigate('/menu')} style={styles.btn}>
          Order More Food 🍔
        </button>
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
    padding: '20px',
  },
  card: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    borderRadius: '16px',
    padding: '48px 40px',
    textAlign: 'center',
    maxWidth: '480px',
    width: '100%',
  },
  checkmark: { fontSize: '72px', marginBottom: '20px' },
  title: { color: '#fff', fontSize: '28px', fontWeight: '800', marginBottom: '8px' },
  subtitle: { color: '#888', marginBottom: '32px' },
  details: { marginBottom: '32px', textAlign: 'left' },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #2d2d4e',
  },
  label: { color: '#888', fontSize: '14px' },
  value: { color: '#fff', fontWeight: '600' },
  statusBadge: {
    background: 'rgba(52,199,89,0.1)',
    color: '#34c759',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },
  btn: {
    background: '#ff6b35',
    color: '#fff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
  },
};

export default OrderConfirm;