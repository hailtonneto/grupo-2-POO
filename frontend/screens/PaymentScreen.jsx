import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../components/Header";
import PixMainActions from "../components/MainActions";
import PixFeatureGrid from "../components/FeatureGrid";
import { Dimensions } from "react-native";
export default function PaymentScreen() {
  const screenWidth = Dimensions.get("window").width;
  const actions = [
    "Escanear",
    "Digitar",
  ];

  const features = [
    {
      label: "Pix",
      icon: require('../assets/home/pix.png'),
      iconSize: 32,
    },
    {
      label: "DARF",
      icon: require('../assets/payment/darf.png'),
    },
    {
      label: "Débito       Automático",
      icon: require('../assets/payment/auto-debit.png'),
    },
    {
      label: "Cartão              Crédito",
      icon: require('../assets/payment/credit-card.png'),
    },
  ];
  

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Pagamentos" gap = {112}/>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <PixMainActions actions={actions} />
        <PixFeatureGrid features={features} itemStyle={{ width: screenWidth / 4, }} gridStyle={{ flexWrap: "nowrap", justifyContent: "center" }}/>
      </ScrollView>
    </View>
  );
}
