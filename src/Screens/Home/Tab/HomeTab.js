import React, { useMemo,useEffect,useState, useContext } from 'react';
import { View, ScrollView, KeyboardAvoidingView, useWindowDimensions, Text, TouchableOpacity,StyleSheet, Image } from "react-native";
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
import NestedListView, {NestedRow, INode} from 'react-native-nested-listview'

const Base_Url2= "https://online.tusmer.com/api";
const Categories="/lecture/gettusmerfreelecturegroups";
const HomeTab = (props) => {
  const { t } = useTranslation();
  const[content, setContent]= useState("");
  const authCtx= useContext(AuthContext);
  const { navigation } = props;
  const { Colors } = useTheme();
  const HomeStyle = useMemo(() => HomeStyles(Colors), [Colors]);
  const { width } = useWindowDimensions();
  const[courceData, setCourceData]= useState(null);
  function getDataForCategories() {
    fetch(
      Base_Url2+Categories,
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "UserId": 19858
          })
      }
  ).then(response => response.json())
      .then(result => {
        if(result.isSuccess)
         {
          console.log(result);
            setCourceData(result.data);
          }else{
  
          }
      }).catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
          throw error;
      });
      // try{
      //   const result=  getCategories(authCtx.token.id);
      //   console.log("--------------Data is here---------------------");
      //   console.log(result);
      //   if(result.isSuccess)
      //   {
      //     setCourceData(result.data);
      //   }else{

      //   }
      // }catch(error)
      // {
      //   console.log("error")
      //   console.log(error);
      // }
    }
    function handleCategoryClick(catId){
      let filteredValue = courceData.filter(key=>key.value=== catId)[0].items
   
      console.log(filteredValue);
      navigation.navigate(RouteName.CATEGORIES_SCREEN,{courceData: filteredValue})
    }
    const renderNode = (node, level, isLastLevel) => {
      const paddingLeft = (level-1) * 15;
     
      if(level == 1)
      {
        console.log(node.value);

        return (
          <View>
            <View style={[styles.container, { paddingLeft }]}>
              <LinearGradient
                colors={[node.color1, node.color2]}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                style={styles.roundedContainer}>
                <Image source={{uri:"https://online.tusmer.com"+node.icon}}  style={styles.image} />
                <TouchableOpacity onPress={() => handleCategoryClick(node.value)}>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{node.name}</Text>
                  </View>
                </TouchableOpacity>
                </LinearGradient>
            </View>
            <Spacing space={SH(10)} />
          </View>
        );
      }
    };
  
    const getChildrenName = (_) => {
      return 'items';
    };
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
      if(result.data.hideMenu)
      {
        authCtx.setIsHideMenuItem(true);
      }
      else{
        authCtx.setIsHideMenuItem(false);
      }
    }catch(error)
    {
      console.log("error");
      console.log(error);
    }
    
  }
  useEffect(() => {
    getDataForCategories();
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
                      {courceData && 
                        <NestedListView
                          data={courceData}
                          getChildrenName={getChildrenName}
                          renderNode={renderNode}
                        />
                      }
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


const styles = StyleSheet.create({
  container3: { flex: 1, backgroundColor: 'rgb(255, 255, 255)', padding: 15 },
  node: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 5, // Adjust as needed for left padding
  },
  gradient: {
    flex: 1,
  },
  roundedContainer: {
    width: '100%', // Span the entire width of the screen
    borderRadius: 50, // To make it a circle
    overflow: 'hidden',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60, // Set the width of the image
    height: 60, // Set the height of the image
    borderRadius: 25, // To make it a circle
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight:40,
    justifyContent: 'center', // Center the text vertically
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
