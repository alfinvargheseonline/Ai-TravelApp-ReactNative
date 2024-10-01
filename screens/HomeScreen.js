// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from "../constants/Colors";  // Assuming you have a Colors.js file for colors

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require(".././assets/images/Bg2.jpg")}  // Replace with your image
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Find My Destination</Text>
      <Text style={styles.subtitle}>Plan your journey with AI-driven insights!</Text>

      {/* Get Started Button */}
      

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'Colors.white',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'outfit-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.Gray,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'outfit',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'outfit',
  },
});
