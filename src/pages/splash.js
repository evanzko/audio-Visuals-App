import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class audioVisApp extends Component {
  render() {
    return (
      <View>
        <Image source = {{uri: 'https://github.com/evanzko/audio-Visuals-App/blob/broken/src/images/audioEquipment.png'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});