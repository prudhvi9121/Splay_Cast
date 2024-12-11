import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const Welcome = () => {
  const handleGetStarted = () => {
    // Navigate to the registration/login page
    console.log("Navigating to the next screen...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo Section */}
        <Image
          source={{ uri: "https://via.placeholder.com/150" }} // Replace with your app logo
          style={styles.logo}
        />

        {/* Main Image */}
        <Image
          source={{ uri: "https://via.placeholder.com/350x250" }} // Replace with your main image
          style={styles.heroImage}
        />

        {/* Title Section */}
        <Text style={styles.title}>
          Welcome to {" "}
          <Text style={styles.highlight}>SplayCast</Text>
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
        Connect with your friends from anywhere! Listen to your favorite
          songs or watch videos together in real-time with synchronized
          playback and chat. Bring entertainment closer, no matter the
          distance.
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e", // Dark gradient starts here
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  heroImage: {
    width: "90%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  highlight: {
    color: "#00d4ff", // Accent color for the highlight
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
    marginVertical: 15,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#00d4ff",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#1a1a2e",
    fontWeight: "600",
  },
});

export default Welcome;
