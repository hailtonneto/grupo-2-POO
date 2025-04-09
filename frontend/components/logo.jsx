import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Kadwa_400Regular, Kadwa_700Bold } from "@expo-google-fonts/kadwa";

export default function Logo({ styleCesar, styleBank }) {
  const [fontsLoaded] = useFonts({
    "Kadwa-Regular": Kadwa_400Regular,
    "Kadwa-Bold": Kadwa_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.cesarText, styleCesar]}>cesar</Text>
      <Text style={[styles.bankText, styleBank]}>bank</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
  },
  cesarText: {
    color: "#42a5f5",
    fontSize: 56,
    fontFamily: "Kadwa-Bold",
  },
  bankText: {
    color: "#42a5f5",
    fontSize: 38,
    marginTop: -55,
    fontFamily: "Kadwa-Bold",
  },
});
