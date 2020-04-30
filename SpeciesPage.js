import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native'
import { Card } from 'react-native-elements'
import RadioGroup from 'react-native-radio-button-group'
import { TextInput } from 'react-native-paper'
import StickyHeader from './UI/StickyHeader'
import { Snackbar, Button} from 'react-native-paper'
import firebase from './config'
import Icon from 'react-native-vector-icons/FontAwesome'

const SpeciesPage = (props) => {
    //const { navigate } = props.navigation
    const [showModal, toggleModal] = useState(false)
    let propSpecie = props.route.params.specie
    let propBirds = props.route.params.birds
    const [visible, setVisible] = useState(false)
    const [bird, setBird] = useState({
        latinName: '',
        finnishName: '',
        order: '',
        family: '',
        appearance: '',
        endangerment: '',
        observation: 0,
        picture: '',
    })
    let newBird = {
        latinName: '',
        finnishName: '',
        order: '',
        family: '',
        appearance: '',
        endangerment: '',
        observation: 0,
        picture: '',
    }
    const [spottedBird, setSpottedBird] = useState({sex: '', location: '', obs: 1, obsTime: ''})
    const options1 = [
        {id: 0, label: 'Koiras'},
        {id: 1, label: 'Naaras'}
    ], options2 = [
        {id: 0, label: 'Aamu'},
        {id: 1, label: 'Päivä'},
        {id: 2, label: 'Ilta'},
        {id: 3, label: 'Yö'},
    ]
    useEffect(() => {
        getBird(propSpecie, propBirds)
    }, [])

    function getBird(propSpecie, propBirds) {
        for (let i = 0; i < propBirds.length; i++) {
            let bird = propBirds[i]
            if (bird.Nimi === propSpecie) {
                newBird.latinName = bird.Laji
                newBird.finnishName = bird.Nimi.charAt(0).toUpperCase() + bird.Nimi.substring(1) 
                newBird.order = bird.Lahko
                newBird.family = bird.Heimo
                newBird.appearance = bird.Esiintyminen
                newBird.endangerment = bird.Uhanalaisuusluokka
                newBird.observation = bird.Havaintomäärä
                newBird.picture = `require(${bird.Kuva})`
            }
        }
        setBird({...bird,
             latinName: newBird.latinName,
             finnishName: newBird.finnishName,
             order: newBird.order,
             family: newBird.family,
             appearance: newBird.appearance,
             endangerment: newBird.endangerment,
             observation: newBird.observation,
             picture: newBird.picture,
        })
    }

    function spottedBirdToDatabase() {
        firebase.database().ref('observations/').push(
          {'name': bird.finnishName, 'obs': spottedBird.obs, 'time': spottedBird.obsTime, 'location': spottedBird.location, 'sex': spottedBird.sex}
        )
        toggleModal(!showModal)
        setVisible(true)
    }

    function onToggleSnackBar() {
        setVisible(!visible)
    }

    function onDismissSnackBar() {
        setVisible(false)
    }

    return (
        <View style={styles.master}>
            <View style={styles.nav}>
                <StickyHeader />
            </View>
            <View style={styles.image}>
            </View>
            <View style={styles.infoBox}>
                <View style={styles.card}>
                    <Card title={`${bird.finnishName + '\n'}  -  ${'\n' + bird.latinName}`}>
                        <View style={styles.cardItem}>
                            <Text style={styles.rows}>Lahko:</Text>
                            <Text>{bird.order}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.rows}>Heimo:</Text>
                            <Text>{bird.family}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.rows}>Uhanalaisuus:</Text>
                            <Text>{bird.endangerment}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.rows}>Esiintyminen Suomessa:</Text>
                            <Text> {bird.appearance}</Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={styles.rows}>Havainnot Suomessa:</Text>
                            <Text>{bird.observation}</Text>
                        </View>
                        <TouchableHighlight style={styles.openButton} onPress={() => toggleModal(true)}>
                            <Text style={styles.textStyle}>Bongattu!</Text>
                        </TouchableHighlight>
                    </Card>
                </View>
                <Modal animationType='slide' transparent={true} visible={showModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalTop}>
                                <Text style={styles.modalBirdName}>{bird.finnishName}</Text>
                                <Icon
                                    name="times"
                                    size={30}
                                    color="white"
                                    onPress={() => toggleModal(!showModal)}
                                    style={{marginLeft: 200}}
                                />
                            </View>
                            <View style={styles.modalBottom}>
                                <Text style={{color: '#002f6c', fontSize: 23, textAlign: 'center'}}>Havainto tiedot</Text>
                                <Text style={styles.modalText}>Havainnon biotooppi</Text>
                                <TextInput value={spottedBird.location} onChangeText={(location) => setSpottedBird({...spottedBird, location: location})} mode="outlined" style={{height: 40, width: 200}} label='kangasmetsä, lehto...'/>
                                <Text style={styles.modalText}>Sukupuoli</Text>
                                <RadioGroup options={options1} onChange={(option) => setSpottedBird({...spottedBird, sex: option.label})} horizontal={true} circleStyle={{fillColor: '#2196F3'}}/>
                                <Text style={styles.modalText}>Havainnon ajankohta</Text>
                                <RadioGroup options={options2} onChange={(option) => setSpottedBird({...spottedBird, obsTime: option.label})} horizontal={true} circleStyle={{fillColor: '#2196F3'}}/>
                                <TouchableHighlight 
                                    style={{...styles.openButton, backgroundColor: "#2196F3"}} 
                                    onPress={() => spottedBirdToDatabase()}
                                >
                                    <Text style={styles.textStyle}>Tallenna</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={2500} >
                    Havainto lisätty profiiliisi!
                </Snackbar>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    master: {
      flex: 1,
      backgroundColor: '#002f6c'
    },
    nav: {
        flex: 1
    },
    image: {
        flex: 2,
        marginBottom: -50
    },
    infoBox: {
        flex: 6,
        backgroundColor: '#EAEBED'
    },
    rows: {
        marginBottom: 30,
        fontWeight: 'bold'
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
        alignItems: 'center'
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
    modalText: {
        fontSize: 15,
        color: '#2196F3',
        marginBottom: 10,
        marginTop: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalBirdName: {
        marginLeft: 15,
        color: "white",
        fontWeight: 'bold',
        fontSize: 13
    }
})
export default SpeciesPage