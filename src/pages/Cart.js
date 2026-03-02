import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const deliverySlots = ['10:30 PM', '11:30 PM', '12:30 AM'];
const paymentMethods = ['UPI', 'Card', 'Cash on Delivery'];

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deliveryTime, setDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOrder = async () => {
    if (!user) return navigate('/login');
    if (!deliveryTime) return setError('Please select delivery time');
    if (!paymentMethod) return setError('Please select payment method');

    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/api/orders', {
        items: cart,
        delivery_time: deliveryTime,
        payment_method: paymentMethod,
        total_amount: total,
      });
      clearCart();
      navigate('/order-confirm', { state: { order: data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return (
    <div style={styles.empty}>
      <div style={styles.emptyIcon}>🛒</div>
      <h2 style={styles.emptyTitle}>Your cart is empty</h2>
      <p style={styles.emptyDesc}>Add some delicious items from our menu!</p>
      <button onClick={() => navigate('/menu')} style={styles.menuBtn}>Browse Menu</button>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Your Cart</h1>

      {/* Cart Items */}
      <div style={styles.items}>
        {cart.map(item => (
          <div key={item.id} style={styles.item}>
            <div>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemPrice}>₹{item.price} each</p>
            </div>
            <div style={styles.itemActions}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyBtn}>-</button>
              <span style={styles.qty}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyBtn}>+</button>
              <span style={styles.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Options */}
      <div style={styles.options}>
        <select style={styles.select} value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)}>
          <option value="">Select Delivery Time</option>
          {deliverySlots.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select style={styles.select} value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="">Select Payment Method</option>
          {paymentMethods.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {/* Total & Place Order */}
      <div style={styles.footer}>
        <div style={styles.total}>Total: <span style={styles.totalAmount}>₹{total.toFixed(2)}</span></div>
        <button onClick={handleOrder} style={styles.orderBtn} disabled={loading}>
          {loading ? 'Placing Order...' : '🛵 Place Order'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#0f0f1a', minHeight: '100vh', padding: '40px', color: '#fff', maxWidth: '800px', margin: '0 auto' },
  title: { fontSize: '28px', fontWeight: '800', marginBottom: '32px' },
  items: { marginBottom: '24px' },
  item: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  itemName: { fontSize: '16px', marginBottom: '4px' },
  itemPrice: { color: '#888', fontSize: '14px' },
  itemActions: { display: 'flex', alignItems: 'center', gap: '12px' },
  qtyBtn: {
    background: '#2d2d4e',
    color: '#fff',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  qty: { fontSize: '16px', fontWeight: '600', minWidth: '20px', textAlign: 'center' },
  itemTotal: { color: '#ff6b35', fontWeight: '700', fontSize: '16px' },
  removeBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
  options: { display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' },
  select: {
    flex: 1,
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    color: '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '15px',
    minWidth: '200px',
  },
  error: {
    background: 'rgba(255,59,48,0.1)',
    border: '1px solid rgba(255,59,48,0.3)',
    color: '#ff3b30',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
  total: { fontSize: '20px', color: '#fff' },
  totalAmount: { color: '#ff6b35', fontWeight: '800', fontSize: '24px' },
  orderBtn: {
    background: '#ff6b35',
    color: '#fff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  empty: { background: '#0f0f1a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' },
  emptyIcon: { fontSize: '80px', marginBottom: '20px' },
  emptyTitle: { fontSize: '24px', marginBottom: '8px' },
  emptyDesc: { color: '#888', marginBottom: '24px' },
  menuBtn: { background: '#ff6b35', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' },
};

export default Cart;