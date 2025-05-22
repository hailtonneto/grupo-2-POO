import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../components/Header";
import PixMainActions from "../components/MainActions";
import PixFeatureGrid from "../components/FeatureGrid";

export default function PixScreen() {

  const actions = [
    "Pagar",
    "Receber",
  ];

  const features = [
    {
      label: "Cadastrar chave Pix",
      icon: require('../assets/chave-pix.png'),
      iconSize: 32,
    },
    {
      label: "Minhas chaves",
      icon: require('../assets/minhas-chaves.png'),
    },
    {
      label: "Ajuda          Pix",
      icon: require('../assets/help-pix.png'),
    },
    {
      label: "Meus      limites",
      icon: require('../assets/credit-limit-pix.png'),
    },
    {
      label: "Extrato e devoluções",
      icon: require('../assets/extrato-pix.png'),
    },
  ];
  

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <PixMainActions actions={actions} />
        <PixFeatureGrid features={features} />
      </ScrollView>
    </View>
  );
}
