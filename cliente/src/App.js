// cliente/src/App.js
import React from 'react';
import Header from './components/Header';
import ParkingGrid from './components/ParkingGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ParkingGrid />
      </main>
    </div>
  );
}

export default App;