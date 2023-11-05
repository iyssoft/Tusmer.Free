import React, { useMemo, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { WatchTrailerStyle } from '../../style';
import { Container, VectorIcons, VideoView } from '../../Components';
import {  SF } from "../../Utiles";
import { LessonsTab } from '../../Screens';
import { RouteName } from "../../routes";
import * as ScreenOrientation from 'expo-screen-orientation';

const WatchTrailerScreen = (props) => {
  const { navigation,route } = props;
  const { id, groupName } = route.params;
  const { Colors } = useTheme();
  const WatchTrailerStyles = useMemo(() => WatchTrailerStyle(Colors), [Colors]);
  const [videoUrl, setVideoUrl]= useState("");
  const [paused, setPaused]= useState(false);
  const changeVideoUrl=(link) =>{
    setVideoUrl(link);
    console.log("videoUrl");
  }

    const title = () => {
    return (
      <View style={WatchTrailerStyles.nindivset}>
        <VideoView videoUrl={videoUrl} paused={paused}/>
      </View>
    );c
  }
  const backButtonClickHandler=()=>{
    setPaused(true);
    changeScreenOrientation_Default();
    navigation.navigate(RouteName.CATEGORIES_SCREEN)

  }
  async function changeScreenOrientation_Default() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }
  const renderNavBar = () => (
    <View style={WatchTrailerStyles.navContainer}>
      <View style={WatchTrailerStyles.navBar}>
        <TouchableOpacity style={WatchTrailerStyles.hoveraerrorset} onPress={backButtonClickHandler}>
          <VectorIcons
            icon="Entypo"
            size={SF(40)}
            name="chevron-small-left"
            color={Colors.theme_backgound}
            style={WatchTrailerStyles.iconlessthanback}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderContent = () => {
    return (
      <Container>
        <View style={WatchTrailerStyles.overviewtabminview}>
          <Text style={WatchTrailerStyles.trailertextset}>{groupName}</Text>
          {/* <Text style={WatchTrailerStyles.paregraphtext}>Kısa açıklaması</Text> */}
           <LessonsTab onPress={changeVideoUrl} groupId={id}/>
        </View>
      </Container>
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ReactNativeParallaxHeader
        alwaysShowTitle={true}
        alwaysShowNavBar={true}
        headerMaxHeight={340}
        headerMinHeight={55}
        extraScrollHeight={0}
        navbarColor="rgba(223,238,255,1)"
        titleStyle={WatchTrailerStyles.titleStyle}
        title={title()}
        backgroundColor={'transparent'}
        backgroundImageScale={1.1}
        // renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={WatchTrailerStyles.container}
        contentContainerStyle={WatchTrailerStyles.contentContainer}
        innerContainerStyle={WatchTrailerStyles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log("onScrollBeginDrag"),
          onScrollEndDrag: () => console.log("onScrollEndDrag"),
          showsVerticalScrollIndicator: false
        }}
      />
    </>
  );
}
export default WatchTrailerScreen;

