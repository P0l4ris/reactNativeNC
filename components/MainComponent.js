import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

//createStack. has one required argument. What components available:
//are each screen connected to one another? why not put home here? Its a history tracker
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

//respective static navigator to each component Home, Directory, Campsites etc.
const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },

    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

//this one is different navigator. So far we have both stacks in here connected toa main hold all navigator
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator}
    },
    {             
        drawerBackgroundColor: '#CEC8FF'
    }

)


class Main extends Component {
   

    //onPress is passed to directory component with the campsites Id's. Ternary operator for Platform
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight   
                }}>
                <MainNavigator 
                />
            </View>
        );
    }
}

export default Main;