import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RCTYouTubeExample extends Component {
  constructor(props){
    super(props);
    this.state = {
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: false,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      containerMounted: false,
      containerWidth: null,
    };
  }

  updateTime(sec){
    this._youTubeRef && this._youTubeRef.seekTo(this.state.currentTime+sec);
    //update current time and duration on android de
    if(Platform.OS === 'android'){
      if (this._youTubeRef) {
        this._youTubeRef
          .currentTime()
          .then(currentTime => this.setState({ currentTime }))
          .catch(errorMessage => this.setState({ error: errorMessage }));
      }
    }
  }

  stop = ()=>{
    clearInterval(playPause); //stop the interval
    this.setState({
      isPlaying: false,
      duration: 0,
      currentTime: 0,
    })
    this._youTubeRef && this._youTubeRef.seekTo(0); 
  }

  componentDidMount(){
    console.log(this.state.isPlaying);
    playPause = setInterval(() =>{
      opposite = this.state.isPlaying;
      console.log(opposite);
      this.setState({ isPlaying: !opposite })
    }, 5000)

  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          if (!this.state.containerMounted) this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
        }}
      >
        {this.state.containerMounted &&
          <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            apiKey="AIzaSyDGi6GsCAWGrp44ddbnZzpZDed9mN0it-g"
            videoId="ncw4ISEU5ik"
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            // playlistId="PLF797E961509B4EB5"
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
            onProgress={
              Platform.OS === 'ios'
                ? e => this.setState({ duration: e.duration, currentTime: e.currentTime })
                : undefined
            }
          />}
        
        {/*the container that holds the buttons*/}
        <View style={styles.buttonGroup}>
          {/**/}    
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.previousVideo()}
          >
            <Icon
              name = 'step-backward'
              size = {25}
            />
          </TouchableOpacity>
          {/*seek 15 seconds behind*/}  
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.seekTo(this.state.currentTime-15)}
          >
            <Icon
              name = 'fast-backward'
              size = {25}
            />
          </TouchableOpacity>
          {/*play pause button */}  
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState(s => ({ isPlaying: !s.isPlaying }))}
          >
            <Icon
              name = {this.state.status == 'playing' ? 'pause' : 'play'}
              size = {25}
            />
          </TouchableOpacity>
            {/*play pause button */}  
            <TouchableOpacity
            style={styles.button}
            onPress={this.stop.bind(this)}
          >
            <Icon
              name = 'stop'
              size = {25}
            />
          </TouchableOpacity>

          {/*button to turn on repeat*/}  
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState(s => ({ isLooping: !s.isLooping }))}
          >
            <Icon
              name = 'repeat'
              size = {25}
            />
          </TouchableOpacity>
          {/*seek 15 seconds forward*/}  
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.seekTo(this.state.currentTime+15)}
          >
            <Icon
              name = 'fast-forward'
              size = {25}
            />
          </TouchableOpacity> 

          {/*Go to the next Video*/}      
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.nextVideo()}
          >
            <Icon
              name = 'step-forward'
              size = {25}
            />
          </TouchableOpacity>
        </View>

        {/* Fullscreen */}
        {!this.state.fullscreen &&
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ fullscreen: true })}
            >
              <Text style={styles.buttonText}>Set Fullscreen</Text>
            </TouchableOpacity>
          </View>}

        {/* Update Progress & Duration (Android) */}
        {Platform.OS === 'android' &&
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (this._youTubeRef) {
                  this._youTubeRef
                    .currentTime()
                    .then(currentTime => this.setState({ currentTime }))
                    .catch(errorMessage => this.setState({ error: errorMessage }));
                  // this._youTubeRef
                  //   .duration()
                  //   .then(duration => this.setState({ duration }))
                  //   .catch(errorMessage => this.setState({ error: errorMessage }));
                }
              }}
            >
              <Text style={styles.buttonText}>Update Progress & Duration (Android)</Text>
            </TouchableOpacity>
          </View>}

        {/* Reload iFrame for updated props (Only needed for iOS) */}
        {Platform.OS === 'ios' &&
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this._youTubeRef && this._youTubeRef.reloadIframe()}
            >
              <Text style={styles.buttonText}>Reload iFrame (iOS)</Text>
            </TouchableOpacity>
          </View>}

        <Text style={styles.instructions}>
          {this.state.isReady ? 'Player is ready' : 'Player setting up...'}
        </Text>
        <Text style={styles.instructions}>
          Status: {this.state.status}
        </Text>
        <Text style={styles.instructions}>
          Quality: {this.state.quality}
        </Text>

        {/* Show Progress */}
        <Text style={styles.instructions}>
          Progress: {Math.trunc(this.state.currentTime)}s ({Math.trunc(this.state.duration / 60)}:{Math.trunc(this.state.duration % 60)}s)
          {Platform.OS !== 'ios' && <Text> (Click Update Progress & Duration)</Text>}
        </Text>

        <Text style={styles.instructions}>
          {this.state.error ? 'Error: ' + this.state.error : ''}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});