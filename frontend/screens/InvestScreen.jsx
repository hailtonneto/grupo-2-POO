import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import InvestSaldo from '../components/InvestSaldo';
import PixFeatureGrid from '../components/FeatureGrid';
import { Dimensions } from 'react-native';
const InvestScreen = () => {
    const screenWidth = Dimensions.get("window").width;

    const features = [
    {
      label: "Ações               Brasil",
      icon: require('../assets/investments/brazil-flag.png'),
      iconSize: 28,
    },
    {
      label: "Tesouro         Direto",
      icon: require('../assets/investments/gold-chest.png'),
      iconSize: 28,
    },
    {
      label: "Criptomoeda",
      icon: require('../assets/investments/bitcoin.png'),
      iconSize: 28,
    },
    {
      label: "Investimentos   em Dólar",
      icon: require('../assets/investments/dolar-invest.png'),
      iconSize: 28,
    },
    {
      label: "Renda                Fixa",
      icon: require('../assets/investments/fixed-income.png'),
      iconSize: 28,
    },
    {
      label: "Poupança",
      icon: require('../assets/investments/savings.png'),
      iconSize: 28,
    },
    {
      label: "Fundos",
      icon: require('../assets/investments/funds.png'),
      iconSize: 28,
    },
    {
      label: "Mostrar           mais",
      icon: require('../assets/home/more.png'),
      iconSize: 28,
    },
  ];
  
  return (
    <View style={styles.container}>
      <Header 
        title = "Investimentos" 
        gap={95}
        middleIconSource ={require("../assets/home/search.png")}
        middleIconStyle ={{ marginLeft: 55, width:20, height:20,}}
        onMiddleIconPress ={() => console.log("Abrindo pesquisa...")}
        rightIconSource={require("../assets/cards/settings.png")}
        rightIconStyle={{ marginLeft: 10, width:22, height:22,}} 
        onRightIconPress={() => console.log("Abrindo configurações de investimentos...")} 
      />
      <InvestSaldo />
      <PixFeatureGrid
        features={features}
        iconBorderRadius={10}
        itemStyle={{ width: screenWidth / 4 - 12 }}
        gridStyle={{ flexWrap: "wrap", justifyContent: "center"}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
});

export default InvestScreen;