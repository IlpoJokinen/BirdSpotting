import React, {useEffect, useState} from 'react'
import OrderList from './OrderList'
import FamilyList from './FamilyList'
import SpeciesList from './SpeciesList'
import SpeciesPage from './SpeciesPage'
import RegistrationForm from './Registration'
import ProfilePage from './ProfilePage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native'
/*const AppNavigator = createStackNavigator({
  OrderList: {screen: OrderList},
  FamilyList: {screen: FamilyList},
  SpeciesList: {screen: SpeciesList},
  SpeciesPage: {screen: SpeciesPage},
  ProfilePage: {screen: ProfilePage}
})*/
/*const AppNavigator = createTabNavigator({
  Minä: {screen: ProfilePage},
  Linnut: {screen: OrderList}
})

const AppContainer = createAppContainer(AppNavigator)*/
const Drawer = createDrawerNavigator()

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.master}>
      <Button
        onPress={() => navigation.navigate('Bird list')}
        title="Lista suomen linnuista"
      />
    </View>
  )
} 

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Bird list">
        <Drawer.Screen name="Profile Page" component={ProfilePage} />
        <Drawer.Screen name="Bird list" component={OrderList} />
        <Drawer.Screen name="FamilyList" component={FamilyList} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  master: {
    flex: 1
  }
})
