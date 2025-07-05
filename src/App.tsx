import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserProvider from './context/UserContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import CyclePage from './pages/CyclePage';
import JournalPage from './pages/JournalPage';
import RecommendationsPage from './pages/RecommendationsPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SetupPage from './pages/SetupPage';

// CSS additions for custom colors
import './styles/customColors.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cycle" element={<CyclePage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="setup" element={<SetupPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;