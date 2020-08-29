
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native'
import Alarm from './Alarm';
import Timer from './Timer';
import StopWatch from './StopWatch';

import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-vector-icons/Ionicons';



//  class AlarmScreen extends Component {
//   render() {
//     return(
//       <View>
//         <Alarm />
//       </View>
//     );
//   }
// }

// class TimerScreeen extends Component {
//   render() {
//     return(
//       <View>
//         <Timer />
//       </View>
//     );
//   }
// }

// class StopWatchScreen extends Component {
//   render() {
//     return(
//       <View>
//         <StopWatch />
//       </View>
//     );
//   }
// }



const TabNavigator = createMaterialBottomTabNavigator(
  {
    Alarm: {
      screen: Alarm,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          <View>
            <Icon name = {'alarm-outline'} style = {[{color: tintColor}]} size={25} />
          </View>
        } 
    },
  },
    StopWatch: {
      screen: StopWatch,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          <View>
            <Icon name = {'stopwatch-outline'} style = {[{color: tintColor}]} size={25} />
          </View>
        }
    },
  },
    Timer: {
      screen: Timer,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          <View>
            <Icon name = {'timer-outline'} style = {[{color: tintColor}]} size={25} />
          </View>
        }
    },
  },
},
{
  initialRouteName: 'Alarm',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
}
);

export default createAppContainer(TabNavigator);



// const Tab = createBottomTabNavigator();

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function OutScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Out!</Text>
//     </View>
//   );
// }
// function GoScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Go!</Text>
//     </View>
//   );
// }


// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name = "Alarm" component = {HomeScreen} />
//       <Tab.Screen name = "StopWatch" component = {OutScreen} />
//       <Tab.Screen name = "Timer" component = {GoScreen} />
//     </Tab.Navigator>
//   );
// }



// export default function App() {
//   return (
//     <NavigationContainer>
//     <MyTabs />
//   </NavigationContainer>
    
//   );
// }




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
