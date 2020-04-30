import React from 'react'
import OrderList from './OrderList'
import FamilyList from './FamilyList'
import ProfilePage from './ProfilePage'
import SpeciesList from './SpeciesList'
import SpeciesPage from './SpeciesPage'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const BirdList = () => {
  return <Stack.Navigator initialRouteName="Lahkot" headerMode='none'>
      <Stack.Screen name='Lahkot' component={OrderList}/>
      <Stack.Screen name='Heimot' component={FamilyList}/>
      <Stack.Screen name='Lajit' component={SpeciesList}/>
      <Stack.Screen name='Laji' component={SpeciesPage}/>
  </Stack.Navigator>
}
export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Profiili">
        <Drawer.Screen name="Profiili" component={ProfilePage}/>
        <Drawer.Screen name="Suomen linnut" component={BirdList} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}