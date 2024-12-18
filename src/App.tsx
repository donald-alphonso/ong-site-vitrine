import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import './App.css';
import { Mission } from './components/Mission';
import { Programs } from './components/Programs';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';
import { Testimonials } from './components/Testimonials';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './admin/pages/Login';
import { AdminRoutes } from './admin/AdminRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <Mission />
                <Programs />
                <Testimonials />
                <Blog />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
