import React, { useEffect, useState } from 'react'
import RadioGroup from 'react-native-radio-button-group'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, View, Modal, TouchableHighlight } from 'react-native'
import { TextInput, List } from 'react-native-paper'
import firebase from '../firebaseConfig'
import Text from './CustomTextComponent'

const FolderList = ({spottedBird, setSpottedBird}) => {
    const [folders, setFolders] = useState([])
    const [expand, toggleExpand] = useState(false)

    useEffect(() => {
        firebase.database().ref('folders/').on('value', snapshot => {
            const data = snapshot.val()
            if (data !== null) {
                const folderObjs = Object.values(data)
                setFolders(folderObjs)
            }
        })
    }, [])

    function handlePress() {
        toggleExpand(!expand)
    }

    const listOfFolders = folders.map(f => {
        let color = '#969696'
        if(spottedBird.folderName === f.folderName) {
            color = '#002f6c'
        }
        return (
                <List.Item 
                    title={f.folderName} 
                    left={props => <List.Icon {...props} icon='folder' color={color} />}
                    onPress={() => setSpottedBird({...spottedBird, folderName: f.folderName})}
                />
        )
    })

    return <View>
        <List.Section>
            <List.Accordion
                title='Valitse kansio'
                expanded={expand}
                onPress={handlePress}
            >
                {listOfFolders}
            </List.Accordion>
        </List.Section>
        </View>
}

const ObservationModal = ({toggleModal, modal, birdName, setVisible}) => {
    const [spottedBird, setSpottedBird] = useState({folderName: '', sex: '', location: '', obs: 1, obsTime: ''})

    const options1 = [
        {id: 0, label: 'Koiras'},
        {id: 1, label: 'Naaras'}
    ], options2 = [
        {id: 0, label: 'Aamu'},
        {id: 1, label: 'Päivä'},
        {id: 2, label: 'Ilta'},
        {id: 3, label: 'Yö'},
    ]

    
    function spottedBirdToDatabase() {
        firebase.database().ref('observations/').push(
          {'folderName': spottedBird.folderName, 'name': birdName, 'obs': spottedBird.obs, 'time': spottedBird.obsTime, 'location': spottedBird.location, 'sex': spottedBird.sex}
        )
        toggleModal(!modal)
        setVisible(true)
    }

    return (
        <View style={styles.master}>
            <Modal animationType='slide' transparent={true} visible={modal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalTop}>
                            <Text id='modalBirdName'>{birdName}</Text>
                            <Icon
                                name="times"
                                size={31}
                                color="white"
                                onPress={() => toggleModal(!modal)}
                                style={{marginLeft: 185}}
                            />
                        </View>
                        <View style={styles.modalBottom}>
                            <Text id='modalHeader'>Havainto tiedot</Text>
                            <Text id='modalText'>Havainnon biotooppi</Text>
                            <TextInput value={spottedBird.location} onChangeText={(location) => setSpottedBird({...spottedBird, location: location})} mode="outlined" style={{height: 40, width: 200}} label='kangasmetsä, lehto...'/>
                            <Text id='modalText'>Sukupuoli</Text>
                            <RadioGroup options={options1} onChange={(option) => setSpottedBird({...spottedBird, sex: option.label})} horizontal={true} circleStyle={{fillColor: '#2196F3'}}/>
                            <Text id='modalText'>Havainnon ajankohta</Text>
                            <RadioGroup options={options2} onChange={(option) => setSpottedBird({...spottedBird, obsTime: option.label})} horizontal={true} circleStyle={{fillColor: '#2196F3'}}/>
                            <Text id='modalText'>Tallennus kansioon</Text>
                            <FolderList spottedBird={spottedBird} setSpottedBird={setSpottedBird}/>
                            <TouchableHighlight 
                                style={{...styles.openButton, backgroundColor: "#2196F3"}} 
                                onPress={() => spottedBirdToDatabase()}
                    
                            >
                            <Text id='speciesButtonText'>Tallenna</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({  
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 'auto',
        marginTop: 'auto'
    },  
    modalView: {
        margin: 10,
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
    modalTop: {
        backgroundColor: '#2196F3',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    modalBottom: {
        padding: 20
    },
    openButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 120,
        marginLeft: 85
    }, 
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
})
export default ObservationModal