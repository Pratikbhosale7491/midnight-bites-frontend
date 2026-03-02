import { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import API from '../api/axios';

const categories = ['all', 'biryani', 'fastfood', 'rolls', 'snacks', 'drinks'];

const Menu = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/menu')
      .then(res => {
        setItems(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filterCategory = (cat) => {
    setActiveCategory(cat);
    setFiltered(cat === 'all' ? items : items.filter(i => i.category === cat));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ Our Menu</h1>
      <p style={styles.subtitle}>Fresh & Hot — Available till 1:00 AM</p>

      {/* Category Filter */}
      <div style={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => filterCategory(cat)}
            style={activeCategory === cat ? styles.activeCat : styles.cat}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {loading ? (
        <div style={styles.loading}>Loading menu... 🍗</div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(item => <FoodCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { background: '#0f0f1a', minHeight: '100vh', padding: '40px', color: '#fff' },
  title: { fontSize: '32px', fontWeight: '800', marginBottom: '8px' },
  subtitle: { color: '#888', marginBottom: '32px' },
  categories: { display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' },
  cat: {
    background: '#1a1a2e',
    color: '#888',
    border: '1px solid #2d2d4e',
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  activeCat: {
    background: '#ff6b35',
    color: '#fff',
    border: '1px solid #ff6b35',
    padding: '8px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px',
  },
  loading: { textAlign: 'center', color: '#888', fontSize: '18px', marginTop: '60px' },
};

export default Menu;