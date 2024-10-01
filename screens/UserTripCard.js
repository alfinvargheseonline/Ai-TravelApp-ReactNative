import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from "../constants/Colors"; // Import colors if necessary

export default function UserTripCard({ trip }) {
  const navigation = useNavigation(); // Get the navigation object from the hook

  // Extract necessary data from the trip object
  const locationName = trip.tripData?.locationInfo?.name || "Location not available";
  const startDate = trip.tripData?.startDate 
    ? new Date(trip.tripData.startDate.seconds * 1000).toLocaleDateString() 
    : "Date not available";
  const travelerCount = trip.tripData?.travelerCount?.title || "Traveler info not available";
  const budget = trip.tripData?.budget || "Budget not available";
  const photoUrl = trip.tripData?.locationInfo?.photoRef || null; // URL from Firebase for the image

  return (
    <ScrollView>
    <TouchableOpacity onPress={() => navigation.navigate('TripDetail', { trip })}
    style={{
      padding: 10,
          display: 'flex',
          marginTop: 20,
          justifyContent: 'space-between',
          backgroundColor: "#f2f2f2",
          borderRadius: 15,
    }}>
      <Image
        source={photoUrl ? { uri: photoUrl } : require('../assets/images/Bg3.jpg')} // Correct usage for dynamic image URL
        style={{
          width: '100%',
          height: 150,
          borderRadius: 10,
        }}
        resizeMode="cover" // Ensure the image scales properly
      />
      <View >
        <Text style={{ fontFamily: 'outfit-Bold',
          fontSize: 20 , marginTop: 20,}}>{locationName}</Text>

        <Text style={{ fontFamily: 'outfit',
          fontSize: 20 , marginTop: 1, }}>📅: {startDate}</Text>
        <Text style={{ fontFamily: 'outfit',
          fontSize: 20 , marginTop: 1 }}>⛵: {travelerCount}</Text>
        <Text style={{ fontFamily: 'outfit',
          fontSize: 20 , marginTop: 1 }}>💰: {budget}</Text>
      </View>
    </TouchableOpacity>
    </ScrollView>
  );
}
