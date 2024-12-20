import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Navbar } from './components';
import { Cart, LoginSignup, Product, Shop, ShopCategory } from './pages';
import images from './Assets/Frontend_Assets';
import RatingReview from './pages/RatingReview';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory category='men' banner={images.mens_banner} />} />
          <Route path='/women' element={<ShopCategory category='women' banner={images.womens_banner} />} />
          <Route path='/kids' element={<ShopCategory category='kids' banner={images.kids_banner} />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/product/:productId/review' element={<RatingReview />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
