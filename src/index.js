import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import { audioStack } from './router/router';
export default class app extends Component {
  render(){
    return(
      <audioStack />
    );
  }
}


