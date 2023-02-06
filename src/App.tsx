import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import { Route, Routes } from 'react-router-dom';
import TourDetails from './pages/TourDetails';

export const remoteImg = 'http://localhost:5000/img';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/tour/:id" element={<TourDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
