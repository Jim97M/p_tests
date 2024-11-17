import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { useFetchItems } from '../features/items/itemsApi'; 
import '@testing-library/jest-dom';

jest.mock('./features/items/itemsApi');

const mockProperty = {
  id: 1,
  name: 'Test Property',
  description: 'A lovely test property',
  address: {
    street: '123 Test St',
    town: 'Test Town',
    county: 'Test County',
    country: 'Test Country',
  },
  propertyImages: [{ images: { url: 'https://test.com/image.jpg' } }],
  rooms: [
    {
      roomTypes: {
        name: 'Standard Room',
        description: 'A standard room with a bed',
        pricings: [{ id: 1, price: 100, mealOption: { plan: 'Full Board' } }],
        roomTypeImages: [{ images: { url: 'https://test.com/room.jpg' } }],
      },
    },
  ],
};

describe('App', () => {
  it('renders loading state when fetching items', async () => {
    // Mock useFetchItems to simulate loading state
    (useFetchItems as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state when fetching items fails', async () => {
    // Mock useFetchItems to simulate error state
    (useFetchItems as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch items'),
    });

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Error: Failed to fetch items/i)).toBeInTheDocument();
  });

  it('renders property list correctly when data is fetched successfully', async () => {
    // Mock useFetchItems to simulate successful data fetching
    (useFetchItems as jest.Mock).mockReturnValue({
      data: { data: [mockProperty] },
      isLoading: false,
      error: null,
    });

    render(
      <Router>
        <App />
      </Router>
    );

    // Check that the property name is displayed
    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.description)).toBeInTheDocument();
    expect(screen.getByText('Address: 123 Test St, Test Town, Test County, Test Country')).toBeInTheDocument();
    expect(screen.getByAltText(`Property ${mockProperty.name}`)).toHaveAttribute('src', mockProperty.propertyImages[0].images.url);
  });

  it('navigates to the SingleItemPage when a property is clicked', async () => {
    // Mock useFetchItems to simulate successful data fetching
    (useFetchItems as jest.Mock).mockReturnValue({
      data: { data: [mockProperty] },
      isLoading: false,
      error: null,
    });

    render(
      <Router>
        <App />
      </Router>
    );

    // Click the property link to navigate to SingleItemPage
    const propertyLink = screen.getByText(mockProperty.name);
    propertyLink.click();

    // Wait for navigation to complete and check if the correct page is rendered
    await waitFor(() => screen.getByText('Single Item Page'));

    expect(screen.getByText(`Single Item Page: ${mockProperty.id}`)).toBeInTheDocument();
  });
});
