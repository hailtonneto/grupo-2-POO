import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Recarga from '../components/Recarga';

const RechargeScreen = () => {
  return (
    <View style={styles.container}>
      <Header 
        title="Recarga de Celular"
        gap = {92}
        rightIconSource={require("../assets/recharge/menu.png")}
        rightIconStyle={{ marginLeft: 60, width:20, height:20,}} 
        onRightIconPress={() => console.log("Abrindo configurações de recarga...")}
      />
      <Recarga/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RechargeScreen;
