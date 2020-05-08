import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, Modal, FlatList } from 'react-native'
import { TextInput, List, Snackbar } from 'react-native-paper'
import { ListItem } from 'react-native-elements'
import StickyHeader from './UI/StickyHeader'
import firebase from './firebaseConfig'
import Text from './UI/CustomTextComponent'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function ProfilePage (props) {

    const [showModal, toggleModal] = useState(false)
    const [visible, setVisible] = useState(false)
    const [spottedBirds, setSpottedBirds] = useState([])
    const [folder, setFolder] = useState({
        name: '',
        checked: false
    })
    const [folders, setFolders] = useState([])
 

    function saveFolderToDatabase() {
        firebase.database().ref('folders/').push(
          {'folderName': folder.name, 'checked': folder.checked}
        )
        setFolder({...folder, name: ''})
        toggleModal(!showModal)
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
    console.log(folders)

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

    const FolderIconGroup = ({item}) => {
        return (
            <View style={styles.iconGroup}>
                <Icon name='trash' size={25} color='red' onPress={() => deleteFolder(item)}/>
                <List.Icon icon='folder' 
                    color='#002f6c' 
                    style={{marginLeft: 25}}
                    onPress={() => console.log('hei')}/>
            </View>
        )
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
        return (
            <View>
                <ListItem
                    title={item.folderName}
                    onPress={() => console.log('hei')}
                    //bottomDivider
                    chevron
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
            <View style={styles.info}>
                <Text id='modalHeader'>Sinusta</Text>
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
                                <TextInput value={folder.name} onChangeText={(name) => setFolderPropertys(name)} mode="outlined" style={{height: 40, width: 200 }} label='Kansion nimi'/>
                                <TouchableHighlight 
                                    style={{...styles.modalButton, backgroundColor: "#2196F3"}}
                                    onPress={saveFolderToDatabase} 
                                >
                                <Text id='speciesButtonText'>Tallenna</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            <View style={styles.profile}>
                <Text id='modalHeader'>Kansiot</Text>
                <FlatList
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    data={folders}
                />
            </View>
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
        flex: 1
    },
    nav: {
        flex: 1.8
    },
    info: {
        flex: 4,
        backgroundColor: "#fff"
        
    },
    addFolder: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "#fff"
    },
    profile: {
        flex: 7,
        padding: 15,
        backgroundColor: "#fff"
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
        justifyContent: 'space-between',
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