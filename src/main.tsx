
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import XlinkCatch from './components/XlinkCatch.tsx';
import { BrowserRouter, Routes, Route } from "react-router";
import { initAnalytics } from './analytics';

// Initialize Google Analytics
initAnalytics();

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/*" element={<XlinkCatch />}></Route>
    </Routes>
    </BrowserRouter>
    
)
