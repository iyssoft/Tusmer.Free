import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReactNativeModal } from "react-native-modal";
import { Audio, Video, ResizeMode } from "expo-av";
import VideoPlayer from 'expo-video-player'
import InputSelect from '../Components/material/InputSelect';
// import { WebView } from 'react-native-webview';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const _width = screenWidth > screenHeight ? screenWidth : screenHeight;
const _height = screenHeight < screenWidth ? screenHeight - 11 : screenWidth - 11;
//let videoUrl = "https://online.tusmer.com/Video/Player/?id=169&secret=pairDevice-RAUKLB2INBZYOD54MI37V4BXB6J2463J&userId=1968&key=57d682a06090dae763c54261fb31209d";
const rateData = [
    {
        text: '0.50 X',
        value: 0.5,
    },
    {
        text: '0.75 X',
        value: 0.7,
    },
    {
        text: '1.00 X',
        value: 1.0,
    },
    {
        text: '1.25 X',
        value: 1.2,
    },
    ,
    {
        text: '1.50 X',
        value: 1.5,
    },
    ,
    {
        text: '1.75 X',
        value: 1.7,
    },
    ,
    {
        text: '2.00 X',
        value: 2.0,
    },
    ,
    {
        text: '2.25 X',
        value: 2.2,
    },
    ,
    {
        text: '2.50 X',
        value: 2.5,
    },
    ,
    {
        text: '2.75 X',
        value: 2.7,
    },
    {
        text: '3.00 X',
        value: 3.0,
    }
];
export const VideoModal = props => {
    const [rate, setRate] = useState(1.0);
    const videoRef = useRef();
    const gColor= "#b0b0b0";
    useEffect(() => {
        console.log(props);
    }, []);
    return (
        <ReactNativeModal
            isVisible={props.isVisible}
            // swipeDirection={"down"}
            style={styles.modalView}
        // onSwipeComplete={props.onDismissModal}
        // onBackdropPress={props.onDismissModal}
        >
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.modalContainer}>
                    <View style={{ flexDirection: "column"}}>
                        <VideoPlayer
                            videoProps={{
                                shouldPlay: true,
                                resizeMode: ResizeMode.CONTAIN,
                                source: {
                                    //uri: "https://online.tusmer.com" + props.videoUrl,
                                    uri: "https://online.tusmer.com" + props.videoUrl,
                                },
                                rate: rate,
                                shouldCorrectPitch: true,
                                pitchCorrectionQuality: Audio.PitchCorrectionQuality.High,
                                videoRef: videoRef
                            }}
                            style={{
                                width : _width-10,
                                height : _height-10
                            }}
                            icon={{
                                play: <Text style={{ color: '#FFF' }}>OYNAT</Text>,
                                pause: <Text style={{ color: '#FFF' }}>DURDUR</Text>,
                              }}
                            inFullscreen={false}
                            showFullscreenButton={false}
                            useNativeControls
                            showControlsOnLoad={true}                           
                            textStyle={{ color: 'red', fontSize: 16 }}
                            shouldCorrectPitch=  {true} 
                        />

                        <TouchableOpacity style={{ position: 'absolute', backgroundColor: "rgba(0, 0, 0, 0.3)", marginTop: 1, paddingHorizontal: 10 }}>
                            <InputSelect initial_value={rate + " X"} border={false} data={rateData} onPress={(min) => setRate(min.value)} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={props.onDismissModal}
                    >
                        <Ionicons
                            size={38}
                            name="ios-close"
                            color={gColor}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ReactNativeModal>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        backgroundColor: "white",
        padding: 0,
        marginTop: 0,
        marginBottom: 0

    },
    modalContainer: {
        padding: 0
    },
    flex1: { flex: 1 },
    modalView: {
        justifyContent: "space-around",
        margin: 0
    },

    textContent: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 16,
        paddingVertical: 6
    },
    closeButton: {
        alignSelf: "flex-end",
        position: "absolute",
        paddingHorizontal: 10,
        marginTop: 7,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 50
    },
    identity: {
        position: "absolute",
        alignSelf: "center",
        top: (_height + 40) / 2,
        fontSize: 80,
        zIndex: 1,
        color: "black",
        opacity: 0.1
    }
});
