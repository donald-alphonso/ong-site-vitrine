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
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="App relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
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
                      whatsappNumber="+2290196632283"
                      facebookUrl="https://facebook.com/votrepage"
                    />
                  </>
                }
              />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/godshand-backoffice" element={<Login />} />
              <Route 
                path="/blog/:id" 
                element={
                  <>
                    <Header />
                    <BlogPost />
                    <Footer />
                    <SocialButtons 
                      whatsappNumber="+229 0196632283"
                      facebookUrl="https://facebook.com/votrepage"
                    />
                  </>
                } 
              />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
