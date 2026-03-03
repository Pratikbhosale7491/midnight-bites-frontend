import { useState, useEffect } from 'react';
import axios from '../api/axios';

const statusColors = {
  confirmed: '#ff6b35',
  preparing: '#007aff',
  delivered: '#34c759',
  cancelled: '#ff3b30',
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/orders/my-orders')
      .then(res => { setOrders(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 My Orders</h1>

      {/* Filter tabs */}
      <div style={styles.tabs}>
        {['all', 'confirmed', 'preparing', 'delivered', 'cancelled'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={filter === tab ? styles.activeTab : styles.tab}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={styles.empty}>Loading... 🌙</div>
      ) : filtered.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: '48px' }}>🌙</p>
          <p>No orders found</p>
          <a href="/menu" style={styles.orderBtn}>Order Now</a>
        </div>
      ) : (
        <div style={styles.list}>
          {filtered.map(order => (
            <div key={order.order_id} style={styles.card}>
              {/* Order Header */}
              <div style={styles.cardHeader}>
                <div>
                  <p style={styles.orderId}>#{order.order_id}</p>
                  <p style={styles.orderDate}>
                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  background: `${statusColors[order.status]}20`,
                  color: statusColors[order.status],
                  border: `1px solid ${statusColors[order.status]}40`
                }}>
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div style={styles.items}>
                {(typeof order.items === 'string' ? JSON.parse(order.items) : order.items)
                  .map((item, i) => (
                    <div key={i} style={styles.item}>
                      <span style={styles.itemName}>
                        {item.name} × {item.quantity}
                      </span>
                      <span style={styles.itemPrice}>
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Order Footer */}
              <div style={styles.cardFooter}>
                <div style={styles.footerInfo}>
                  <span style={styles.footerItem}>⏰ {order.delivery_time}</span>
                  <span style={styles.footerItem}>💳 {order.payment_method}</span>
                </div>
                <div style={styles.total}>
                  Total: <span style={styles.totalAmount}>₹{order.total_amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '24px 16px',
    maxWidth: '700px',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#0f0f1a',
    color: '#fff',
  },
  title: { fontSize: '24px', fontWeight: '800', marginBottom: '20px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' },
  tab: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    color: '#888',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  activeTab: {
    background: '#ff6b35',
    border: '1px solid #ff6b35',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '700',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: '80px',
    fontSize: '16px',
  },
  orderBtn: {
    display: 'inline-block',
    marginTop: '16px',
    background: '#ff6b35',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '700',
  },
  list: { display: 'flex', flexDirection: 'column', gap: '16px' },
  card: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #2d2d4e',
  },
  orderId: { color: '#ff6b35', fontWeight: '700', fontSize: '14px', marginBottom: '4px' },
  orderDate: { color: '#888', fontSize: '12px' },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  items: { padding: '16px', borderBottom: '1px solid #2d2d4e' },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px',
  },
  itemName: { color: '#ccc' },
  itemPrice: { color: '#fff', fontWeight: '600' },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
  },
  footerInfo: { display: 'flex', gap: '16px' },
  footerItem: { color: '#888', fontSize: '13px' },
  total: { color: '#888', fontSize: '14px' },
  totalAmount: { color: '#34c759', fontWeight: '800', fontSize: '16px' },
};

export default MyOrders;