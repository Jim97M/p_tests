import React from 'react';
import { useFetchSingleItem } from '../features/items/itemsApi';
import styles from './SingleItemPage.module.css';

interface SingleItemPageProps {
  itemId: number;
}

const SingleItemPage: React.FC<SingleItemPageProps> = ({ itemId }) => {
  const { data, isLoading, isError, error } = useFetchSingleItem(itemId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message || 'Failed to load item details.'}</p>;

  // Validation: Check if `data` is null or missing required fields
  if (!data || !data.address) return <p>No valid data found for this item.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{data.name}</h1>
        <p className={styles.description}>{data.description}</p>
      </div>
      <p className={styles.address}>
        Address: {data.address.street}, {data.address.town}, {data.address.county}, {data.address.country}
      </p>
      <div className={styles.section}>
        <h3>Images</h3>
        <div className={styles.images}>
          {data.propertyImages.map((img, index) => (
            <img
              key={index}
              className={styles.image}
              src={img.images.url}
              alt={`Property ${data.name}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h3>Rooms</h3>
        {data.rooms.map((room, roomIndex) => (
          <div key={roomIndex} className={styles.room}>
            <h4 className={styles.roomTitle}>{room.roomTypes.name}</h4>
            <p className={styles.roomDescription}>{room.roomTypes.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleItemPage;

