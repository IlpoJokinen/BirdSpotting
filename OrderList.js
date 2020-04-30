import birdsJson from './birds.json'
import picturesJson from './pictureNames.json'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import StickyHeader from './UI/StickyHeader'

export default function OrderList(props) {
    const { navigate } = props.navigation
    const [birdOrders, setBirdOrders] = useState([])
    const birdData = birdsJson
    const [pictureData, setPictureData] = useState({})
    const [names, setNames] = useState([])
    const [birds, setBirds] = useState([])
    
    useEffect(() => {
      setPictureData(picturesJson)
    }, [picturesJson])
  
    useEffect(() => {
      editPictureData()
      editData()
    }, [birdsJson])
  
    function editPictureData() {
      let pictureArray = Object.values(pictureData)
      let newNameState = names.slice()
      for (let i = 0; i < pictureArray.length; i++) {
        let nameIndex = pictureArray[i].name.substring(0, pictureArray[i].name.length - 4)
        newNameState.push(nameIndex)
        setNames(newNameState)
      }
    }
  
    function birdFound(birdName) {
      for(let i = 0; i < names.length; i++) {
        if(names[i] == birdName) {
          let pictureName = names[i]
          return pictureName
        }
      }
      return null
    }
  
    function editData() {
      let birdArray = birdData
      for (let i = 0; i < birdArray.length; i++) {
        let bird = birdArray[i]
        let birdName = birdFound(bird.Nimi)
        delete bird.Suku
  
        if(birdName){
          console.log('ss',bird)
          bird.Kuva = `./birdPictures/${birdName}.png`
          bird.omatHavainnot = 0
          setBirds(prevState => ([...prevState, bird]))
        }
      }
      getOrders(birds)
      console.log('ss',birds)
    }
  
    
    function getOrders(birds) {
        console.log('ss', birds)
        let orders = []
        for (let i = 0; i < birds.length; i++) {
            let bird = birds[i]
            if (!orders.includes(bird.Lahko)) {
                orders.push(bird.Lahko)
            }
        }
        setBirdOrders(orders)
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
        return (
            <View>
                <ListItem
                    title={item}
                    onPress={() => navigate('Heimot', {birds: birds, order: item})}
                    bottomDivider
                    chevron
                />
            </View>
        )
    }

    return (
        <View style={styles.master}>
            <View style={styles.list}>
                <FlatList
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    data={birdOrders}
                    ListHeaderComponent={<StickyHeader title={'Suomen linnut'}/>}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    master: {
      flex: 1,
    },
    list: {
        flex: 1,
        flexDirection: 'column',
        width: 370
    }
})