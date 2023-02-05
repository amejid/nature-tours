import TourItem from '../components/TourItem';
import { useEffect, useState } from 'react';
import axios from 'axios';

type StartLocation = {
  address: string;
  description: string;
  type: string;
  coordinates: number[];
};

type Location = {
  day: number;
  description: string;
  type: string;
  _id: string;
  coordinates: number[];
};

type TourGuide = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
};

export type Tour = {
  id: string;
  description: string;
  difficulty: string;
  duration: number;
  durationWeeks: number;
  imageCover: string;
  images: string[];
  maxGroupSize: number;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  secretTour: boolean;
  startDates: string[];
  startLocation: StartLocation;
  summary: string;
  locations: Location[];
  guides: TourGuide[];
};

const Overview = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      const { data } = await axios.get('http://localhost:5000/api/v1/tours');
      console.log(data.data.data);
      setTours(data.data.data);
    };

    fetchTours();
  }, []);

  return (
    <main className="main">
      <div className="card-container">
        {tours &&
          tours.map((tourItem) => (
            <TourItem key={tourItem.id} tour={tourItem} />
          ))}
      </div>
    </main>
  );
};

export default Overview;
