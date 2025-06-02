"use client"

import { View, Text, TouchableOpacity, Image } from "react-native"

export default function PixFeatureIcon({ label, icon, iconSize = 24, borderRadius = 9999, onPress }) {
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <View
        style={{
          width: 56,
          height: 56,
          backgroundColor: "#0EA5E9",
          borderRadius: borderRadius,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Image source={icon} style={{ width: iconSize, height: iconSize, tintColor: "white" }} />
      </View>
      <Text style={{ fontSize: 12, textAlign: "center", color: "#0EA5E9" }}>{label}</Text>
    </TouchableOpacity>
  )
}
