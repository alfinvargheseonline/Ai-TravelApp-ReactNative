import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Dimensions, Image } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const DailyPlanSlider = ({ dailyPlan }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sectionTitle}>📜 Daily Plan</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {dailyPlan.map((dayPlan, dayIndex) => (
          <View key={dayIndex} style={styles.slide}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>Day {dayPlan?.day}🏷 </Text>
            </View>
            <ScrollView>
              {dayPlan?.schedule.map((activity, activityIndex) => (
                <View key={activityIndex} style={styles.activityContainer}>
                  <Text style={styles.details}>🕰 Time: {activity.time}</Text>
                  <Text style={styles.details}>
                    🏕 Activity: {activity?.activity}
                  </Text>
                  <Text style={styles.details}>
                    📌 Location: {activity?.location}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {dailyPlan.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default function TripDetail({ route }) {
  const { trip } = route.params;

  const { tripData, tripPlan } = trip;
  const locationName = tripData?.locationInfo?.name || "Location not available";
  const startDate = tripData?.startDate
    ? new Date(tripData.startDate.seconds * 1000).toLocaleDateString()
    : "Date not available";
  const endDate = tripData?.endDate
    ? new Date(tripData.endDate.seconds * 1000).toLocaleDateString()
    : "End date not available";
  const travelerCount =
    tripData?.travelerCount?.title || "Traveler info not available";
  const budget = tripData?.budget || "Budget not available";
  const flightBookingUrl = tripPlan?.flight?.booking_url || "#";
  const hotelDetails = tripPlan?.hotel || [];
  const dailyPlan = tripPlan?.daily_plan;
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Trip Schedule</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>🌃 {locationName}</Text>
        <Text style={styles.details}>📅 Start: {startDate}</Text>
        <Text style={styles.details}>📆 End : {endDate}</Text>
        <Text style={styles.details}>🚤 {travelerCount}</Text>
        <Text style={styles.details}>💰 {budget}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>✈️ Flight Details</Text>
        <Text style={styles.details}>💵 {tripPlan?.flight?.price}</Text>
        <Text style={styles.details}>
          💺 {tripPlan?.flight?.details?.airline}
        </Text>
        <Text style={styles.details}>
          🛬 {tripPlan?.flight?.details?.arrival_city}
        </Text>
        <Text style={styles.details}>
          🔮 Arrival Date: {tripPlan?.flight?.details?.arrival_date}
        </Text>
        <Text style={styles.details}>
          ⏰ Arrival Time: {tripPlan?.flight?.details?.arrival_time}
        </Text>
        <Text style={styles.details}>
          🛫 {tripPlan?.flight?.details?.departure_city}
        </Text>
        <Text style={styles.details}>
          🔮 Departure Date: {tripPlan?.flight?.details?.departure_date}
        </Text>
        <Text style={styles.details}>
          ⏰Departure Time: {tripPlan?.flight?.details?.departure_time}
        </Text>
        <Text style={styles.details}>
          🧾 Booking URL:
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(flightBookingUrl)}
          >
            {flightBookingUrl}
          </Text>
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>🏨 Hotel Details</Text>
        {hotelDetails.map((hotel, index) => (
          <View key={index} style={styles.hotelContainer}>
             <Image
      source={
        require('../assets/images/Bg3.jpg')
      } 
      style={{
        width: '100%',
        height: 150,
        borderRadius: 10,
      }}
      resizeMode="cover"
    />
            <Text style={styles.hotelName}>🔖: {hotel.name}</Text>
            <Text style={styles.details}>📌: {hotel.address}</Text>
            <Text style={styles.details}>📜: {hotel.description}</Text>
            <Text style={styles.details}>💰: {hotel.price}</Text>
            
            <Text style={styles.details}>⭐: {hotel.rating}</Text>
          </View>
        ))}
      </View>

      <DailyPlanSlider dailyPlan={dailyPlan} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ced0dc",
    flex: 1,
  },
  mainTitle: {
    fontFamily: "outfit-Bold",
    fontSize: 35,
  },
  infoContainer: {
    padding: 10,
    marginTop: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
  },
  title: {
    fontFamily: "outfit-Bold",
    fontSize: 20,
    marginTop: 5,
  },
  details: {
    fontFamily: "outfit",
    fontSize: 17,
    marginTop: 5,
  },
  sectionTitle: {
    fontFamily: "outfit-Bold",
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  hotelContainer: {
    marginBottom: 10,
  },
  hotelName: {
    fontFamily: "outfit-Bold",
    fontSize: 17,
    marginTop: 5,
  },
  sliderContainer: {
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    padding: 10,
  },
  slide: {
    width: screenWidth - 40,
    paddingHorizontal: 10,
  },
  dayHeader: {
    backgroundColor: '#c0c0c0',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  dayTitle: {
    fontFamily: 'outfit-Bold',
    fontSize: 20,
  },
  activityContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#333',
  },
});