import {observable,action } from 'mobx';

class VideoStore {

    @observable videoId = '';
    
 
    convertVideoId(url){
        var video = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if(video != null) {
            console.log("video id = ",video[1]);
            this.videoId = video[1]; //set the videoId from the url
        } else { 
            console.log("The youtube url is not valid.");
        }
    }
}

const VStore = new VideoStore();
export default VStore;