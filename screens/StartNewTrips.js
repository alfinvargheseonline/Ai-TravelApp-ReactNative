import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "../constants/Colors";
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

export default function StartNewTrips() {
  const navigation = useNavigation();  // Get navigation object

  return (
    <View
      style={{
        padding: 20,
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 20
      }}
    >
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'outfit-Medium',
          marginTop: 10
        }}
      >
        No trips planned yet
      </Text>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          paddingHorizontal: 30
        }}
        onPress={() => navigation.navigate('SearchPlace')} // Use navigation object
      >
        <Text
          style={{
            color: Colors.white,
            fontFamily: 'outfit-Medium',
            fontSize: 17,
          }}
        >
          Start A New Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
