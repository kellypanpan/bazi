import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Readings from './pages/Readings';
import About from './pages/About';
import Subscription from './pages/Subscription';
import ZodiacPage from './pages/ZodiacPage';
import ComprehensiveZodiacPage from './pages/ComprehensiveZodiacPage';
import CompatibilityPage from './pages/CompatibilityPage';
import ZiWeiPage from './pages/ZiWeiPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/readings" element={<Readings />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscription" element={<Subscription />} />
          
          {/* Zodiac Routes */}
          <Route path="/zodiac/:sign" element={<ComprehensiveZodiacPage />} />
          <Route path="/compatibility" element={<CompatibilityPage />} />
          
          {/* Zi Wei Dou Shu Route */}
          <Route path="/zi-wei" element={<ZiWeiPage />} />
          
          {/* SEO-friendly zodiac sign routes */}
          <Route path="/aries" element={<ComprehensiveZodiacPage />} />
          <Route path="/taurus" element={<ComprehensiveZodiacPage />} />
          <Route path="/gemini" element={<ComprehensiveZodiacPage />} />
          <Route path="/cancer" element={<ComprehensiveZodiacPage />} />
          <Route path="/leo" element={<ComprehensiveZodiacPage />} />
          <Route path="/virgo" element={<ComprehensiveZodiacPage />} />
          <Route path="/libra" element={<ComprehensiveZodiacPage />} />
          <Route path="/scorpio" element={<ComprehensiveZodiacPage />} />
          <Route path="/sagittarius" element={<ComprehensiveZodiacPage />} />
          <Route path="/capricorn" element={<ComprehensiveZodiacPage />} />
          <Route path="/aquarius" element={<ComprehensiveZodiacPage />} />
          <Route path="/pisces" element={<ComprehensiveZodiacPage />} />
          
          {/* Legacy simple zodiac page */}
          <Route path="/simple-zodiac/:sign" element={<ZodiacPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;