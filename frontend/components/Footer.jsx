import { Pressable, View, Text, StyleSheet } from "react-native"

export default function Footer({ navigation, style }) {
  return (
    <View style={[styles.footer, style]}>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text style={styles.text}>
          Trocar ou abrir conta
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginBottom:60,
    marginLeft:210,
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    color: "#42a5f5", 
    fontSize: 18, 
    fontFamily: "InterBold",
  },
})
