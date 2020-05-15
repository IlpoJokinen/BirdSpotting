import birdsJson from './birds.json'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import StickyHeader from './UI/StickyHeader'

export default function OrderList(props) {
    const { navigate } = props.navigation
    const [birdOrders, setBirdOrders] = useState([])
    const birdData = birdsJson

    useEffect(() => {
        editData()
    }, [])

    function editData() {
      let birdArray = birdData
      let orders = []
      for (let i = 0; i < birdData.length; i++) {
        let bird = birdArray[i]
        delete bird.Suku
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
                    titleStyle={{fontFamily: 'montserrat-semibold', fontSize: 14}}
                    title={item}
                    onPress={() => navigate('Heimot', {birds: birdData, order: item})}
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
                    ListHeaderComponent={<StickyHeader title={'Suomen linnut'} view={0}/>}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    master: {
      flex: 1
    },
    list: {
        flex: 1,
        flexDirection: 'column',
        width: 370
    }
})