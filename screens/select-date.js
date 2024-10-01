import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from "../constants/Colors";
import moment from 'moment';
import { CreateTripContext } from "./CreateTripContext";

export default function Selectdate() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  const onDateChange = (date, type) => {
    console.log(date, type);
    if (type === 'START_DATE') {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const OnDateSelectionContinue = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show("Select Start and End Date", ToastAndroid.LONG);
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, 'days');
    console.log(totalNoOfDays + 1);

    // Update the tripData using the correct setTripData method
    setTripData(prevData => ({
      ...prevData,
      startDate: startDate,
      endDate: endDate,
      totalNoOfDays: totalNoOfDays + 1,
    }));

    navigation.push('Selectbudget');
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
        Travel Dates
      </Text>
      <View style={{ marginTop: 20 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          selectedDayTextStyle={{
            color: Colors.white,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={OnDateSelectionContinue}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 35,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-Medium',
            fontSize: 20,
            color: Colors.white,
            textAlign: "center",
          }}
        >
          Continue..
        </Text>
      </TouchableOpacity>
    </View>
  );
}
