import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import StickyHeader from './UI/StickyHeader'

export default function FamilyList(props) {
    const { navigate } = props.navigation
    let propOrder = props.route.params.order
    let propBirds = props.route.params.birds
    const [birdFamilies, setBirdFamilies] = useState([])

    useEffect(() => {
        getFamiliesByOrder(propOrder, propBirds)
    }, [])

    function getFamiliesByOrder(propOrder, propBirds) {
        let families = []
        for (let i = 0; i < propBirds.length; i++) {
            let bird = propBirds[i]
            if (bird.Lahko === propOrder && !families.includes(bird.Heimo)) {
                families.push(bird.Heimo)
            }
        }
        setBirdFamilies(families)
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
        return (
            <View>
                <ListItem
                    titleStyle={{fontFamily: 'montserrat-semibold', fontSize: 14}}
                    title={item}
                    bottomDivider
                    chevron
                    onPress={() => navigate('Lajit', {birds: propBirds, family: item})}
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
                    data={birdFamilies}
                    ListHeaderComponent={<StickyHeader title={'Suomen linnut'} backIcon={true} navigate={navigate} view={1}/>}
                    stickyHeaderIndices={[0]}
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