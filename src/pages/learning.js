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
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import {observer} from 'mobx-react/native';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

import Icon from 'react-native-vector-icons/FontAwesome';
import Store from '../store/videoStore';

@observer
export default class LearningPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      isReady: false, //is the player ready
      status: null, //player status
      quality: null, //video quality
      error: null,
      isPlaying: false, //if the video is playing
      isLooping: true, //repeat is selected
      vCurrentTime: 0, //current Time of the video
      fullscreen: false, //fullscreen
      containerMounted: false, //if the container is mounted
      containerWidth: null, //the container width
      rCurrentTime: 0.0, //recorder currentTime
      recording: false, //recording or not
      stoppedRecording: false, //if the stop button has been pressed
      finished: false, //finished or not
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac', //path to the audio. Needs AudioUtils to access js Files
      hasPermission: undefined, // has permissions or not. 
    };
  }

  //check to make sure the correct Permissions have been given
  //renders a new Audio recorder and is ready to record 
  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({rCurrentTime: Math.floor(data.rCurrentTime)});
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL);
        }
      };
    });
  }

  //checks the permissions to make sure the app can record
  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }


  //prepares the audio recorder with the specified audioPath
  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  //moves the current time to sec + current time
  //a positive sec moves forwards and a negative sec moves backwards in the video  
  updateCurrentTime(sec){
    //update current time and duration on android devices
    if(Platform.OS === 'android'){
      if (this._youTubeRef) {
        this._youTubeRef
          .currentTime()
          .then(currentTime => this.setState({ vCurrentTime }))
          .catch(errorMessage => this.setState({ error: errorMessage }));   
      }
    }
    //seek to the current time + sec
    this._youTubeRef && this._youTubeRef.seekTo(this.state.currentTime+sec);
  }

  stop = () =>{
    clearInterval(playPause); //stop the interval
    this.setState({
      isPlaying: false,
      duration: 0,
      vCurrentTime: 0,
    })
    this._youTubeRef && this._youTubeRef.seekTo(0); 
  }

  startInterval = () => {
    console.log(this.state.isPlaying);
    playPause = setInterval(() =>{
      opposite = this.state.isPlaying;
      console.log(opposite);
      this.setState({ isPlaying: !opposite })
    }, 5000)
  }

  _renderButton(title, onPress, active, icon) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Icon
          name = {icon}
          size = {25}
        />
      </TouchableHighlight>
    );
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.pauseRecording();

      // Pause is currently equivalent to stop on Android.
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true});

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  //sets the state to 
  _finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed });
    console.log(`Finished recording of duration ${this.state.rCurrentTime} seconds at path: ${filePath}`);
  }

  render() {
    console.log(Store.videoId);
    return (
      <ScrollView
      style={styles.container}
      onLayout={({ nativeEvent: { layout: { width } } }) => {
        if (!this.state.containerMounted) this.setState({ containerMounted: true });
        if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
      }}
    >
      {this.state.containerMounted && Store.videoId && <YouTube
        ref={component => {
          this._youTubeRef = component;
        }}
        apiKey="AIzaSyDGi6GsCAWGrp44ddbnZzpZDed9mN0it-g"
        videoId= {Store.videoId} //allows for the video id to change with the store
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
            ? e => this.setState({ duration: e.duration, vCurrentTime: e.vCurrentTime })
            : undefined
        }
      />}
      
      <Text style = {styles.videoControl}>Video Controls</Text>
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
          onPress={this.updateCurrentTime.bind(this,-15)}
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
          onPress={this.updateCurrentTime.bind(this,15)}
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

      {/*start the interval */}
      <View style = {styles.buttonGroup}>
        <TouchableOpacity
          style = {styles.button}
          onPress = {this.startInterval.bind(this)}
        >
        <Text style={styles.buttonText}>Start learning interval</Text>
        </TouchableOpacity>
      </View>

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

      <View style={styles.container}>
      <View style={styles.controls}>
        {this._renderButton("RECORD", () => {this._record()}, this.state.recording, "microphone" )}
      </View>
    </View>
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
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#95a5a6"
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});