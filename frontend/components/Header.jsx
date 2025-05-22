import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header({
  title = "Pix",
  gap = 150,
  rightIconSource = null,
  onRightIconPress = null,
  rightIconStyle = {}, 
  middleIconSource = null,
  onMiddleIconPress = null,
}) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { gap }]}>
      <TouchableOpacity onPress={handleGoBack}>
        <ArrowLeft size={20} color="#0EA5E9" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>

        {middleIconSource && (
          <TouchableOpacity onPress={onMiddleIconPress}>
            <Image source={middleIconSource} style={styles.middleIcon} />
          </TouchableOpacity>
        )}

        {rightIconSource && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Image source={rightIconSource} style={[styles.rightIcon, rightIconStyle]}/>
          </TouchableOpacity>
        )}
      </View>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#0EA5E9",
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 8,
  },
  middleIcon: {
    width: 24,
    height: 24,
    marginLeft: 4,
    marginRight: 4,
    resizeMode: "contain",
  },
  rightIcon: {
    width: 24,
    height: 24,
    marginLeft: 4,
    marginLeft: 4,
    resizeMode: "contain",
  },
});
