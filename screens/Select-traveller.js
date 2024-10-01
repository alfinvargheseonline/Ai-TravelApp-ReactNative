import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from "react-native"; // Import ToastAndroid
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SelecttravellerList } from "../constants/Options";
import OptionCard from "../components/Mytrips/OptionCard";
import { CreateTripContext } from "./CreateTripContext";
import { Colors } from "../constants/Colors";

export default function Selecttraveller() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedOption) {
      setTripData({ ...tripData, travelerCount: selectedOption });
    }
  }, [selectedOption]);

  // Function to handle the "Continue" button press
  const handleContinue = () => {
    if (!selectedOption) {
      // Show toast notification if no option is selected
      ToastAndroid.show("Please select the number of travelers.", ToastAndroid.SHORT);
    } else {
      // Proceed to the next screen if a selection is made
      navigation.navigate("Selectdate");
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
        Who is Traveling
      </Text>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: "outfit-Bold",
            fontSize: 20,
          }}
        >
          Choose Your Travelers
        </Text>

        <FlatList
          data={SelecttravellerList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ marginVertical: 10 }} // Add vertical margin for spacing
              onPress={() => setSelectedOption(item)}
            >
              <OptionCard
                option={item}
                selectedOption={selectedOption}
                onSelect={setSelectedOption}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }} // Add bottom padding if needed
        />
      </View>
      <TouchableOpacity
        onPress={handleContinue} // Call the new function
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
