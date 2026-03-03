import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderConfirm from './pages/OrderConfirm';
import MyOrders from './pages/MyOrders';
import Account from './pages/Account';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirm" element={<OrderConfirm />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;