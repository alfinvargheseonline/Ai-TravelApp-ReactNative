import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import moment from "moment";
import { CreateTripContext } from "./CreateTripContext";

export default function Reviewtrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Review",
    });
  }, [navigation]);
  return (
    <View
      style={{
        marginTop: 30,
        padding: 35,
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
        Review Your Trip
      </Text>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-Medium",
            fontSize: 17,
          }}
        >
          Befor generating your Trip, Review Your Trip
        </Text>
        <View
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="location-sharp" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.Gray,
              }}
            >
              Destination
            </Text>
            <Text
              style={{
                fontFamily: "outfit-Medium",
                fontSize: 20,
              }}
            >
              {tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 30,
          }}
        >
          <Fontisto name="date" size={24} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.Gray,
              }}
            >
              Travel Date
            </Text>
            <Text
              style={{
                fontFamily: "outfit-Medium",
                fontSize: 20,
              }}
            >
              {moment(tripData?.startDate).format("DD MMM") +
                "To " +
                moment(tripData.endDate).format("DD MMM")}
              ({tripData?.totalNoOfDays}Days)
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <FontAwesome6 name="people-group" size={24} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.Gray,
              }}
            >
              Who is Traveling
            </Text>
            <Text
              style={{
                fontFamily: "outfit-Medium",
                fontSize: 20,
              }}
            >
              {tripData.travelerCount?.title}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 30,
          }}
        >
          <FontAwesome6 name="sack-dollar" size={24} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.Gray,
              }}
            >
              Budget
            </Text>
            <Text
              style={{
                fontFamily: "outfit-Medium",
                fontSize: 20,
              }}
            >
              {tripData?.budget}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
         onPress={()=>navigation.push('Generatetrip')}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 40,
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
          Build My Trip !
        </Text>
      </TouchableOpacity>
    </View>
  );
}
