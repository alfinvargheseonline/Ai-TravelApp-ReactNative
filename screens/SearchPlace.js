import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { Colors } from '../constants/Colors';
import { FlatList, TouchableOpacity, TextInput } from 'react-native';
import { CreateTripContext } from './CreateTripContext';

// Dummy Location Data
const dummyLocations = [
  {
    description: 'New York, NY, USA',
    geometry: { location: { lat: 40.712776, lng: -74.005974 } },
    photos: [{ photo_reference: 'https://images.unsplash.com/photo-1590253230365-b9f5b7fd2714?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }],
    url: 'https://maps.google.com/?q=New+York,NY',
  },
  {
    description: 'Los Angeles, CA, USA',
    geometry: { location: { lat: 34.052235, lng: -118.243683 } },
    photos: [{ photo_reference: 'https://images.unsplash.com/photo-1454238554694-bb0049b8dc5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }],
    url: 'https://maps.google.com/?q=Los+Angeles,CA',
  },
  {
    description: 'Chicago, IL, USA',
    geometry: { location: { lat: 41.878113, lng: -87.629799 } },
    photos: [{ photo_reference: 'https://images.unsplash.com/photo-1602276119694-c9b033719232?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }],
    url: 'https://maps.google.com/?q=Chicago,IL',
  },
];

export default function SearchPlace() {
  const navigation = useNavigation(); // Access navigation
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [filteredLocations, setFilteredLocations] = useState(dummyLocations);
  const [searchText, setSearchText] = useState(''); // Track search input

  // Set the header configuration when the component mounts
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, [navigation]);

  // Filter dummy locations based on search input
  const handleSearch = (text) => {
    setSearchText(text); // Update the search text state
    if (text === '') {
      setFilteredLocations(dummyLocations); // Show all places if search is empty
    } else {
      const filtered = dummyLocations.filter((location) =>
        location.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  // Handle the press event for a location
  const handleLocationPress = (location) => {
    // Log location details for debugging
    console.log('Description:', location.description);
    console.log('Location:', location.geometry.location);
    console.log('Photo Reference:', location.photos[0]?.photo_reference);

    // Set trip data with location information
    setTripData((prevData) => ({
      ...prevData,
      locationInfo: {
        name: location.description,
        coordinates: location.geometry.location,
        photoRef: location.photos[0]?.photo_reference,
        url: location.url,
      },
    }));

    // Navigate to the 'SelectTraveller' page after selecting a location
    navigation.navigate('Selecttraveller'); // Replace 'SelectTraveller' with the correct route name in your navigation stack
  };

  return (
    <View
      style={{
        padding: 30,
        paddingTop: 100,
        backgroundColor: Colors.white,
        height: '100%',
      }}
    >
      {/* Search input field */}
      <TextInput
        placeholder="Search for a place"
        style={{
          backgroundColor: '#F2F2F2',
          borderRadius: 8,
          fontSize: 16,
          padding: 12,
          marginBottom: 10,
        }}
        value={searchText} // Bind search input to state
        onChangeText={handleSearch} // Handle input change
      />

      {/* Displaying filtered dummy locations */}
      <FlatList
        data={filteredLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLocationPress(item)}>
            <Text style={{ padding: 15, fontSize: 16, color: 'black' }}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
