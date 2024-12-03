import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import './App.css';
import { Mission } from './components/Mission';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Mission />
      <Footer />
    </div>
  );
}

export default App;
