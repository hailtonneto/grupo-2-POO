import { Pressable, View, Text } from "react-native";

export default function Checkbox({ checked, onChange }) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={{
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {checked && <Text style={{ color: "gray", fontSize: 16 }}>✔</Text>}
    </Pressable>
  );
}