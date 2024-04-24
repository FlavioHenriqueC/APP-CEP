import { StatusBar } from 'expo-status-bar';
import react, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, key, Keyboard } from 'react-native';
import api from './src/api';

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);//hook para referenciar o input de texto.
  const [cepUser, setCepUser] = useState(null);


  function Limpar() {
    setCep('');
    inputRef.current.focus();//código para focar o campo de texto após a exclusão do valor.
  }

  async function buscar() {
    if (cep == '') {
      alert("Digite o CEP!");
      setCep(''); // primeiramente verificamos se o cep fpo preenchidp ou não.
      return; // se estiver vazio ele retorna e para a função.
    }

    try {
      const response = await api.get(`/ws/${cep}/json/`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss();//função que faz o teclado virtual desaparecer.

    } catch (error) {
      console.log('ERROR: ' + error);
    }


  }





  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.texto}>Digite o Cep Desejado</Text>
        <TextInput
          style={styles.input}

          type='text'
          placeholder='ex: 50000000'
          value={String(cep)}
          onChange={(evento) => setCep(evento.nativeEvent.text)}
          keyboardAppearance='dark'
          keyboardType='numeric'
          ref={inputRef} // o atributo ref é para referenciar um elemento no HTML ou em componentes no react native. 

        />

      </View>


      <View style={styles.areaBtn}>

        <TouchableOpacity style={[styles.botao,]} onPress={buscar} >

          <Text style={styles.botaoText}> Buscar</Text>

        </TouchableOpacity>


        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd' }]} onPress={Limpar}>

          <Text style={styles.botaoText}> Limpar </ Text>

        </TouchableOpacity>

      </View>


      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}> CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Lougradouro: {cepUser.lougradouro}</Text>
          <Text style={styles.itemText}> Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf} </Text>

        </View>

      }



    </SafeAreaView >


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3'

  },

  texto: {
    textAlign: 'center',
    fontSize: 50,
    marginTop: 35,
    marginBottom: 25,
    fontWeight: 'bold'
  },
  input: {
    width: '80%',
    height: 65,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderColor: '#ddd',
    paddingHorizontal: 95,
    fontSize: 20,
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    padding: 15,
    borderRadius: 6,
    backgroundColor: '#eead2d',
  },
  botaoText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold'
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  }, resultado: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 65
  }, itemText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold'
  }


});
