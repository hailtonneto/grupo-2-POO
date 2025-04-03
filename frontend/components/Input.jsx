import { View, Text, TextInput, StyleSheet } from "react-native";

export default function InputField({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = "default",
  secureTextEntry = false,
  maxLength,
  labelColor = "#000"
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder || label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "InterRegular",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    fontFamily: "InterRegular",
  },
});
