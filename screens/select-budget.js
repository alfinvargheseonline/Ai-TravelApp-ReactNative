import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import OptionCard from "../components/Mytrips/OptionCard";
import { SelectbudgetOptions } from "../constants/Options";
import { CreateTripContext } from "./CreateTripContext";
import { Colors } from "../constants/Colors";

export default function Selectbudget() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null); // State for selected option
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Select Budget",
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedOption) {
      // Update the tripData context with the selected budget option
      setTripData({
        ...tripData, 
        budget: selectedOption?.title,
      });
    }
  }, [selectedOption]);

  // Function to handle continue button press
  const onClickContinue = () => {
    if (!selectedOption) {
      // Show toast notification if no option is selected
      ToastAndroid.show("Please select your budget", ToastAndroid.LONG);
    } else {
      // Navigate to the next screen only if an option is selected
      navigation.push('Reviewtrip');
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-Bold",
          fontSize: 30,
          marginTop: 20,
        }}
      >
        Select Budget
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-Bold",
            fontSize: 20,
          }}
        >
          Choose Your Budget
        </Text>
        <FlatList
          data={SelectbudgetOptions} // Correctly pass the data prop
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedOption(item)} // Handle selection
              style={{
                marginVertical: 10,
              }}
            >
              <OptionCard
                option={item}
                selectedOption={selectedOption}
                onSelect={setSelectedOption} // Pass the selection handler
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()} // Provide a keyExtractor
        />
      </View>

      <TouchableOpacity
        onPress={onClickContinue}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-Medium",
            color: Colors.white,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Continue..
        </Text>
      </TouchableOpacity>
    </View>
  );
}
