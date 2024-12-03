import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import './App.css';
import { Mission } from './components/Mission';
import { Programs } from './components/Programs';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Mission />
      <Programs />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
