import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import Text from './CustomTextComponent'

const Statistics = ({obsData}) => {
    const [highestObsRate, setHighestObsRate] = useState({name: '', count: 0, img: ''})
    
    useEffect(() => {
        getHighestObservation()
    }, [obsData])

    function getHighestObservation() {
        if (obsData.length) {
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
        } else {
            setHighestObsRate(null)
        }
    }

    return ( 
        <View>
            {highestObsRate !== null ?
                <Card style={{width: '100%'}}>
                    <Card.Content style={{flexDirection: 'row'}}>
                        <Card.Content style={{flexDirection: 'column', width: '60%', marginLeft: 0}}>
                            <Title style={{textAlign: 'center'}}>Yleisin havainto</Title>
                            <Card.Content style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <Paragraph>Nimi:</Paragraph>
                                <Paragraph style={{fontWeight: 'bold'}}>{highestObsRate.name}</Paragraph>
                            </Card.Content>
                            <Card.Content style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <Paragraph>Havainnot:</Paragraph>
                                <Paragraph style={{fontWeight: 'bold'}}>{highestObsRate.count}</Paragraph>
                            </Card.Content>
                        </Card.Content>
                        <Card.Content style={{flexDirection: 'row', width: '40%'}}>
                            <Card.Cover source={{ uri: highestObsRate.img}} style={{height: 100, width: 150, backgroundColor: 'white'}}/>
                        </Card.Content>
                    </Card.Content>
                </Card>
            : 
                <Card>
                    <Card.Content><Text id='profileText'>Ei havaintoja</Text></Card.Content>
                </Card>
            }
        </View>
    )
}
export default Statistics