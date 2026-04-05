import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.badge}>🌙 Open 10:30 PM - 1:00 AM</div>
        <h1 style={styles.title}>
          Hot HAHAHAHA Food Delivered to<br />
          <span style={styles.accent}>Your Hostel</span> at Night
        </h1>
        <p style={styles.subtitle}>
          Biryani, Burgers, Rolls & More — Delivered straight to your hostel block
        </p>
        <div style={styles.buttons}>
          <Link to="/menu" style={styles.primaryBtn}>🍗 Order Now</Link>
          <Link to="/login" style={styles.secondaryBtn}>Login / Register</Link>
        </div>

        {/* Time Slots */}
        <div style={styles.slots}>
          <p style={styles.slotsTitle}>Available Delivery Slots:</p>
          <div style={styles.slotsList}>
            {['10:30 PM', '11:30 PM', '12:30 AM'].map(slot => (
              <span key={slot} style={styles.slot}>⏰ {slot}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div style={styles.featured}>
        <h2 style={styles.sectionTitle}>🔥 Most Ordered Tonight</h2>
        <div style={styles.featuredGrid}>
          {featuredItems.map(item => (
            <div key={item.name} style={styles.featuredCard}>
              <div style={styles.featuredEmoji}>{item.emoji}</div>
              <h3 style={styles.featuredName}>{item.name}</h3>
              <p style={styles.featuredPrice}>₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} style={styles.step}>
              <div style={styles.stepIcon}>{step.icon}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={styles.contact}>
        <p>📞 Call us: <strong style={styles.accent}>+91 98765 43210</strong></p>
        <p>📍 Serving: University Campus Hostels</p>
      </div>
    </div>
  );
};

const featuredItems = [
  { emoji: '🍗', name: 'Chicken Biryani', price: 149 },
  { emoji: '🍔', name: 'Chicken Burger', price: 89 },
  { emoji: '🌯', name: 'Chicken Roll', price: 89 },
  { emoji: '🍜', name: 'Maggi', price: 39 },
];

const steps = [
  { icon: '📱', title: 'Browse Menu', desc: 'Check out our late night menu' },
  { icon: '🛒', title: 'Add to Cart', desc: 'Select your favourite items' },
  { icon: '💳', title: 'Pay & Order', desc: 'UPI, Card or Cash on Delivery' },
  { icon: '🛵', title: 'Get Delivery', desc: 'Hot food at your hostel door' },
];

const styles = {
  container: { background: '#0f0f1a', minHeight: '100vh', color: '#fff' },
  hero: {
    textAlign: 'center',
    padding: '80px 20px 60px',
    background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,107,53,0.15)',
    border: '1px solid #ff6b35',
    color: '#ff6b35',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    marginBottom: '24px',
  },
  title: { fontSize: '48px', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px' },
  accent: { color: '#ff6b35' },
  subtitle: { fontSize: '18px', color: '#888', marginBottom: '40px' },
  buttons: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' },
  primaryBtn: {
    background: '#ff6b35',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '8px',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '16px',
  },
  secondaryBtn: {
    background: 'transparent',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    fontSize: '16px',
    border: '1px solid #2d2d4e',
  },
  slots: { marginTop: '20px' },
  slotsTitle: { color: '#888', marginBottom: '12px' },
  slotsList: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  slot: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
  },
  featured: { padding: '60px 40px', borderTop: '1px solid #1a1a2e' },
  sectionTitle: { fontSize: '28px', fontWeight: '700', marginBottom: '32px', textAlign: 'center' },
  featuredGrid: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' },
  featuredCard: {
    background: '#1a1a2e',
    border: '1px solid #2d2d4e',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    width: '160px',
  },
  featuredEmoji: { fontSize: '40px', marginBottom: '12px' },
  featuredName: { fontSize: '14px', marginBottom: '8px' },
  featuredPrice: { color: '#ff6b35', fontWeight: '700', fontSize: '18px' },
  howItWorks: { padding: '60px 40px', borderTop: '1px solid #1a1a2e' },
  steps: { display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' },
  step: { textAlign: 'center', width: '200px' },
  stepIcon: { fontSize: '40px', marginBottom: '12px' },
  stepTitle: { fontSize: '16px', marginBottom: '8px' },
  stepDesc: { color: '#888', fontSize: '14px' },
  contact: {
    textAlign: 'center',
    padding: '40px',
    borderTop: '1px solid #1a1a2e',
    color: '#888',
    lineHeight: '2',
  },
};

export default Landing;