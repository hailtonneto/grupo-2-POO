import { View, Text, StyleSheet } from "react-native"

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.cesarText}>cesar</Text>
      <Text style={styles.bankText}>bank</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
  },
  cesarText: {
    color: "#42a5f5",
    fontWeight: "bold",
    fontSize: 53,
    fontFamily: "InterRegular",
  },
  bankText: {
    color: "#42a5f5",
    fontWeight: "bold",
    fontSize: 36,
    marginTop: -26,
    fontFamily: "InterBold",
  },
})
