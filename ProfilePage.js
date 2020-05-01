import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import StickyHeader from './UI/StickyHeader'
import firebase from './firebaseConfig'
import Text from './UI/CustomTextComponent'

export default function ProfilePage (props) {
    
    const { navigation } = props.navigation
    const [spottedBirds, setSpottedBirds] = useState([])
  
    useEffect(() => {
        firebase.database().ref('observations/').on('value', snapshot => {
            const data = snapshot.val()
            const birdObjs = Object.values(data)
            setSpottedBirds(birdObjs)
            console.log(spottedBirds)
        })
    }, [])

    return (
        <View style={styles.master}>
            <View style={styles.nav}>
                <StickyHeader title={'Profiili'} page={0}/>
            </View>
            <View style={styles.profile}>
                <Text id='profileText'>Lisää kansio</Text>
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
        flex: 7,
        padding: 15
    }
})