import React, { useMemo,useEffect, useState,useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, Image, ActivityIndicator,Text } from 'react-native';
import { Style, CoursesStyle,CongratulationStyle } from '../../style';
import { Container, CategoriesView, AppHeader, Button, Spacing  } from '../../Components';
import { SH } from '../../Utiles';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import images from '../../index';
import { getCategories, getSubCategories } from "../../services/api";
// import { ColorSpace } from 'react-native-reanimated';
import { AuthContext } from '../../store/auth-context';
import TreeView from "react-native-animated-tree-view";
const Base_Url2= "https://online.tusmer.com/api";
const Categories="/lecture/gettusmerfreelecturegroups";
const CategoriesScreen = (props) => {
  const { route, navigation } = props;
  //const { id } = route.params;
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const[courceData, setCourceData]= useState(null);
  const CoursesStyles = useMemo(() => CoursesStyle(Colors), [Colors]);
  const CongratulationStyles = useMemo(() => CongratulationStyle(Colors), [Colors]);

  const authCtx= useContext(AuthContext);
   function getData() {
    fetch(
      Base_Url2+Categories,
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "UserId": authCtx.token.id
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
    useEffect(() => {
      if(authCtx.isAuthenticated){
        getData();
      }        
        navigation.setOptions({ headerTitle: "" });
      }, [authCtx.isAuthenticated]);
      if(authCtx.isAuthenticated){
        if (courceData !== null) {
          return (
            <Container>
              <View style={CoursesStyles.minstyleviewphotograpgy}>
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={Style.scrollviewstyles}>
                  <View style={CoursesStyles.keybordtopviewstyle}>
                    <KeyboardAvoidingView enabled>
                      <View style={CoursesStyles.minviewsigninscreen}>
                      <TreeView data={courceData} onClick={(data) => 
                    navigation.navigate(RouteName.WATCH_TRAILER_SCREEN,{id:data.value,groupName:data.name})}/>
                        {/* <FlatList
                          data={courceData}
                          showsHorizontalScrollIndicator={false}
                          renderItem={({ item }) => (<CategoriesView
                            item={item}
                            onPress={() => navigation.navigate(RouteName.COURSES_SCREEN,{categoryId: item.id})}
                          />)}
                          keyExtractor={item => item.id}
                        /> */}
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
      }
      else{
        return(
          <Container>
          <View style={CongratulationStyles.minstyleviewphotograpgytwo}>
              <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={Style.scrollviewstyles}>
                  <KeyboardAvoidingView enabled>
                      <View style={CongratulationStyles.keybordtopviewstyle}>
                          <View style={CongratulationStyles.minflexview}>
                              <View style={CongratulationStyles.minviewsigninscreen}>
                                  <View style={CongratulationStyles.succefullimgviewtwo}>
                                      <Image style={CongratulationStyles.succefullyimg} resizeMode="contain" source={images.User_Images} />
                                  </View>
                                  <Spacing space={SH(50)} />
                                  <Text style={CongratulationStyles.accounttext}>Yetkiniz Yok</Text>
                                  <Spacing space={SH(30)} />
                                  <Text style={CongratulationStyles.accounttextsuccessfully}>Bu alandan sadece kayıtlı kullanıcılar faydalanabilir. Hızlı bir şekilde üye olabilir yada giriş yapabilirsiniz.</Text>
                                  <Spacing space={SH(50)} />
                                  <View style={CongratulationStyles.accountbutton}>
                                      <Button title={"Giriş Yap"}
                                          onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}
                                      />
                                  </View>
                              </View>
                          </View>
                      </View>
                  </KeyboardAvoidingView>
              </ScrollView>
          </View>
      </Container>
        );
      }
};

export default CategoriesScreen;
