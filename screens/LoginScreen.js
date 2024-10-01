import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Colors } from "../constants/Colors";  // Assuming you have a Colors.js file for colors
import { auth } from '../configs/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show('Enter email and password', ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        
        // Navigate to MyTrip screen after successful login
        navigation.replace('Mytrip');  // Replaces the current screen with Mytrip screen
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      });
  };

  return (
    <View style={styles.container}>
      {/* Centered Image */}
      <Image
        source={require(".././assets/images/Bg1.jpg")}  // Use your desired image
        style={styles.image}
      />

      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(value) => setPassword(value)}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  // Center the content horizontally
    padding: 20,
    backgroundColor: 'Colors.white',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,    // Makes the image round
    resizeMode: 'cover',  // Ensures the image fits the circular area
    marginBottom: 30,     // Space below the image
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'outfit-Bold',
  },
  input: {
    width: '100%',       // Ensures input fields stretch across the screen width
    borderWidth: 1,
    borderColor: Colors.Gray,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',       // Ensures button stretches across screen width
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'outfit',
  },
});
