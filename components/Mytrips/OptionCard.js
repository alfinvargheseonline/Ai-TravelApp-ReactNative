import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function OptionCard({ option, selectedOption, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(option)} // Use onSelect to update the selected option
      style={[
        {
          padding: 25,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: "#f2f2f2",
          borderRadius: 15,
        },
        selectedOption?.id === option.id && { borderWidth: 3, borderColor: Colors.primary } // Highlight selected option
      ]}
    >
      <View>
        <Text style={{
          fontFamily: 'outfit-Bold',
          fontSize: 20,
        }}>
          {option?.title}
        </Text>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 17,
          color: Colors.Gray
        }}>
          {option?.desc}
        </Text>
      </View>
      <Text style={{
        fontSize: 40,
      }}>
        {option.icon}
      </Text>
    </TouchableOpacity>
  );
}
