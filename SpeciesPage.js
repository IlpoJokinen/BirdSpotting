import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card, Button, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const SpeciesPage = (props) => {
 
    navigationOptions = {title: 'Laji',}
    const { params } = props.navigation.state
    const { navigate } = props.navigation
    let propSpecie = params.specie
    let propBirds = params.birds

    const [bird, setBird] = useState({
        latinName: '',
        finnishName: '',
        order: '',
        family: '',
        appearance: '',
        endangerment: '',
        observation: 0,
        picture: '',
        ownObservation: 0
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
        ownObservation: 0
    }

    useEffect(() => {
        getBird(propSpecie, propBirds)
    }, [])

    function getBird(propSpecie, propBirds) {
        console.log(propSpecie)
  
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
                newBird.ownObservation = bird.omatHavainnot
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
             ownObservation: newBird.ownObservation
        })
    }
   /* function spottedBirdToDatabase() {
        firebase.database().ref('birdData/').push(
          {'name': bird.finnishName, 'obs': bird.ownObservation}
        )
        setBird({...bird, ownObservation: newBird.ownObservation + 1})
        navigate('ProfilePage', {birdSpotted: bird.finnishName, obs: bird.ownObservation})
    }*/
    

    return (
        <View style={styles.master}>
          <View style={styles.image}>
              <Image style={{height: 100, width: 100}}src={bird.picture}></Image>
        </View>
          <View style={styles.infoBox}>
        <Card title={`${bird.finnishName + '\n'}  -  ${'\n' + bird.latinName}`}>
            <View style={styles.cardItem}>
                <Text style={{marginBottom: 30}}>Lahko:</Text>
                <Text>{bird.order}</Text>
            </View>
            <View style={styles.cardItem}>
                <Text style={{marginBottom: 30}}>Heimo:</Text>
                <Text>{bird.family}</Text>
           </View>
           <View style={styles.cardItem}>
                <Text style={{marginBottom: 30}}>Uhanalaisuus:</Text>
                <Text>{bird.endangerment}</Text>
            </View>
           <View style={styles.cardItem}>
            <Text style={{marginBottom: 30}}>Esiintyminen Suomessa:</Text>
            <Text> {bird.appearance}</Text>
            </View>
           <View style={styles.cardItem}>
            <Text style={{marginBottom: 30}}>Havainnot Suomessa:</Text>
            <Text>{bird.observation}</Text>
            </View>
                <Button 
                buttonStyle={{borderRadius: 20, width: 120, marginLeft: 'auto', marginRight: 'auto'}}
                title='Spotted!'
                onPress={spottedBirdToDatabase}
                icon={ 
                <Icon
                    name="plus"
                    size={15}
                    color="white"
                    style={{marginRight: 5}}
                />
                }/>
            </Card>
          </View>
        </View>
    )
}
const styles = StyleSheet.create({
    master: {
      flex: 1,
      backgroundColor: '#002F6C'
    },
    image: {
        flex: 3,
        marginBottom: -50
    },
    infoBox: {
        flex: 6
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

SpeciesPage.navigationOptions = ({navigate}) => ({title: 'Laji'})
export default SpeciesPage
