import React from "react";
import { View, StyleSheet } from "react-native";
import PixFeatureIcon from "./FeatureIcon";

export default function PixFeatureGrid({ features }) {
  return (
    <View style={styles.grid}>
      {features.map((feature, index) => (
        <PixFeatureIcon
          key={index}
          label={feature.label}
          icon={feature.icon}
          iconSize={feature.iconSize}
        />
      
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
