import React from 'react';
import {
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import splash from '../pages/splash';
import audioHub from '../pages/audioHub';
import learning from '../pages/learning';
import recording from '../pages/recordingTest';


export const HomeStack = StackNavigator({
    splash: {
        screen: splash,
        navigationOptions: {
            header: null
        }
    },
    
    audioHub: {
        screen: audioHub,
        navigationOptions: {
            header: null
        }
    },

    learning: {
        screen: learning,
        navigationOptions: ({ navigation }) =>  {
            return {
                headerLeft:(
                    <MIcon name="backspace" size={25} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress ={ () => navigation.navigate('audioHub') }/>
                ),
                title: 'Lets Learn!',
                headerMode: 'screen',
                gesturesEnabled: false,
            }
        }  
    },

    recording: {
        screen: recording,
        navigationOptions: ({ navigation }) =>  {
            return {
                headerLeft:(
                    <MIcon name="backspace" size={25} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress ={ () => navigation.navigate('audioHub') }/>
                ),
                title: 'Lets Learn!',
                headerMode: 'screen',
                gesturesEnabled: false,
            }
        }  
    }
    
},{
});
