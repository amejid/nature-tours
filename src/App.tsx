import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import { Route, Routes } from 'react-router-dom';
import TourDetails from './pages/TourDetails';

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
