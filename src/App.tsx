import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Readings from './pages/Readings';
import About from './pages/About';
import Subscription from './pages/Subscription';
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;