import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { Snackbar, Dialog, Portal, Button, Provider  } from 'react-native-paper'
import StickyHeader from './UI/StickyHeader'
import firebase from './firebaseConfig'
import Text from './UI/CustomTextComponent'
import Modal from './UI/ObservationModal'

const SpeciesPage = (props) => {
    const { navigate } = props.navigation
    const [showModal, toggleModal] = useState(false)
    let propSpecie = props.route.params.specie[0].toLowerCase() + props.route.params.specie.slice(1)
    let propBirds = props.route.params.birds
    const [visible, setVisible] = useState(false)
    const [warning, openWarning] = useState(false)
    const [bird, setBird] = useState({
        latinName: '',
        finnishName: '',
        order: '',
        family: '',
        appearance: '',
        endangerment: '',
        observation: 0,
    })
    let newBird = {
        latinName: '',
        finnishName: '',
        order: '',
        family: '',
        appearance: '',
        endangerment: '',
        observation: 0,
    }
    
    useEffect(() => {
        getBird(propSpecie, propBirds)
    }, [props])

 

    async function getBird(propSpecie, propBirds) {
        const picRef = firebase.storage().ref(`BirdPictures/${propSpecie}.png`)
        const imageUrl = await picRef.getDownloadURL()

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
                newBird.picture = imageUrl
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
             picture: newBird.picture
        })
    }

    function onDismissSnackBar() {
        setVisible(false)
    }

    function showWarning() {
        openWarning(true)
    }

    function hideWarning() {
        openWarning(false)
        toggleModal(!showModal)
    }

    return (
        <Provider>
            <View style={styles.master}>
                <View style={styles.nav}>
                    <StickyHeader backIcon={true} navigate={navigate}/>
                </View>
                <View style={styles.imageBox}>
                    <Image source={{uri: bird.picture}} style={styles.image}/>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.card}>
                        <Card title={`${bird.finnishName + '\n'}  -  ${'\n' + bird.latinName}`}>
                            <View style={styles.cardItem}>
                                <Text id='speciesText'>Lahko:</Text>
                                <Text id='speciesText'>{bird.order}</Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text id='speciesText'>Heimo:</Text>
                                <Text id='speciesText'>{bird.family}</Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text id='speciesText'>Uhanalaisuus:</Text>
                                <Text id='speciesText'>{bird.endangerment}</Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text id='speciesText'>Esiintyminen:</Text>
                                <Text id='speciesText'> {bird.appearance}</Text>
                            </View>
                            <View style={styles.cardItem}>
                                <Text id='speciesText'>Havainnot Suomessa:</Text>
                                <Text id='speciesText'>{bird.observation}</Text>
                            </View>
                            <TouchableHighlight style={styles.openButton} onPress={() => toggleModal(true)}>
                                <Text id='speciesButtonText'>Bongattu!</Text>
                            </TouchableHighlight>
                        </Card>
                    </View>
                    <Modal toggleModal={toggleModal} modal={showModal} birdName={bird.finnishName} birdPic={bird.picture} setVisible={setVisible} showWarning={showWarning} />
                    <Portal>
                        <Dialog visible={warning} onDismiss={hideWarning}>
                            <Dialog.Title>Hupsista!</Dialog.Title>
                            <Dialog.Content>
                                <Text id='profileText'>Muista täyttää kaikki kentät ennen kuin tallennat havaintosi. Kentät </Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideWarning}>Ok</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
                <View>
                    <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={2500} style={{borderRadius: 20, backgroundColor: '#002f6c'}}>
                        Havainto lisätty profiiliisi!
                    </Snackbar>
                </View>
            </View>
        </Provider>
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
    imageBox: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 190,
        width: 190,
        borderRadius: 190/2,
        borderWidth: 2,
        borderColor: '#fff'
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
        shadowRadius: 3.84
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 'auto',
        marginTop: 'auto'
    }, 
    openButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 120,
        marginLeft: 115
    }, 
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
})
export default SpeciesPage