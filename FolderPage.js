import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Image} from 'react-native'
import { ListItem } from 'react-native-elements'
import StickyHeader from './UI/StickyHeader'
import Text from './UI/CustomTextComponent'

const FolderPage = (props) => {
    const obs = props.route.params.obs
    const folderName = props.route.params.name
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
    
        return (
            <View>
                <ListItem
                    titleStyle={{fontFamily: 'montserrat-semibold', fontSize: 14}}
                    title={item.name}
                    subtitle={`${item.sex}\n${item.location}`}
                    rightSubtitle={`${item.time.date}\n${item.time.time}`}
                    leftAvatar={{ source: {uri: item.image}}}
                    bottomDivider
                />
            </View>
        )
    }

    return (
        <View style={styles.master}>
            <View style={styles.nav}>
                <StickyHeader title={folderName}/>
            </View>
            <View style={styles.data}>
                <Text id='modalHeader'>Havainnot</Text>
                <FlatList
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    data={obs}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    master: {
        flex: 1,
        backgroundColor: '#fff'
    },
    nav: {
        flex: 1
    },
    data: {
        flex: 7,
    }
})
export default FolderPage