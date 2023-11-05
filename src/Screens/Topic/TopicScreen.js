import React, { useMemo,useEffect, useState,useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Style, CoursesStyle } from '../../style';
import { Container, CategoriesView, AppHeader } from '../../Components';
import { CoursesDataview } from '../../Utiles';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import { getTopic } from "../../services/api";
import RenderHtml from 'react-native-render-html';

// import { ColorSpace } from 'react-native-reanimated';
import { AuthContext } from '../../store/auth-context';
import TreeView from "react-native-animated-tree-view";
const Base_Url2= "https://online.tusmer.com/api";
const Categories="/lecture/gettusmerfreelecturegroups";
const TopicScreen = (props) => {
  const { route, navigation } = props;
  let { topicSystemName } = route.params;
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const[content, setContent]= useState(null);
  const CoursesStyles = useMemo(() => CoursesStyle(Colors), [Colors]);
  const authCtx= useContext(AuthContext);
  const { width } = useWindowDimensions();
  const source = {
    html: `
  <p style='text-align:center;'>
    Hello World!
  </p>`
  };
  async function getData() {
      try{
        if(topicSystemName== "universite_analizi"){
            topicSystemName = "universite_analizi_" + authCtx.token.universityId;
        }
        const result=  await getTopic(topicSystemName);
        console.log(result);
        console.log(result.body);
        setContent( {html: result.body});
      }catch(error)
      {
        console.log("error");
        console.log(error);
      }
    }
    useEffect(() => {
        getData();
      }, []);
if (content !== null) {
  return (
    <Container>
      <View style={CoursesStyles.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <View style={CoursesStyles.keybordtopviewstyle}>
            <KeyboardAvoidingView enabled>
              <View style={CoursesStyles.minviewsigninscreen}>
                <View style={{marginTop:50}}>
                    <RenderHtml
                    contentWidth={width}
                    source={content}
                    />
                </View>
              
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
}
else{
    return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color="#02709E" />
        </View>)
}
};

export default TopicScreen;
