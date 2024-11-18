
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { useFetchItems } from './features/items/itemsApi';
import SingleItemPage from './pages/SingleItemPage';
import './App.css'

interface RoomType {
  name: string;
  description: string;
  pricings: {
    id: number;
    price: number;
    mealOption: { plan: string };
  }[];
  roomTypeImages: { images: { url: string } }[]; 
}

interface Room {
  roomTypes: RoomType; 
}

interface Property {
  id: number;
  name: string;
  description: string;
  address: {
    street: string;
    town: string;
    county: string;
    country: string;
  };
  propertyImages: { images: { url: string } }[];
  rooms: Room[]; 
}



interface RoomType {
  name: string;
  description: string;
  pricings: {
    id: number;
    price: number;
    mealOption: { plan: string };
  }[];
  roomTypeImages: { images: { url: string } }[];
}

interface Room {
  roomTypes: RoomType;
}

interface Property {
  id: number;
  name: string;
  description: string;
  address: {
    street: string;
    town: string;
    county: string;
    country: string;
  };
  propertyImages: { images: { url: string } }[];
  rooms: Room[]; // Correctly specify the rooms type
}

function PropertyList() {
  const { data: response, isLoading, error } = useFetchItems();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const properties = response || [];

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map((property: Property) => (
          <li key={property.id} style={{ marginBottom: '20px' }}>
            <h2>
              <Link to={`/property/${property.id}`}>{property.name}</Link>
            </h2>
            <p>{property.description}</p>
            <p>
              Address: {property.address.street}, {property.address.town}, {property.address.county}, {property.address.country}
            </p>
            <div>
              <h3>Images</h3>
              {property.propertyImages.map((img, index) => (
                <img
                  key={index}
                  src={img.images.url}
                  alt={`Property ${property.name}`}
                  style={{ width: '150px', marginRight: '10px' }}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/property/:itemId" element={<SingleItemPageWrapper />} />
      </Routes>
    </Router>
  );
}

function SingleItemPageWrapper() {
  const { itemId } = useParams();
  return <SingleItemPage itemId={Number(itemId)} />;
}

export default App;
