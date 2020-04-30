import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function StickyHeader() {
 
    return (
       <View style={styles.header}>
           <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25,  color: 'white'}}>Suomen linnut</Text>
        </View>

    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%', 
        height: 70, 
        backgroundColor: '#002f6c',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }
})