import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { Colors } from ".././constants/Colors";
import React, { useEffect, useRef } from "react";
import { auth } from '../configs/FirebaseConfig';

export default function WelcomeScreen({ navigation }) {
  // Create an animated value for the cloud's horizontal position
  const cloudPosition = useRef(new Animated.Value(-200)).current; // Cloud starts off-screen to the left

  useEffect(() => {
    // Function to move the cloud
    const animateCloud = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(cloudPosition, {
            toValue: 400, // Move to the right of the screen
            duration: 6000, // Increase duration for smooth movement
            easing: Easing.linear, // Linear easing for smooth, constant speed
            useNativeDriver: true,
          }),
          Animated.timing(cloudPosition, {
            toValue: -200, // Move back to the left of the screen
            duration: 6000, // Smooth transition back to the start
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateCloud(); // Start the cloud animation
  }, [cloudPosition]);

  return (
    <View>
      <Image
        source={require(".././assets/images/Login.jpeg")}
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
          "Discover your next adventure effortlessly. Travel smarter with
          Ai-driven insights."
        </Text>

        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('HomeScreen')}
        >
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

      {/* Animated Cloud */}
      <Animated.Image
        source={require(".././assets/images/cloud4.png")}
        style={[
          style.cloud, 
          { transform: [{ translateX: cloudPosition }] }
        ]}
      />
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
    overflow: "hidden", // Ensures cloud stays within the container
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: "20%",
  },
  cloud: {
    width: '120%',
    height: 310,
    position: "absolute",
    top: "02%", // Adjust vertical position of the cloud
  },
});
