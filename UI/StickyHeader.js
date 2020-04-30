import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function StickyHeader({ title }) {
 
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
                <Text style={{fontWeight: 'bold', fontSize: 25,  color: 'white'}}>{title}</Text>
           </View>
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
    }
})