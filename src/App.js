import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ItemComponent from './components/ItemComponent';
import ItemView from './components/ItemView';

const App = () => {
  return (
    <Router>       
      <Routes>
        <Route path="/" element={<ItemComponent />} />
        <Route path="/edit/:_id" element={<ItemView />} />
        </Routes> 
    </Router>
  )
}

export default App;
