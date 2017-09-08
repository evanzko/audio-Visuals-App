import {observable } from 'mobx';

class VideoStore {
    @observable videoId = '';
    

    convertVideoID(url){
        var url = url;
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if(videoid != null) {
            console.log("video id = ",videoid[1]);
            videoId = videoid[1]; //set the videoId from the url
        } else { 
            console.log("The youtube url is not valid.");
        }
    }
}