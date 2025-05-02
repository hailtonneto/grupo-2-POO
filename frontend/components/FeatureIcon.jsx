import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function PixFeatureIcon({ label, icon, iconSize = 24 }) {
  return (
    <TouchableOpacity style={{ alignItems: "center", flex: 1 }}>
      <View
        style={{
          width: 56,
          height: 56,
          backgroundColor: "#0EA5E9",
          borderRadius: 9999,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Image source={icon} style={{ width: iconSize, height: iconSize, tintColor: "white" }} />
      </View>
      <Text style={{ fontSize: 12, textAlign: "center", color: "#0EA5E9" }}>{label}</Text>
    </TouchableOpacity>
  );
}
