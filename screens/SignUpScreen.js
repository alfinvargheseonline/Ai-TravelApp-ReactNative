import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Colors } from "../constants/Colors";  // Assuming you have a Colors.js file for colors
import { auth } from '../configs/FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth'

export default function SignUpScreen({ navigation }) {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   

  const OnCreateAccount=()=>{

    if(!email&&!password&&fullname)

      {
        ToastAndroid.show('Please enter all details',ToastAndroid.BOTTOM)
      }
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    navigation.replace('Mytrip');
    // ...
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage,errorCode);
  });
 }
  return (
    <View style={styles.container}>
      {/* Centered Image */}
      <Image
        source={require(".././assets/images/Bg3.jpg")}  // Use your desired image
        style={styles.image}
      />
      
      <Text style={styles.title}>Sign Up</Text>

      {/* First Name Input */}
      <TextInput
        style={styles.input}
        placeholder="FullName"
        value={fullname}
        onChangeText={(value) => setFullName(value)}
      />


      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(value) => setPassword(value)}
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  // Center content horizontally
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'outfit-Bold',
  },
  input: {
    width: '100%',       // Ensures input fields stretch across screen width
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
    width: '100%',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'outfit',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,    // Makes the image round
    resizeMode: 'cover',  // Ensures the image fits the circular area
    marginBottom: 30,     // Adds space below the image
  }
});
