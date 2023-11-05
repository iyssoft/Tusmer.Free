import React, { useState, useRef } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
//import { Video, ResizeMode } from 'expo-av';
// import Orientation from 'react-native-orientation-locker';
import * as ScreenOrientation from 'expo-screen-orientation';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const VideoPlayer = (props) => {
    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(props.paused);

    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(props.paused ? PLAYER_STATES.PAUSED :PLAYER_STATES.PLAYING);
    const [isLoading, setIsLoading] = useState(true);

    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };

    const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);
    const onPaused = (newState) => {
        setPaused(!paused);
        setPlayerState(newState);
    };
    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        if (Platform.OS === 'android') {
            setPlayerState(PLAYER_STATES.PAUSED);
            setPaused(true);
        } else {
            setPlayerState(PLAYER_STATES.PLAYING);
            setPaused(false);
        }
    };
    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };
    const onLoad = (data) => {
        setDuration(Math.round(data.duration));
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);
    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        setCurrentTime(duration);
    };
    const [isFullScreen, setIsFullScreen] = useState(false);
    const onFullScreen = () => {
        if (!isFullScreen) {
            //changeScreenOrientation_LANDSCAPE_LEFT();
        } else {
            if (Platform.OS === 'ios') {
                changeScreenOrientation_Default();
            }
            changeScreenOrientation_Default();
        }
        setIsFullScreen(!isFullScreen);
    };
    const exitFullScreen = () => {
            if (Platform.OS === 'ios') {
                changeScreenOrientation_Default();
            }
            changeScreenOrientation_Default();
        
    };
    async function changeScreenOrientation_LANDSCAPE_LEFT() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
      async function changeScreenOrientation_Default() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
    return (
        <View style={{ marginHorizontal: isFullScreen ? 0 : 0 }}>
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                posterResizeMode={'cover'}
                onProgress={onProgress}
                onFullscreenPlayerWillDismiss={exitFullScreen}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode={'cover'}
                fullscreen={isFullScreen}
                source={{
                    uri: "https://online.tusmer.com" + props.videoUrl,
                  }}
                style={styles.backgroundVideo}
            />
            <MediaControls
                isFullScreen={isFullScreen}
                duration={duration}
                isLoading={isLoading}
                progress={currentTime}
                onFullScreen={onFullScreen}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                mainColor={'red'}
                playerState={playerState}
                style={isFullScreen ? styles.backgroundVideoFullScreen : styles.backgroundVideo}
                sliderStyle={isFullScreen ? { containerStyle: styles.mediaControls, thumbStyle: {}, trackStyle: {} } : { containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        height: 370,
        width: '100%',  
        backgroundColor:'rgba(223,238,255,1)'   
    },
    mediaControls: {
        width: screenHeight - 500,
        height: '100%',
        flex: 1,
        alignSelf: Platform.OS === 'android' ? screenHeight < 800 ? 'center' : 'flex-start' : 'center',
    },
    backgroundVideoFullScreen: {
        height: screenHeight,
        width: screenWidth,
    },
});

export default VideoPlayer;