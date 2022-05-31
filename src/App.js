import React, { useEffect, useState } from 'react';
import './App.css';
import List from './Components/List';

function App() {

  return (
    <div className='App'>
      <div className='repo-container'>
        <List/>
      </div>
    </div>
  );
}
export default App;