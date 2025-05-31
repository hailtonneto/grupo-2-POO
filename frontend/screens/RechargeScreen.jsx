"use client"

import { View, StyleSheet, Alert } from "react-native"
import Header from "../components/Header"
import Recarga from "../components/Recarga"
import { useAuth } from "../src/hooks/useAuth"
import { useAccounts } from "../src/hooks/useAccounts"

const RechargeScreen = () => {
  const { user } = useAuth()
  const { accounts } = useAccounts()

  const handleRechargeSettings = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para acessar as configurações")
      return
    }
    console.log("Abrindo configurações de recarga...")
    Alert.alert(
      "Configurações de Recarga",
      "Configurações disponíveis:\n\n• Histórico de recargas\n• Números favoritos\n• Valores pré-definidos\n• Notificações",
    )
  }

  return (
    <View style={styles.container}>
      <Header
        title="Recarga de Celular"
        gap={92}
        rightIconSource={require("../assets/recharge/menu.png")}
        rightIconStyle={{ marginLeft: 60, width: 20, height: 20 }}
        onRightIconPress={handleRechargeSettings}
      />
      <Recarga user={user} accounts={accounts} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})

export default RechargeScreen
