import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CreateTripContext } from "./CreateTripContext";
import { AI_PROMPT } from "../constants/Options";
import { chatSession } from "../configs/AiModel";
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore"; // added doc import
import { auth, db } from "../configs/FirebaseConfig";

export default function Generatetrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData) {
      generateTrip();
    }
  }, [tripData]);

  const generateTrip = async () => {
    try {
      setLoading(true);

      // Replace the placeholders in the prompt with the actual trip data
      const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", tripData?.locationInfo?.name)
        .replace("{totalDays}", tripData?.totalNoOfDays)
        .replace("{totalNight}", tripData?.totalNoOfDays - 1)
        .replace("{traveler}", tripData.travelerCount.title)
        .replace("{budget}", tripData?.budget)
        .replace("{location}", tripData?.locationInfo?.name)
        .replace("{totalDays}", tripData?.totalNoOfDays)
        .replace("{totalNight}", tripData?.totalNoOfDays - 1);

      console.log(FINAL_PROMPT);

      // Send prompt to AI service
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResp = JSON.parse(result.response.text());
      console.log(tripResp);

      // Convert Moment objects to JavaScript Date
      const tripDataForFirestore = {
        ...tripData,
        startDate: tripData.startDate.toDate(), // Convert Moment to Date
        endDate: tripData.endDate.toDate(), // If you have an end date
      };

      // Store generated trip in Firestore
      const docId = (Date.now()).toString();
      await setDoc(doc(db, "userTrips", docId), {
        userEmail: user.email,
        tripPlan: tripResp,
        tripData: tripDataForFirestore,
      });

      // Navigate to "Mytrip" on success
      navigation.push("Mytrip");
    } catch (error) {
      console.error("Error generating trip: ", error);
    } finally {
      setLoading(false);
    }
  };

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
          textAlign: "center",
        }}
      >
        Please Wait...
      </Text>
      <Text
        style={{
          fontFamily: "outfit-Medium",
          fontSize: 20,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        We are working to generate your dream trip...
      </Text>
      <Image
        source={require(".././assets/images/loding.gif")}
        style={{
          width: "100%",
          height: 300,
          objectFit: "contain",
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-Bold",
          fontSize: 30,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Do not go back...
      </Text>
    </View>
  );
}
