import React, { useState, useRef, useContext,useEffect } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
//import { Video, ResizeMode } from 'expo-av';
// import Orientation from 'react-native-orientation-locker';
import * as ScreenOrientation from 'expo-screen-orientation';
import { ConfirmationAlert } from '../../Components';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import { AuthContext } from '../../store/auth-context';

const VideoPlayer = (props) => {
    const authCtx= useContext(AuthContext);
    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(props.paused);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Demo kullanım süresi doldu." );

    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState(props.paused ? PLAYER_STATES.PAUSED :PLAYER_STATES.PLAYING);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = props.navigation.addListener("blur", async (e) => {
          console.log("useEffect çalışıyor");
          setPaused(true);
          setPlayerState(PLAYER_STATES.PAUSED);
         })
     
     // Unsubscribe to event listener when component unmount
     return unsubscribe;   
      }, [props.navigation])
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
            if(props.demoSeconds > 0){
                if(data.currentTime >= props.demoSeconds){
                    setAlertVisible(true);
                    setPaused(true);
                }
            }
            
        }
    };
    const onLoad = (data) => {
        if(props.demoSeconds > 0){
            setDuration(props.demoSeconds);
        }
        else{
            setDuration(Math.round(data.duration));
        }
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
            changeScreenOrientation_LANDSCAPE_LEFT();
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
        authCtx.setFullScreen(true);
        //props.navigation.headerShown= false;
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
      async function changeScreenOrientation_Default() {
        authCtx.setFullScreen(false);
        //props.navigation.headerShown= true;
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
            <ConfirmationAlert
                message={alertMessage}
                modalVisible={alertVisible}
                setModalVisible={setAlertVisible}
                onPressCancel={() => setAlertVisible(!alertVisible)}
                onPress={() => setAlertVisible(!alertVisible)}
                cancelButtonText={"Kapat"}
                buttonText={"Tamam"}
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