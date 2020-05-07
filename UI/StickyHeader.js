import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Text from '../UI/CustomTextComponent'

export default function StickyHeader({ title, backIcon, navigate, view }) {
    const navigation = useNavigation()
      
    return (
       <View style={styles.header}>
           <View style={styles.icon}>
                <Icon
                    name="bars"
                    size={30}
                    color="white"
                    onPress={() => navigation.openDrawer()}
                />
           </View>
           <View style={styles.text}>
                <Text id='header'>{title}</Text>
           </View>
           {backIcon ? 
           <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <Icon
                name="reply"
                size={30}
                color="white"
                style={view === 1 || view === 2 ? {marginRight: 25} : {marginRight: 10}}
                onPress={view === 2 ? () => navigate('Heimot') : () => navigate('Lahkot')}
            /> 
            </View> : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: '100%', 
        height: 80, 
        backgroundColor: '#002f6c',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Expo.Constants.statusBarHeight
    },
    icon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        flex: 9,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textStyle1: {
     
    },
    textStyle2: {
        fontSize: 25,
        color: 'white',
    }
})