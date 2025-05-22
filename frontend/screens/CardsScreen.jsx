import React from 'react';
import { View, StyleSheet} from 'react-native';
import Header from "../components/Header";
import CardInterface from '../components/CardInterface';

const CardsScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Cartões"
        gap = {130}
        rightIconSource={require("../assets/settings.png")}
        rightIconStyle={{ marginLeft: 120}} 
        onRightIconPress={() => console.log("Abrindo configurações...")}
      />
      <CardInterface/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CardsScreen;