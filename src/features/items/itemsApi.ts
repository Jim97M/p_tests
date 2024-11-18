import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import apiClient from '../../api/apiClient';

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

interface Room {
  roomTypes: RoomType;
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

export const useFetchItems = (): UseQueryResult<Property[], Error> => {
  const queryResult = useQuery({
    queryKey: ['items'],
    queryFn: async (): Promise<Property[]> => {
      const response = await apiClient.get('/search/stays/filtered');
      console.log('API Response:', response); 
      return response.data.data; 
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });

  const { data, isSuccess } = queryResult;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      console.log('Successfully fetched data:', data);
    }
  }, [isSuccess, data, dispatch]);

  return queryResult;
};

 

export const fetchSingleItem = async (id: number): Promise<Property> => {
  try {
    const response = await apiClient.get(`/search/stays/${id}`);
    console.log('Single Item API Response:', response.data); 

    const itemData = response.data.data; 

    
    if (!itemData || !itemData.address) {
      throw new Error('Invalid response: Missing required address field.');
    }

    return itemData;
  } catch (error) {
    console.error('Error fetching single item:', error);
    throw new Error('Failed to fetch item. Please try again later.');
  }
};

export const useFetchSingleItem = (id: number): UseQueryResult<Property, Error> => {
  return useQuery({
    queryKey: ['singleItem', id],
    queryFn: () => fetchSingleItem(id),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
