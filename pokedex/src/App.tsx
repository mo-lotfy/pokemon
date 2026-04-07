import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className="bg-[#f0fdf4] min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
