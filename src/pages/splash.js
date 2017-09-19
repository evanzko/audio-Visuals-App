import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

var {height, width} = Dimensions.get('window');
export default class audioVisApp extends Component {

  render() {
    return (
      <View>
        <View>
          <Image source = {require('../images/audioEquipment.png')} style = {{height,width}}/>
        </View>
        <View style= {styles.backScreen}>
          <Text style = {styles.title}>Welcome!</Text>
          <View style = {styles.center}>
              <TouchableOpacity  
                  onPress={() => this.props.navigation.navigate('audioHub')}
                  style = {styles.login}>
                  <Text style = {styles.text}>Go!</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 40,
  },
  logo:{ //style for the logo's in the input field
      color: 'white',
      alignSelf: 'center'
  },
  backScreen: { //style for the backscreen that lays on top of the images
      flex: 1,
      backgroundColor: 'rgba(0,0,0,.6)',
      position: 'absolute',
      height: height,
      width: width,
      paddingBottom: 20,
  },
  login: { //style for the login button
      width: 250,
      height: 30,
      backgroundColor: '#95a5a6',
      alignSelf: 'center',
      borderRadius: 30,
      marginVertical: 10,
      backgroundColor: '#f39c12'
  },
  text: { //style for the text in the button's, such as login and forgot password
      fontSize: 15,
      color: 'white',
      alignSelf: 'center'
  },
  center: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
});