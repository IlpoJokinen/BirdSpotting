import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { ListItem } from 'react-native-elements'
import StickyHeader from './UI/StickyHeader'
import firebase from './config'

export default function ProfilePage (props) {
    const { navigation } = props.navigation
    const [spottedBirds, setSpottedBirds] = useState([])
  
    useEffect(() => {
        firebase.database().ref('observations/').on('value', snapshot => {
            const data = snapshot.val()
            const birdObjs = Object.values(data)
            console.log('jou', birdObjs)
            setSpottedBirds(birdObjs)
        })
    }, [])

   /*const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
        console.log(item)
        return (
            <View>
                <ListItem
                    title={item}
                    bottomDivider
                />
            </View>
        )
    }*/

    return (
        <View style={styles.master}>
            <View style={styles.nav}>
                <StickyHeader title={'Profiili'}/>
            </View>
            <View style={styles.profile}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    master: {
        flex: 1
    },
    nav: {
        flex: 1
    },
    profile: {
        flex: 7
    }
})