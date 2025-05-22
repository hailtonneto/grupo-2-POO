import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Recarga = () => {
  const [operadora, setOperadora] = useState('');
  const [telefone, setTelefone] = useState('');
  const [salvarFavorito, setSalvarFavorito] = useState(true);
  const [valorRecarga, setValorRecarga] = useState('');

  const formatarParaReais = (valor) => {
    const numero = valor.replace(/\D/g, '');
    if (!numero) return '';
    const reais = (parseInt(numero, 10) / 100).toFixed(2);
    return reais.replace('.', ',');
  };

  const handleValorChange = (texto) => {
    const formatado = formatarParaReais(texto);
    setValorRecarga(formatado);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dados da Recarga</Text>
        <TouchableOpacity onPress={() => console.log("Abrir favoritos")}>
          <Text style={styles.favoritos}>Favoritos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Operadora</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={operadora}
          onValueChange={(itemValue) => setOperadora(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma operadora" value="" enabled={false} />
          <Picker.Item label="Vivo" value="vivo" />
          <Picker.Item label="Tim" value="tim" />
          <Picker.Item label="Claro" value="claro" />
          <Picker.Item label="Oi" value="oi" />
        </Picker>
      </View>

      <Text style={styles.label}>Número de telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 0 0000-0000"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />

      <View style={styles.favoritoContainer}>
        <TouchableOpacity style={styles.favoritoButton}>
          <Text style={styles.favoritoText}>Salvar como favorito</Text>
          <Switch
            value={salvarFavorito}
            onValueChange={setSalvarFavorito}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Quanto você quer recarregar?</Text>
      <TextInput
        style={styles.valorInput}
        placeholder="R$ 0,00"
        keyboardType="numeric"
        value={valorRecarga ? `R$ ${valorRecarga}` : ''}
        onChangeText={handleValorChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#0EA5E9',
    fontFamily:'InterBold',
  },
  favoritos: {
    color: '#0EA5E9',
    fontFamily:'InterBold',
    fontSize: 14,
  },
  label: {
    marginTop: 27,
    fontSize: 14,
    color: '#0EA5E9',
  },
  pickerContainer: {
    backgroundColor: '#eee',
    borderRadius: 8,
    marginTop: 9,
    fontFamily: 'InterBold',
  },
  picker: {
    height: 50,
    color: '#888',
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    marginTop: 9,
    fontFamily: 'InterBold',
  },
  
  favoritoContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#0EA5E9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoritoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  favoritoText: {
    color: '#0EA5E9',
    fontFamily:'InterBold',
    fontSize: 15,
  },
  subTitle: {
    marginTop: 30,
    fontSize: 20,
    fontFamily:'InterBold',
    color: '#0EA5E9',
    textAlign: 'center',
  },
  valorInput: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#aaa',
    textAlign: 'center',
    textDecorationLine: 'underline',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
  },
});

export default Recarga;
