import React from 'react'
import OrderList from './OrderList'
import FamilyList from './FamilyList'
import ProfilePage from './ProfilePage'
import SpeciesList from './SpeciesList'
import SpeciesPage from './SpeciesPage'
import SearchPage from './SearchPage'
import FolderPage from './FolderPage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const BirdList = () => {

  return <Stack.Navigator initialRouteName="Lahkot" headerMode='none'>
      <Stack.Screen name='Lahkot' component={OrderList} />
      <Stack.Screen name='Heimot' component={FamilyList} />
      <Stack.Screen name='Lajit' component={SpeciesList} />
      <Stack.Screen name='Laji' component={SpeciesPage} />
  </Stack.Navigator>
}

const Profile = () => {
   
  return <Stack.Navigator initialRouteName='Käyttäjä' headerMode='none'>
    <Stack.Screen name='Käyttäjä' component={ProfilePage} />
    <Stack.Screen name='Kansio' component={FolderPage} />
  </Stack.Navigator>
}

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Profiili">
        <Drawer.Screen name="Profiili" component={Profile} options={{
          drawerIcon: config => <Icon
            name="user-circle"
            size={25}
          />
        }}/>
        <Drawer.Screen name="Suomen linnut" component={BirdList} options={{
          drawerIcon: config => <Icon
            name="list"
            size={25}
          />
        }}/>
        <Drawer.Screen name="Etsi lintu" component={SearchPage} options={{
          drawerIcon: config => <Icon
            name="search"
            size={25}
          />
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}