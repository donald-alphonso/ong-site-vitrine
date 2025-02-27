import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import './App.css';
import './styles/globals.css';
import { Mission } from './components/Mission';
import { Programs } from './components/Programs';
import { Contact } from './components/Contact';
import { Gallery } from './components/Gallery';
import { Blog } from './components/Blog';
import { Testimonials } from './components/Testimonials';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './admin/pages/Login';
import AdminRoutes from './admin/AdminRoutes';
import BlogPost from './components/BlogPost';
import { SocialButtons } from './components/SocialButtons';

function App() {
  return (
    <Router>
      <div className="App relative">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <Mission />
                <Programs />
                <Gallery />
                <Testimonials />
                <Blog />
                <Contact />
                <Footer />
                <SocialButtons 
                  whatsappNumber="22891234567"
                  facebookUrl="https://facebook.com/votrepage"
                />
              </>
            }
          />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/blog/:id" 
            element={
              <>
                <Header />
                <BlogPost />
                <Footer />
                <SocialButtons 
                  whatsappNumber="22891234567"
                  facebookUrl="https://facebook.com/votrepage"
                />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
