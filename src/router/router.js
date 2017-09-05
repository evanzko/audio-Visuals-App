import React from 'react';
import {
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';

import splash from '../pages/splash';
import audioHub from '../pages/audioHub';


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
    
},{
});
