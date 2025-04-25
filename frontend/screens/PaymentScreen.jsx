import React from "react";
import { View, ScrollView } from "react-native";
import HeaderPix from "../components/Header";
import PixMainActions from "../components/MainActions";
import PixFeatureGrid from "../components/FeatureGrid";
export default function PaymentScreen() {

  const actions = [
    "Escanear",
    "Digitar",
  ];

  const features = [
    {
      label: "Pix",
      icon: require('../assets/pix.png'),
      iconSize: 32,
    },
    {
      label: "DARF",
      icon: require('../assets/darf.png'),
    },
    {
      label: "Débito Automático",
      icon: require('../assets/auto-debit.png'),
    },
    {
      label: "Cartão       Crédito",
      icon: require('../assets/credit-card.png'),
    },
  ];
  

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderPix title="Pagamentos" gap = {112}/>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <PixMainActions actions={actions} />
        <PixFeatureGrid features={features} />
      </ScrollView>
    </View>
  );
}
