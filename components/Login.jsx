import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter,Redirect } from "expo-router";
import { auth } from "../configs/FirebaseConfig";

export default function login() {
  const router=useRouter();
  const user=auth.currentUser;

  return (
    <View>
      <Image
        source={require("./../assets/images/Login.jpeg")}
        style={{
          width: "100%",
          height: 520,
        }}
      />
      <View style={style.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-Bold",
            textAlign: "center",
            marginTop: "10%",
          }}
        >
          Find My Destination
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
            textAlign: "center",
            color: Colors.Gray,
          }}
        >
          "Discover your next adventure effortlessly.Travel smatter with
          Ai-driven insights."{" "}
        </Text>
        <TouchableOpacity style={style.button}
          onPress={()=>router.push('auth/Sign-in')}>
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "100%",
    padding: 15,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: "20%",
  },
});
