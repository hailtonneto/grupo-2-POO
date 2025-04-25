import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function HeaderPix({ title = "Pix", gap = 150 }) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { gap }]}>
      <TouchableOpacity onPress={handleGoBack}>
        <ArrowLeft size={20} color="#0EA5E9" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    color: "#0EA5E9",
    fontSize: 22,
    fontWeight: "bold",
  },
});
