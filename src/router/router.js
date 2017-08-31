import React, {Component} from 'react';

import {
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';

import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';

import audio from '../pages/audio';
import splash from '../pages/splash';

export const audioStack  = StackNavigator({
    splash: {
        screen: splash,
        navigationOptions: {
            header: null
        }
    },
    audio: {
        screen: audio,
        navigationOptions: {
            header: null
        }
    }
}); 