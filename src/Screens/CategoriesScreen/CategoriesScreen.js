import React, { useMemo,useEffect, useState,useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, Image, ActivityIndicator,Text,Dimensions,StyleSheet,TouchableOpacity } from 'react-native';
import { Style, CoursesStyle,CongratulationStyle } from '../../style';
import { Container, CategoriesView, AppHeader, Button, Spacing  } from '../../Components';
import { SH } from '../../Utiles';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import { LinearGradient } from 'expo-linear-gradient';

import images from '../../index';
import { getCategories, getSubCategories } from "../../services/api";
const dimensions = Dimensions.get('window');
//const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

// import { ColorSpace } from 'react-native-reanimated';
import { AuthContext } from '../../store/auth-context';
import TreeView from "react-native-animated-tree-view";
import NestedListView, {NestedRow, INode} from 'react-native-nested-listview'

const Base_Url2= "https://online.tusmer.com/api";
const Categories="/lecture/gettusmerfreelecturegroups";
const CategoriesScreen = (props) => {
  const { route, navigation } = props;
  const { courceData } = route.params;
  const { Colors } = useTheme();
  const { t } = useTranslation();
  // const[courceData, setCourceData]= useState(null);
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
    const renderNode = (node, level, isLastLevel) => {
      const paddingLeft = (level-1) * 15;
      if(isLastLevel)
      {
        console.log("https://online.tusmer.com"+node.icon);

        return (
          <View>
            <View style={[styles.container, { paddingLeft }]}>
              <LinearGradient
               colors={[node.color1, node.color2]}
               start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                style={styles.roundedContainer}>
                <Image source={{uri:"https://online.tusmer.com"+node.icon}}  style={styles.image} />
                <TouchableOpacity onPress={() => navigation.navigate(RouteName.WATCH_TRAILER_SCREEN,{id:node.value,groupName:node.name})}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{node.name}</Text>
                  </View>
                </TouchableOpacity>
                </LinearGradient>
            </View>
            <Spacing space={SH(4)} />
          </View>
        );
      }
      else{
        return (
          <View>
            <View style={[styles.container, { paddingLeft }]}>
              <LinearGradient
                colors={[node.color1, node.color2]}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                style={styles.roundedContainer}>
                <Image source={{uri:"https://online.tusmer.com"+node.icon}}  style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{node.name}</Text>
                  </View>
                </LinearGradient>
            </View>
            <Spacing space={SH(4)} />
          </View>
        );
      }

    };
  
    const getChildrenName = (_) => {
      return 'items';
    };
    navigation.setOptions({ headerShown: true,headerBackTitle:"Geri",title:"" });
    // useEffect(() => {
    //   if(authCtx.isAuthenticated || !authCtx.isRegistrationRequired){
    //     getData();
    //   }        
    //     navigation.setOptions({ headerTitle: "" });
    //   }, [authCtx.isAuthenticated,!authCtx.isRegistrationRequired, NestedListView]);
      if(authCtx.isAuthenticated || !authCtx.isRegistrationRequired){
        if (courceData !== null) {
          return (
            <Container>
                    <Spacing space={SH(20)} />
              <View style={CoursesStyles.minstyleviewphotograpgy}>
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={Style.scrollviewstyles}>
                  <View style={CoursesStyles.keybordtopviewstyle}>
                    <KeyboardAvoidingView enabled>
                      <View style={CoursesStyles.minviewsigninscreen}>
                    <NestedListView
                    data={courceData}
                    getChildrenName={getChildrenName}
                    renderNode={renderNode}
                  />
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
                                      <Image style={{ height: imageWidth-50, width: imageWidth-50 }} resizeMode="contain" source={{uri:"https://api.tusmer.com/images/mobile/free/tusmer_bdv_user_register.jpeg"}} />
                                  </View>
                                  <Spacing space={SH(10)} />
                                  <Text style={CongratulationStyles.accounttext}>TUSMER’İN BEDAVA DÜNYASINA HOŞ GELDİNİZ.</Text>
                                  <Spacing space={SH(10)} />
                                  <Text style={CongratulationStyles.accounttextsuccessfully}>Lütfen ÜCRETSİZ hesap aktivasyonunuzu yapın.</Text>
                                  <Text style={CongratulationStyles.accounttextsuccessfully}>* İhtiyacınız olan bi dolu dersi TAMAMEN BEDAVA izleyin.</Text>
                                  <Text style={CongratulationStyles.accounttextsuccessfully}>* Yapılacak tüm çekilişlere otomatik katılma hakkı elde edin.</Text>
                                  <Text style={CongratulationStyles.accounttextsuccessfully}>* Yenilenen ve güncellenen eğitimlerimizden haberdar olun.</Text>
                                  <Spacing space={SH(10)} />
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
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'rgb(255, 255, 255)', padding: 15 },
//   node: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'rgb(0, 0, 0)',
//   },
// });
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
    marginRight:50,
    justifyContent: 'center', // Center the text vertically
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
