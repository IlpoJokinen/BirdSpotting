import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import linnut from './linnut.json';
import kuvat from './pictureNames.json';

export default function App() {

  const [lintuData, setLintuData] = useState({})
  const [kuvaData, setKuvaData] = useState({})
  const [nimet, setNimet] = useState([])

  useEffect(() => {
    setLintuData(linnut)
    setKuvaData(kuvat)
  }, [])

  function editkuvaData() {
    let kuvaTaulukko = Object.values(kuvaData)
    let uusiNimetState = nimet.slice()
    for (let i = 0; i < kuvaTaulukko.length; i++) {
      let nameIndex = kuvaTaulukko[i].name.substring(0, kuvaTaulukko[i].name.length - 4)
      uusiNimetState.push(nameIndex)
      setNimet(uusiNimetState)
    }
  }

  function birdFound(lintuNimi) {
    for(let i = 0; i < nimet.length; i++) {
      if(nimet[i] == lintuNimi) {
        let kuvaNimi = nimet[i]
        return kuvaNimi
      }
    }
    return null
  }

  function editData(lintuData) {
    let uusiTaulukko = []
    let lintuTaulukko = lintuData
  
    editkuvaData()
    for (let i = 0; i < lintuTaulukko.length; i++) {
      let lintu = lintuTaulukko[i]
      let lintuNimi = birdFound(lintu.Nimi)
      delete lintu.Suku

      if(lintuNimi){
        lintu.Kuva = `./lintuKuvat/${lintuNimi}.png`
        uusiTaulukko.push(lintu)
      }
    }
    return console.log('valmis', uusiTaulukko)
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => editData(lintuData)} title ="SHOW BIRDS"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
