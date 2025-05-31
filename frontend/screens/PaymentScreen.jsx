"use client"

import { View, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "../components/Header"
import PixMainActions from "../components/MainActions"
import PixFeatureGrid from "../components/FeatureGrid"
import { Dimensions } from "react-native"
import { useAuth } from "../src/hooks/useAuth"
import { useAccounts } from "../src/hooks/useAccounts"

export default function PaymentScreen() {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get("window").width
  const { user } = useAuth()
  const { accounts } = useAccounts()

  const handleScanQR = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para usar esta funcionalidade")
      return
    }
    console.log("Abrindo scanner QR Code...")
    // navigation.navigate("QRScanner")
    Alert.alert("Scanner QR", "Funcionalidade de scanner será implementada em breve!")
  }

  const handleDigitCode = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para usar esta funcionalidade")
      return
    }
    console.log("Abrindo tela para digitar código...")
    // navigation.navigate("DigitCode")
    Alert.alert("Digitar Código", "Funcionalidade para digitar código será implementada em breve!")
  }

  const handlePixPayment = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para usar esta funcionalidade")
      return
    }
    if (!accounts || accounts.length === 0) {
      Alert.alert("Erro", "Você precisa ter uma conta para fazer pagamentos PIX")
      return
    }
    console.log("Redirecionando para PIX...")
    navigation.navigate("Pix")
  }

  const handleDARF = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para usar esta funcionalidade")
      return
    }
    console.log("Abrindo pagamento DARF...")
    Alert.alert("DARF", "Pagamento de DARF será implementado em breve!")
  }

  const handleAutoDebit = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para usar esta funcionalidade")
      return
    }
    console.log("Abrindo débito automático...")
    Alert.alert("Débito Automático", "Configuração de débito automático será implementada em breve!")
  }

  const handleCreditCard = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para usar esta funcionalidade")
      return
    }
    console.log("Redirecionando para cartões...")
    navigation.navigate("Cards")
  }

  const actions = [
    {
      label: "Escanear",
      onPress: handleScanQR,
    },
    {
      label: "Digitar",
      onPress: handleDigitCode,
    },
  ]

  const features = [
    {
      label: "Pix",
      icon: require("../assets/home/pix.png"),
      iconSize: 32,
      onPress: handlePixPayment,
    },
    {
      label: "DARF",
      icon: require("../assets/payment/darf.png"),
      onPress: handleDARF,
    },
    {
      label: "Débito       Automático",
      icon: require("../assets/payment/auto-debit.png"),
      onPress: handleAutoDebit,
    },
    {
      label: "Cartão              Crédito",
      icon: require("../assets/payment/credit-card.png"),
      onPress: handleCreditCard,
    },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Pagamentos" gap={112} />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <PixMainActions actions={actions} />
        <PixFeatureGrid
          features={features}
          itemStyle={{ width: screenWidth / 4 }}
          gridStyle={{ flexWrap: "nowrap", justifyContent: "center" }}
        />
      </ScrollView>
    </View>
  )
}
