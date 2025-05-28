import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { RefreshCw} from 'lucide-react-native';

const InvestSaldo = () => {
  const [isBalanceVisible, setBalanceVisible] = React.useState(false)
  const [isSearching, setSearching] = React.useState(false) // falta usar na pesquisa
  return (
    <View style={styles.box}>
      <View style={styles.topRow}>
        <Text style={styles.balance}>{isBalanceVisible ? 'R$ 0,00' : 'R$ ••••'}</Text>
        <View style={styles.icons}>
          <RefreshCw color="#0EA5E9" size={20}/>
          <TouchableOpacity onPress={() => setBalanceVisible(prev => !prev)}>
        <Image
          source={
            isBalanceVisible
              ? require('../assets/home/blocked-eye.png')
              : require('../assets/home/eye.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.link}>Acessar carteira</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: '#0EA5E9',
    borderRadius: 12,
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balance: {
    color: '#0EA5E9',
    fontFamily: "InterBold",
    fontSize: 20,
  },
  icons: {
    flexDirection: 'row',
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  link: {
    color: '#0EA5E9',
    fontFamily: "InterBold",
  },
});

export default InvestSaldo;
