import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const App = () => {
  const [carros, setCarros] = useState([]);
  const [showCarros, setShowCarros] = useState(false);

  const searchCars = async () => {
    try {
      const response = await axios.get('http://192.168.1.64:3000/carro/');
      const carrosData = response.data.carros;
      setCarros(carrosData);
      setShowCarros(true);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCarros = () => {
    if (showCarros) {
      return (
        <ScrollView contentContainerStyle={styles.carList}>
          {carros.map((carro, index) => (
            <View key={index} style={styles.carItem}>
              <Image source={{ uri: carro.imagem }} style={styles.carImage} />
              <Text style={styles.carText}>Marca: {carro.marca}</Text>
              <Text style={styles.carText}>Modelo: {carro.modelo}</Text>
              <Text style={styles.carText}>Ano: {carro.ano}</Text>
              <Text style={styles.carText}>Motor: {carro.motor}</Text>
              <Text style={styles.carText}>Preço: R$ {carro.preco} mil</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CarExplorer</Text>
        <TouchableOpacity style={styles.searchButton} onPress={searchCars}>
          <Icon name="search" size={20} color="#fff" />
          <Text style={styles.searchButtonText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
      {renderCarros()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 24,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4a90e2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  searchButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  carList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  carItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  carImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  carText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

export default App;
