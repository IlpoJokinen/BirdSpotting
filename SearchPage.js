import React, { useState, useEffect } from 'react'
import birdsJson from './birds.json'
import { Searchbar } from 'react-native-paper'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { ListItem } from 'react-native-elements'
import Text from './UI/CustomTextComponent'
import StickyHeader from './UI/StickyHeader'

const SearchPage = () => {
    const birds = birdsJson
    const [state, setState] = useState({string: ''})
    const [names, setNames] = useState([])

    function getBirdNames() {
        let birdNames = []
        for(let i = 0; i < birds.length; i++) {
            let editedName = birds[i].Nimi[0].toUpperCase() + birds[i].Nimi.slice(1)
            if (editedName.includes(state.string)) {
                birdNames.push(editedName)
            }
        }
        let sortedNames = birdNames.sort()
        setNames(sortedNames)
    }

    useEffect(() => {
        getBirdNames()
    }, [state])

 


    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
  
        return (
            <View>
                <ListItem
                    titleStyle={{fontFamily: 'montserrat-semibold', fontSize: 14}}
                    title={item}
                    //onPress={} TÄSTÄ PITÄISI PÄÄSTÄ SpeciesPage.js:ään!
                    chevron
                    leftIcon={<Image source={require('./assets/images/crow-solid.png')} style={{width: 30, height: 30}}/>}
                />
            </View>
        )
    }
    return (
        <View style={styles.master}>
             <View style={styles.nav}>
                <StickyHeader title={'Haku'}/>
            </View>
            <View style={styles.text}><Text id='searchHeader'>Etsi lintu</Text></View>
            <View style={styles.search} >
                <Searchbar
                    placeholder="Etsi..."
                    onChangeText={(string) => setState({string: string})}
                />
            </View>
            <View style={styles.results}>
                <FlatList
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    data={names}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    master: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#002f6c'
    },
    nav: {
        flex: 0.7,
    }, 
    text: {
        flex: 0.8,
        justifyContent: 'flex-end'
    },
    search: {
        flex: 1,
        justifyContent: 'center',
        width: '80%'
    },
    results: {
        flex: 3,
        width: '100%',
    }
})
export default SearchPage