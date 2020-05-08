import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

const fetchFonts = () => {
    return Font.loadAsync({
        'montserrat-semibold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    })
}

const CustomTextComponent = (props) => {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    if (!fontsLoaded) {
        return (
        <AppLoading startAsync={fetchFonts} onFinish={() => setFontsLoaded(true)} />
        )
    }

    if (props.id === 'header') {
        return <Text style={styles.header}>{props.children}</Text>
    }
    else if (props.id === 'profileText') {
        return <Text style={styles.profileText}>{props.children}</Text>
    }
    else if (props.id === 'speciesText') {
        return <Text style={styles.speciesText}>{props.children}</Text>
    }
    else if (props.id === 'speciesButtonText') {
        return <Text style={styles.speciesButtonText}>{props.children}</Text>
    }
    else if (props.id === 'modalHeader') {
        return <Text style={styles.modalHeader}>{props.children}</Text>
    }
    else if (props.id === 'modalBirdName') {
        return <Text style={styles.modalBirdName}>{props.children}</Text>
    }
    else if (props.id === 'modalText') {
        return <Text style={styles.modalText}>{props.children}</Text>
    }
}
const styles = StyleSheet.create({
    header: {
        marginRight: 30,
        fontSize: 25,
        color: 'white',
        fontFamily: 'montserrat-semibold'
    },
    profileText: {
        fontSize: 15,
        fontFamily: 'montserrat-semibold',
        color: '#2d2d2e'
    },
    speciesText: {
        fontSize: 13,
        fontFamily: 'montserrat-semibold',
        color: '#2d2d2e',
        marginBottom: 20
    },
    speciesButtonText: {
        fontSize: 15,
        fontFamily: 'montserrat-semibold',
        color: '#fff',
        textAlign: 'center'
    },
    modalHeader: {
        color: '#002f6c',
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'montserrat-semibold',
        marginTop: 15
    },
    modalBirdName: {
        marginLeft: 15,
        color: "white",
        fontSize: 13,
        fontFamily: 'montserrat-semibold'
    },
    modalText: {
        fontSize: 14,
        color: '#2196F3',
        marginBottom: 10,
        marginTop: 10,
        fontFamily: 'montserrat-semibold'
    }
})
export default CustomTextComponent