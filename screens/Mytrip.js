import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, StatusBar } from "react-native";
import { Colors } from "../constants/Colors"; // Assuming you have a Colors.js file for colors
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTrips from "./StartNewTrips"; // Assuming you have this component created
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../configs/FirebaseConfig";
import UserTrip from "./UserTrip";

export default function MytripScreen({ navigation }) {
  // Dummy data for trips (You can replace it with your own dynamic data)
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, seLoading] = useState(false);

  const GetMyTrips = async () => {
    seLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, "userTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    seLoading(false);
  };

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  return (
    <ScrollView>
      <StatusBar backgroundColor="#272757" barStyle="default" />
    <View style={styles.container}>
      <View style={styles.header}>
        <View
        ><Text style={styles.title}>My Trips</Text></View>
        

        {/* Add button for adding new trips */}
        <Ionicons
          name="add-circle"
          size={50}
          color="black"
          onPress={() => navigation.navigate("StartNewTrips")} // Update here
        />
      </View>

      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}

      {/* Check if userTrips is empty and show StartNewTrips */}
      {userTrips.length === 0 ? (
        <StartNewTrips />
      ) : (
        <UserTrip userTrips={userTrips} />
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    padding: 20,
    paddingTop: 25,
    backgroundColor:"#ced0dc",
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "outfit-Bold",
    fontSize: 35,
  },
});
