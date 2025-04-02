import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function Footer() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity>
        <Text style={styles.footerText}>Trocar ou abrir conta</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    marginBottom:40,
    marginLeft:210,
    alignItems: "center",
  },
  footerText: {
    color: "#42a5f5",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "InterRegular",
  },
})
