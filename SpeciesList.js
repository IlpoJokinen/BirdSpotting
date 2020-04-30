import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import StickyHeader from './UI/StickyHeader'

const SpeciesList = (props) => {
    const { navigate } = props.navigation
    let propFamily = props.route.params.family
    let propBirds = props.route.params.birds
    const [birdSpecies, setBirdSpecies] = useState([])
    
    useEffect(() => {
        getBirdNamesByFamily(propFamily, propBirds)
    }, [])

    function getBirdNamesByFamily(propFamily, propBirds) {
        let species = []
        for (let i = 0; i < propBirds.length; i++) {
            let bird = propBirds[i]
            if (bird.Heimo === propFamily && !species.includes(bird.Nimi)) {
                species.push(bird.Nimi)
            }
        }
        setBirdSpecies(species)
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
        return (
            <View>
                <ListItem
                    title={item}
                    bottomDivider
                    chevron
                    onPress={() => navigate('Laji', {birds: propBirds, specie: item})}
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
                    data={birdSpecies}
                    ListHeaderComponent={<StickyHeader title={'Suomen linnut'}/>}
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
export default SpeciesList
