"use client"

import { View, Text, TouchableOpacity } from "react-native"
import { ChevronRight } from "lucide-react-native"

export default function PixMainActions({ actions }) {
  return (
    <View style={{ marginBottom: 30, marginTop: 15 }}>
      {actions.map((action, index) => {
        // Suporte para string simples (compatibilidade) ou objeto com onPress
        const label = typeof action === "string" ? action : action.label
        const onPress = typeof action === "string" ? () => console.log(`${action} pressionado`) : action.onPress

        return (
          <TouchableOpacity
            key={label + index}
            onPress={onPress}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#0EA5E9",
              padding: 16,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16 }}>{label}</Text>
            <ChevronRight color="#fff" size={20} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

