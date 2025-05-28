import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../components/Header";
import PixMainActions from "../components/MainActions";
import PixFeatureGrid from "../components/FeatureGrid";
import { Dimensions } from "react-native";
export default function PixScreen() {
  const screenWidth = Dimensions.get("window").width;
  
  const actions = [
    "Pagar",
    "Receber",
  ];

  const features = [
    {
      label: "Cadastrar   chave Pix",
      icon: require('../assets/pix/chave-pix.png'),
      iconSize: 32,
    },
    {
      label: "Minhas       chaves",
      icon: require('../assets/pix/minhas-chaves.png'),
    },
    {
      label: "Ajuda               Pix",
      icon: require('../assets/pix/help-pix.png'),
    },
    {
      label: "Meus         limites",
      icon: require('../assets/pix/credit-limit-pix.png'),
    },
    {
      label: "Extrato e devoluções",
      icon: require('../assets/pix/extrato-pix.png'),
    },
  ];
  

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <PixMainActions actions={actions} />
        <PixFeatureGrid features={features} itemStyle={{ width: screenWidth / 5 }} gridStyle={{ flexWrap: "nowrap", justifyContent: "center" }}/>
      </ScrollView>
    </View>
  );
}
