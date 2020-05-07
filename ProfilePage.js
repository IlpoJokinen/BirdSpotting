import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, Modal } from 'react-native'
import { TextInput } from 'react-native-paper'
import StickyHeader from './UI/StickyHeader'
import firebase from './firebaseConfig'
import Text from './UI/CustomTextComponent'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function ProfilePage (props) {
    
    const [showModal, toggleModal] = useState(false)
    const [spottedBirds, setSpottedBirds] = useState([])
    const [folder, setFolder] = useState({
        name: '',
        spottedBirds: []
    })
    
    useEffect(() => {
        let birdArray = []
        firebase.database().ref('observations/').on('value', snapshot => {
            const data = snapshot.val()
            const birdObjs = Object.values(data)
            let birds = birdObjs.map(b => {
                birdArray.push(b)
            })
        })
        setSpottedBirds(birdArray)
    }, [])
    
    const IconGroup = () => {
        return (
            <View style={styles.iconGroup}>
                <Icon name="plus"
                    size={20}
                    color="white"
                >
                </Icon>
                <Icon name="folder-open"
                    size={30}
                    color="white"
                >
                </Icon>
            </View>
        )
    }

    return (
        <View style={styles.master}>
            <View style={styles.nav}>
                <StickyHeader title={'Profiili'}/>
            </View>
            <View style={styles.addFolder}>
                <Text id='profileText'>Lisää kansio</Text>
                <TouchableHighlight style={styles.folderButton} onPress={() => toggleModal(true)}>
                 <IconGroup />
                </TouchableHighlight>
            </View>
            <Modal animationType='slide' transparent={true} visible={showModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalTop}>
                                <View style={styles.modalTopCross}>
                                    <Icon
                                        style={{marginRight: 8}}
                                        name="times"
                                        size={31}
                                        color="white"
                                        onPress={() => toggleModal(!showModal)}
                                    />
                                </View>
                                <View style={styles.modalTopHeader}>
                                    <Text id='header'>Lisää kansio</Text>
                                </View>
                            </View>
                            <View style={styles.modalBottom}>
                                <TextInput value={folder.name} onChangeText={(name) => setFolder({...folder, name: name})}mode="outlined" style={{height: 40, width: 200 }} label='Kansion nimi'/>
                                <TouchableHighlight 
                                    style={{...styles.modalButton, backgroundColor: "#2196F3"}} 
                                    onPress={console.log('moi')}
                                >
                                <Text id='speciesButtonText'>Tallenna</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            <View style={styles.profile}>
                <Text id='modalHeader'>Kansiot</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    master: {
        flex: 1
    },
    nav: {
        flex: 1.3
    },
    addFolder: {
        flex: 1.5,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    profile: {
        flex: 7,
        padding: 15
    },
    folderButton: {
        borderColor: "#2196F3",
        backgroundColor: "#2196F3",
        borderRadius: 30,
        padding: 10,
        elevation: 2,
        width: 75,
        marginLeft: 85
    },
    modalButton: {
        borderColor: "#2196F3",
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 90,
        marginLeft: 85
    },
    iconGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 'auto',
        marginTop: 'auto'
    },  
    modalView: {
        margin: 10,
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTopCross: {
        backgroundColor: '#2196F3',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modalTopHeader: {
        backgroundColor: '#2196F3',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    modalBottom: {
        padding: 20
    }
})