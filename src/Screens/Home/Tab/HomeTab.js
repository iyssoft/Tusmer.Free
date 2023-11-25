import React, { useMemo,useEffect,useState, useContext } from 'react';
import { View, ScrollView, KeyboardAvoidingView, useWindowDimensions, Text, TouchableOpacity } from "react-native";
import { HomeStyles, Style } from '../../../style';
import { HomeImageData, SH, NewCoursesData, PopularCoursesData, InstructorData } from '../../../Utiles';
import { Container } from '../../../Components';
import {LinearGradient} from 'expo-linear-gradient';
import { HomeSmallImageView, Spacing, PopularCoursesView, InstructorView, HomeCarouselSlider, NewCoursesView } from '../../../Components';
import { useTranslation } from "react-i18next";
import { RouteName } from "../../../routes";
import { useTheme } from '@react-navigation/native';
import { getTopic,getSettings } from "../../../services/api";
//import {HomePageRoundedSliderData, HomePagePopularCoursesSliderData, HomePageNewCoursesSliderData, HomePageInstructorsSliderData} from '../../../services/datas';
import RenderHtml from 'react-native-render-html';
import { AuthContext } from '../../../store/auth-context';

const HomeTab = (props) => {
  const { t } = useTranslation();
  const[content, setContent]= useState("");
  const authCtx= useContext(AuthContext);
  const { navigation } = props;
  const { Colors } = useTheme();
  const HomeStyle = useMemo(() => HomeStyles(Colors), [Colors]);
  const { width } = useWindowDimensions();
  async function getData() {
    try{
      topicSystemName="free-home"
      const result=  await getTopic(topicSystemName);
      setContent( {html: result.body});
    }catch(error)
    {
      console.log("error");
      console.log(error);
    }
  }

  async function getSetting(){
    try{
      const result=  await getSettings();
      console.log(result);
      if(result.data.noRegistration){
        authCtx.setRegistrationRequired(false);
      }
      else{
        authCtx.setRegistrationRequired(true);
      }
    }catch(error)
    {
      console.log("error");
      console.log(error);
    }
    
  }
  useEffect(() => {
    getSetting();
      getData();      
    }, []);
  return (
    <>
      <Container>
        <View style={HomeStyle.minstyleviewphotograpgy}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={Style.scrollviewstyle}>
            <KeyboardAvoidingView enabled>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                colors={['rgba(254,238,245,1)', 'rgba(223,238,255,1)']} >
                <View style={HomeStyle.minflexview}>
                  <View style={HomeStyle.minviewsigninscreen}>
                   <HomeCarouselSlider />
                    <Spacing space={SH(30)} />
                    <View>
                    <TouchableOpacity>
                      <Text style={HomeStyle.popularcourcetexttwoColor1}>
                      HOŞGELDİNİZ
                      </Text>
                      <RenderHtml
                    contentWidth={width}
                    source={content}
                    />
                    </TouchableOpacity>
                    <Spacing space={SH(10)} />

                      {/* <FlatList
                        data={HomePageRoundedSliderData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (<HomeSmallImageView
                          item={item}
                          onPress={() => navigation.navigate(RouteName.COURSES_SCREEN)}
                        />)}
                        keyExtractor={item => item.id}
                        contentContainerStyle={HomeStyle.leftrightpadding}
                      /> */}
                    </View>
                    {/* <Spacing space={SH(30)} />
                    <TouchableOpacity>
                      <Text style={HomeStyle.popularcourcetexttwo}>Öne Çıkanlar</Text>
                    </TouchableOpacity>
                    <Spacing space={SH(10)} />
                    <FlatList
                      data={HomePagePopularCoursesSliderData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (<PopularCoursesView
                        item={item}
                        onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN)}
                      />)}
                      keyExtractor={item => item.id}
                      contentContainerStyle={HomeStyle.leftrightpadding}
                    />
                    <Spacing space={SH(30)} />
                    <Text style={HomeStyle.popularcourcetexttwo}>En Son Eklenenler</Text>
                    <Spacing space={SH(10)} />
                    <FlatList
                      data={HomePageNewCoursesSliderData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (<NewCoursesView
                        item={item}
                        onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN)}
                      />)}
                      keyExtractor={item => item.id}
                      contentContainerStyle={HomeStyle.leftrightpadding}
                    /> */}
                    {/* <Spacing space={SH(30)} />
                    <Text style={HomeStyle.popularcourcetexttwo}>Eğitim Kadromuz</Text>
                    <Spacing space={SH(10)} />
                    <FlatList
                      data={HomePageInstructorsSliderData}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (<InstructorView
                        item={item}
                        onPress={() => navigation.navigate(RouteName.INTRUDUCTION_PROFILE_SCREEN)}
                      />)}
                      keyExtractor={item => item.id}
                      contentContainerStyle={HomeStyle.leftrightpadding}
                    />
                    <Spacing space={SH(30)} /> */}
                  </View>
                </View>
              </LinearGradient>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Container>
    </>
  );
};
export default HomeTab;


