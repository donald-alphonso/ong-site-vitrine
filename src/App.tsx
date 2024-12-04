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

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Mission />
      <Programs />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
