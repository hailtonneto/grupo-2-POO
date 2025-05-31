"use client"

import { View, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Header from "../components/Header"
import PixMainActions from "../components/MainActions"
import PixFeatureGrid from "../components/FeatureGrid"
import { Dimensions } from "react-native"
import { useAuth } from "../src/hooks/useAuth"
import { useAccounts } from "../src/hooks/useAccounts"
import { useTransactions } from "../src/hooks/useTransactions"

export default function PixScreen() {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get("window").width
  const { user } = useAuth()
  const { accounts } = useAccounts()
  const { transfer } = useTransactions(accounts[0]?.id)

  const handlePixPay = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para fazer pagamentos PIX")
      return
    }
    if (!accounts || accounts.length === 0) {
      Alert.alert("Erro", "Você precisa ter uma conta para fazer pagamentos PIX")
      return
    }
    console.log("Abrindo tela de pagamento PIX...")
    Alert.alert("Pagar PIX", "Funcionalidade de pagamento PIX será implementada em breve!")
    // navigation.navigate("PixPay")
  }

  const handlePixReceive = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para receber PIX")
      return
    }
    if (!accounts || accounts.length === 0) {
      Alert.alert("Erro", "Você precisa ter uma conta para receber PIX")
      return
    }
    console.log("Abrindo tela de recebimento PIX...")
    Alert.alert("Receber PIX", "Funcionalidade de recebimento PIX será implementada em breve!")
    // navigation.navigate("PixReceive")
  }

  const handleRegisterPixKey = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para cadastrar chaves PIX")
      return
    }
    console.log("Abrindo cadastro de chave PIX...")
    Alert.alert("Cadastrar Chave PIX", "Funcionalidade de cadastro de chaves PIX será implementada em breve!")
    // navigation.navigate("PixKeyRegister")
  }

  const handleMyPixKeys = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para ver suas chaves PIX")
      return
    }
    console.log("Abrindo minhas chaves PIX...")
    Alert.alert(
      "Minhas Chaves PIX",
      `Chaves cadastradas para ${user.name}:\n\n• Email: ${user.email}\n• CPF: ${user.cpf}\n• Telefone: ${user.phone}`,
    )
    // navigation.navigate("MyPixKeys")
  }

  const handlePixHelp = () => {
    console.log("Abrindo ajuda PIX...")
    Alert.alert(
      "Ajuda PIX",
      "PIX é o sistema de pagamentos instantâneos do Banco Central do Brasil.\n\nFunciona 24h por dia, 7 dias por semana, incluindo feriados.\n\nTransferências são gratuitas para pessoas físicas.",
    )
  }

  const handlePixLimits = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para ver seus limites PIX")
      return
    }
    console.log("Abrindo limites PIX...")
    Alert.alert(
      "Meus Limites PIX",
      "Limites atuais:\n\n• Diurno (6h às 20h): R$ 20.000,00\n• Noturno (20h às 6h): R$ 1.000,00\n• Mensal: R$ 40.000,00",
    )
    // navigation.navigate("PixLimits")
  }

  const handlePixStatement = () => {
    if (!user) {
      Alert.alert("Erro", "Você precisa estar logado para ver o extrato PIX")
      return
    }
    console.log("Abrindo extrato PIX...")
    Alert.alert("Extrato PIX", "Funcionalidade de extrato PIX será implementada em breve!")
    // navigation.navigate("PixStatement")
  }

  const actions = [
    {
      label: "Pagar",
      onPress: handlePixPay,
    },
    {
      label: "Receber",
      onPress: handlePixReceive,
    },
  ]

  const features = [
    {
      label: "Cadastrar   chave Pix",
      icon: require("../assets/pix/chave-pix.png"),
      iconSize: 32,
      onPress: handleRegisterPixKey,
    },
    {
      label: "Minhas       chaves",
      icon: require("../assets/pix/minhas-chaves.png"),
      onPress: handleMyPixKeys,
    },
    {
      label: "Ajuda               Pix",
      icon: require("../assets/pix/help-pix.png"),
      onPress: handlePixHelp,
    },
    {
      label: "Meus         limites",
      icon: require("../assets/pix/credit-limit-pix.png"),
      onPress: handlePixLimits,
    },
    {
      label: "Extrato e devoluções",
      icon: require("../assets/pix/extrato-pix.png"),
      onPress: handlePixStatement,
    },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <PixMainActions actions={actions} />
        <PixFeatureGrid
          features={features}
          itemStyle={{ width: screenWidth / 5 }}
          gridStyle={{ flexWrap: "nowrap", justifyContent: "center" }}
        />
      </ScrollView>
    </View>
  )
}
