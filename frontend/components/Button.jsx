import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress, color = "#42a5f5", disabled = false }) {
  const handlePress = () => {
    if (!disabled) {
      onPress(); // só chama a função se o botão não estiver desabilitado
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? "#D3D3D3" : color }]}
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={[styles.buttonText, { color: disabled ? "#A0A0A0" : "#fff" }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "InterBold",
  },
});
