import { useCart } from '../context/CartContext';

const FoodCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img 
          src={item.image_url} 
          alt={item.name} 
          style={styles.image}
          onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Food'}
        />
        <span style={styles.badge}>
          {item.is_available ? '✅ Available' : '❌ Unavailable'}
        </span>
      </div>
      <div style={styles.content}>
        <h3 style={styles.name}>{item.name}</h3>
        <p style={styles.desc}>{item.description}</p>
        <div style={styles.footer}>
          <span style={styles.price}>₹{item.price}</span>
          <button 
            onClick={() => addToCart(item)}
            disabled={!item.is_available}
            style={item.is_available ? styles.addBtn : styles.disabledBtn}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#1a1a2e',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #2d2d4e',
    transition: 'transform 0.2s',
  },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: '180px', objectFit: 'cover' },
  badge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'rgba(0,0,0,0.7)',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    color: '#fff',
  },
  content: { padding: '16px' },
  name: { color: '#fff', fontSize: '16px', marginBottom: '6px' },
  desc: { color: '#888', fontSize: '13px', marginBottom: '12px', lineHeight: '1.5' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: '#ff6b35', fontSize: '18px', fontWeight: '700' },
  addBtn: {
    background: '#ff6b35',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  disabledBtn: {
    background: '#333',
    color: '#666',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'not-allowed',
  },
};

export default FoodCard;