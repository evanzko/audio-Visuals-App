import React, {Component} from 'react';

import {
    Text,
    View,
    Button,
    Image,
    Dimensions,
} from 'react-native';
var {height, width} = Dimensions.get('window');
export default class Splash extends Component {
    render(){
        return(
            <Text>Hello</Text>
            //<Image source ={require('C:\Users\Evan\audioVisApp\src\images\audioEquipment.png')} style = {{height,width}}/>
        );
    }
}