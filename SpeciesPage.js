import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Modal, TouchableHighlight, Image } from 'react-native'
import { Card } from 'react-native-elements'
import RadioGroup from 'react-native-radio-button-group'
import { TextInput, List, Snackbar, Checkbox } from 'react-native-paper'
import StickyHeader from './UI/StickyHeader'
import firebase from './firebaseConfig'
import Text from './UI/CustomTextComponent'
import Icon from 'react-native-vector-icons/FontAwesome'

const SpeciesPage = (props) => {
    const { navigate } = props.navigation
    const [showModal, toggleModal] = useState(false)
    let propSpecie = props.route.params.specie[0].toLowerCase() + props.route.params.specie.slice(1)
    let propBirds = props.route.params.birds
    const [folders, setFolders] = useState([])
    const [visible, setVisible] = useState(false)
    const [expand, toggleExpand] = useState(false)
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
    useEffect(() => {
        getBird(propSpecie, propBirds)
    }, [])

    useEffect(() => {
        firebase.database().ref('folders/').on('value', snapshot => {
            const data = snapshot.val()
            if (data !== null) {
                const folderObjs = Object.values(data)
                setFolders(folderObjs)
            }
        })
    }, [])

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

    function spottedBirdToDatabase() {
        firebase.database().ref('observations/').push(
          {'folderName': spottedBird.folderName, 'name': bird.finnishName, 'obs': spottedBird.obs, 'time': spottedBird.obsTime, 'location': spottedBird.location, 'sex': spottedBird.sex}
        )
        toggleModal(!showModal)
        setVisible(true)
    }

    function onDismissSnackBar() {
        setVisible(false)
    }

    function handlePress() {
        toggleExpand(!expand)
    }
    console.log(spottedBird)


    const FolderList = () => {
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

    return (
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
                <Modal animationType='slide' transparent={true} visible={showModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalTop}>
                                <Text id='modalBirdName'>{bird.finnishName}</Text>
                                <Icon
                                    name="times"
                                    size={31}
                                    color="white"
                                    onPress={() => toggleModal(!showModal)}
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
                                <FolderList />
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
            <View style={{textAlign: 'center'}}>
                <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={2500} style={{borderRadius: 20, backgroundColor: '#002f6c'}}>
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
    imageBox: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 148,
        width: 148,
        borderRadius: 148/2,
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
export default SpeciesPage