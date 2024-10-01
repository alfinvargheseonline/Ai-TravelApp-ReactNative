import { View, Text } from 'react-native';
import React from 'react';
import UserTripCard from './UserTripCard';


export default function UserTrip({ userTrips }) {
  if (!userTrips || userTrips.length === 0) {
    return (
      <View>
        <Text>No trips available.</Text>
      </View>
    );
  }

  return (
    <View>
      {userTrips.map((trip, index) => {
        if (!trip || !trip.tripData) {
          return null;
        }

        return (
          <UserTripCard
            trip={trip} 
            key={index} 
          />
        );
      })}
    </View>
  );
}
