import React, { useEffect, useState } from 'react'
import * as SQLite from'expo-sqlite'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
const Header = () => {
 
    return (
       <View style={styles.header}>
           <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20,  color: 'white'}}>Bongatut linnut</Text>
        </View>

    )
}
/*if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const firebaseConfig = {
    apiKey: "AIzaSyAMEQcyVwI1Oj5SOKFNY18a7QNHWDla11c",
    authDomain: "birdspotting-25cbd.firebaseapp.com",
    databaseURL: "https://birdspotting-25cbd.firebaseio.com",
    projectId: "birdspotting-25cbd",
    storageBucket: "birdspotting-25cbd.appspot.com",
    messagingSenderId: "408406393053",
    appId: "1:408406393053:web:e9c400caee9416cae89b34",
    measurementId: "G-0TLV1XGL29"
}*/

export default function ProfilePage (props) {
    const [birds, setBirds] = useState([])
    const { params } = props.navigation.state
    let birdSpotted = params.birdSpotted
    let ownObs = params.obs
    const [data, setData] = useState([])
    console.log('ownObs:', ownObs)

    /*useEffect(() => {
        if(!birds.includes(birdSpotted)) {
            birds.push(birdSpotted) //FIKSAA!!!!!
        }
    }, [])*/

    //const auth = require("firebase/auth")
    const db = SQLite.openDatabase('coursedb.db')


    /*firebase.database().ref('birdData/')
    
    useEffect(() => {
        firebase.database().ref('birdData/').on('value', snapshot => {
        const data = snapshot.val()
        const validData = Object.values(data)
        setData(validData)
        })
        console.log('data', validData)
    }, [])*/
    

    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('create table if not exists birds (id integer primary key not null, name text not null, obs integer not null);')
        }, null, updateList)
    }, [])

    function updateList() {
        db.transaction(tx => {
            tx.executeSql('select * from birds;', [], (_, {rows}) =>
            setBirds(rows._array)
            )
        })
    }
    function saveBird() {
        db.transaction(tx => {
            tx .executeSql('insertintocourse(credits,title)values(?,?);',
            [parseInt(credit), title])
        }, null, updateList)
    }
  
   const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
        let string = ''
        
        console.log(item)
        return (
            <View>
                <ListItem
                    title={item}
                    bottomDivider
                />
            </View>
        )
    }
    return (
        <View style={styles.master}>
            <View>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={birds}
                    renderItem={renderItem}
                    ListHeaderComponent={<Header />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    master: {
        flex: 1
    },
      header: {
        width: '100%', 
        height: 50, 
        backgroundColor: '#002f6c',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})