import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import Mytrip from "./screens/Mytrip";
import StartNewTrips from "./screens/StartNewTrips";
import SearchPlace from "./screens/SearchPlace";
import Selecttraveller from "./screens/Select-traveller";
import Selectdate from "./screens/select-date";
import Selectbudget from "./screens/select-budget";
import Reviewtrip from "./screens/Review-trip";
import Generatetrip from "./screens/Generate-trip";
import UserTrip from "./screens/UserTrip";
import TripDetail from "./screens/TripDetail";
import UserTripCard from "./screens/UserTripCard";
UserTripCard;
import { CreateTripProvider } from "./screens/CreateTripContext"; // Ensure the path is correct

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-Medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "outfit-Bold": require("./assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <CreateTripProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Mytrip"
            component={Mytrip}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StartNewTrips"
            component={StartNewTrips}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchPlace"
            component={SearchPlace}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Selecttraveller"
            component={Selecttraveller}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Selectdate"
            component={Selectdate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Selectbudget"
            component={Selectbudget}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reviewtrip"
            component={Reviewtrip}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Generatetrip"
            component={Generatetrip}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserTrip"
            component={UserTrip}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TripDetail"
            component={TripDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserTripCard"
            component={UserTripCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CreateTripProvider>
  );
}
