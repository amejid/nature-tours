import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import { Route, Routes } from 'react-router-dom';
import TourDetails from './pages/TourDetails';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';

export const remoteImg = 'http://localhost:5000/img';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
