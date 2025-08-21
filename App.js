import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import EventDetail from './Components/EventDetail';
import CreatePage from './Pages/CreatePage';
import EditEvent from './Components/EditEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditEvent />} />

      </Routes>
    </Router>
  );
}

export default App;
