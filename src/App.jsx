import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomeVariantProvider } from './context/HomeVariantProvider';
import HomeGate from './pages/HomeGate';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HomeVariantProvider>
      <div className="theme-warm min-h-screen bg-[var(--color-base)] transition-colors duration-1000">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeGate />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </HomeVariantProvider>
  );
}
