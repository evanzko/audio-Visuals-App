import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { HomeStack } from './router/router';
export default class audioVisApp extends Component {
  render() {
    return(<HomeStack />);
  }
}

