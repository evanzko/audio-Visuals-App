import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Image
} from 'react-native';

import Store from '../store/videoStore';


export default class audioHub extends Component {
    handleClick(url){
        console.log(Store.videoId);
        Store.convertVideoId(url); //converts the video url to its ID
        console.log(Store.videoId);
        this.props.navigation.navigate('learning'); //navigate to the learning page
    }

    render(){
        
        return(
            <View style = {styles.screen}>
                <View style = {styles.header} >
                    <Text style = {styles.title}>Select a video to learn</Text>
                </View>
                <View style = {styles.video}>
                    <TouchableOpacity
                        onPress={this.handleClick.bind(this, 'https://www.youtube.com/watch?v=RAnU-ycCj64')}
                        style = {styles.preview}
                    >
                        <Text style = {styles.previewText}>Learn with Barack I</Text>
                        <Image source = {{uri: 'https://img.youtube.com/vi/RAnU-ycCj64/default.jpg'}} style = {{width: 75, height: 75}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.handleClick.bind(this, 'https://www.youtube.com/watch?v=Bj_gbyXtd18')}
                        style = {styles.preview}
                    >
                        <Text style = {styles.previewText}>Learn with Barack II</Text>
                        <Image source = {{uri: 'https://img.youtube.com/vi/Bj_gbyXtd18/default.jpg'}} style = {{width: 75, height: 75}} />
                    </TouchableOpacity>

                </View>
                <View style = {styles.video}>
                <TouchableOpacity
                    onPress={this.handleClick.bind(this, 'https://www.youtube.com/watch?v=sX9_PBBTzTE&t=1s')}
                    style = {styles.preview}
                    >
                    <Text style = {styles.previewText}>Learn with Michelle II</Text>
                    <Image source = {{uri: 'https://img.youtube.com/vi/sX9_PBBTzTE/default.jpg'}} style = {{width: 75, height: 75}} />
                </TouchableOpacity>
                </View>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#bdc3c7',
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    header: {
        alignSelf: 'center',
        padding: 10,
    },
    preview: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    video: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    previewText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
});