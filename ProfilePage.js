import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, FlatList, KeyboardAvoidingView } from 'react-native'
import { TextInput, List, Snackbar, Card, Title, Paragraph } from 'react-native-paper'
import { ListItem } from 'react-native-elements'
import StickyHeader from './UI/StickyHeader'
import firebase from './firebaseConfig'
import Text from './UI/CustomTextComponent'
import Icon from 'react-native-vector-icons/FontAwesome'

const Statistics = ({obsData}) => {
    const [highestObsRate, setHighestObsRate] = useState({name: '', count: 0, img: ''})

    useEffect(() => {
        getHighestObservation()
    }, [obsData])

    function getHighestObservation() {
        let frequencyObj = {}, 
        compare = 0,
        mostFrequent = '',
        image = ''
        
        obsData.forEach(e => {
            if (!frequencyObj[e.name]) {
                frequencyObj[e.name] = 1
            } else {
                frequencyObj[e.name]++
            }
            if (frequencyObj[e.name] > compare) {
                compare = frequencyObj[e.name]
                mostFrequent = [e.name]
                image = e.image
            }
        })
        setHighestObsRate({...highestObsRate, name: mostFrequent.toString(), count: frequencyObj[mostFrequent], img: image})
    }
    console.log(highestObsRate)
    return ( 
        <View>
            <Card>
                <Card.Content style={{flexDirection: 'row'}}>
                    <Card.Content style={{flexDirection: 'column', width: '47%', marginLeft: 0}}>
                        <Title>Yleisin havainto</Title>
                        <Card.Content style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Paragraph>Nimi:</Paragraph>
                            <Paragraph style={{fontWeight: 'bold'}}>{highestObsRate.name}</Paragraph>
                        </Card.Content>
                        <Card.Content style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Paragraph>Havainnot:</Paragraph>
                            <Paragraph style={{fontWeight: 'bold'}}>{highestObsRate.count}</Paragraph>
                        </Card.Content>
                    </Card.Content>
                    <Card.Content style={{flexDirection: 'row', width: '53%'}}>
                        <Card.Cover source={{ uri: highestObsRate.img}} style={{height: 100, width: 240, backgroundColor: 'white'}}/>
                    </Card.Content>
                </Card.Content>
            </Card>
        </View>
    )
}

export default function ProfilePage (props) {
    const { navigate } = props.navigation
    const [visible, setVisible] = useState(false)
    const [spottedBirds, setSpottedBirds] = useState([])
    const [string, setString] = useState('')
    const [folder, setFolder] = useState({
        name: ''
    })
    const [folders, setFolders] = useState([])
 
    function saveFolderToDatabase() {
        firebase.database().ref('folders/').push(
          {'folderName': folder.name}
        )
        setFolder({...folder, name: ''})
        setVisible(true)
    }
 
    function deleteFolder(item) {
        let db = firebase.database().ref()
        let query = firebase.database().ref('folders/').orderByKey()
        query.once('value')
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              let pkey = childSnapshot.key
              let chval = childSnapshot.val()
    
              if (chval.folderName == item.folderName) {
                db.child('folders/'+pkey).remove()
                return true
              }
            })
          })
    }

    function setFolderPropertys(name) {
        setFolder({...folder, name: name})
    }

    function onDismissSnackBar() {
        setVisible(false)
    }

    useEffect(() => {
        firebase.database().ref('observations/').on('value', snapshot => {
            const data = snapshot.val()
            const birdObjs = Object.values(data)
            setSpottedBirds(birdObjs)
        })
    }, [])

    useEffect(() => {
        firebase.database().ref('folders/').on('value', snapshot => {
            const data = snapshot.val()
            if (data !== null) {
                const folderObjs = Object.values(data)
                setFolders(folderObjs)
            }
            else {
                setFolders([])
            }
        })
    }, [])

    const FolderIconGroup = ({item}) => {
        return (
            <View style={styles.iconGroup}>
                <Icon name='trash' size={25} color='red' onPress={() => deleteFolder(item)}/>
                <List.Icon icon='folder' 
                    color='#002f6c' 
                    style={{marginLeft: 25}}
                />
            </View>
        )
    }

    function sendProperFolderData(item) {
        let data = []
        for (let i = 0; i < spottedBirds.length; i++) {
            let obsObj = spottedBirds[i]
            if (obsObj.folderName === item.folderName) {
                data.push(obsObj)
            }
        }
        navigate('Kansio', {obs: data})
    }

    const keyExtractor = (item, index) => index.toString()

    const folderItem = ({ item }) => {
        return (
            <View>
                <ListItem
                    titleStyle={{fontFamily: 'montserrat-semibold', fontSize: 14}}
                    title={item.folderName}
                    onPress={() => sendProperFolderData(item)}
                    chevron
                    bottomDivider
                    leftIcon={<FolderIconGroup item={item}/>}
                />
            </View>
        )
    }

    return (
        <View style={styles.master}>
            <View style={styles.nav}>
                <StickyHeader title={'Profiili'}/>
            </View>
            <KeyboardAvoidingView style={styles.keyboardView} behavior='padding' enabled>
                <View style={styles.info}>
                    <Text id='modalHeader'>Sinusta</Text>
                    <Statistics obsData={spottedBirds} />
                </View>
                <View style={styles.folders}>
                    <Text id='modalHeader'>Kansiot</Text>
                    <FlatList
                        keyExtractor={keyExtractor}
                        renderItem={folderItem}
                        data={folders}
                    />
                </View>
                <Text id='profileText'>Lisää kansio</Text>
                <View style={styles.addFolder}>
                    <TextInput value={folder.name} onChangeText={(name) => setFolderPropertys(name)} mode="outlined" style={{height: 40, width: 200}} label='Nimi'/>
                    <TouchableHighlight style={styles.openButton} onPress={saveFolderToDatabase}>
                        <Text id='speciesButtonText'>Lisää</Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
            <View>
                <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={2500} style={{borderRadius: 20, backgroundColor: '#002f6c'}}>
                    Kansio lisätty!
                </Snackbar>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    master: {
        flex: 1,
        backgroundColor: '#fff'
    },
    nav: {
        flex: 1.3
    },
    keyboardView: {
        flex: 8.7
    },
    addFolder: {
        marginLeft: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
        marginTop: 20
    },
    folders: {
        flex: 6,
        padding: 15
    },
    iconGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    openButton: {
        backgroundColor: "#2196F3",
        height: 40,
        width: 80,
        marginRight: 80,
        marginTop: 5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})