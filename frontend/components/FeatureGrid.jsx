import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import PixFeatureIcon from "./FeatureIcon";

const screenWidth = Dimensions.get("window").width;

export default function PixFeatureGrid({ features, iconBorderRadius, itemStyle, gridStyle }) {
  return (
    <View style={[styles.grid, gridStyle]}>
      {features.map((feature, index) => (
        <View key={index} style={[styles.gridItem, itemStyle]}>
          <PixFeatureIcon
            label={feature.label}
            icon={feature.icon}
            iconSize={feature.iconSize}
            borderRadius={iconBorderRadius}
          />
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  gridItem: {
    alignItems: "center",
    marginVertical: 10,
  },
});
