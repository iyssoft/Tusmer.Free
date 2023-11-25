import React, { useMemo,useEffect, useState,useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, Image, ActivityIndicator,Text,Dimensions,StyleSheet,TouchableOpacity } from 'react-native';
import { Style, CoursesStyle,CongratulationStyle } from '../../style';
import { Container, CategoriesView, AppHeader, Button, Spacing  } from '../../Components';
import { SH } from '../../Utiles';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
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
      const paddingLeft = (level ?? 0 + 1) * 30;
      let backgroundColor= '#B6FFFA';
      let marker = "*   ";
      if(level == 2){
        backgroundColor= '#98E4FF';
         marker = "o   ";
      }
      else if(level == 3){
        backgroundColor= '#80B3FF';
         marker = "-   ";
      }
      else if(level == 4){
        backgroundColor= '#687EFF';
      }
      else if(level == 5){
        backgroundColor= 'white';
      }
      if(isLastLevel)
      {
        console.log(node.value);

        return (
          <View style={[styles.node, { backgroundColor: backgroundColor, paddingLeft }]}>
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.WATCH_TRAILER_SCREEN,{id:node.value,groupName:node.name})}>
            <Text>{marker+ node.name}</Text>                   
                </TouchableOpacity>
          </View>
        );
      }
      else{
        return (
          <View style={[styles.node, { backgroundColor: backgroundColor, paddingLeft }]}>
            <Text>{marker+ node.name}</Text>
          </View>
        );
      }

    };
  
    const getChildrenName = (_) => {
      return 'items';
    };
  
    useEffect(() => {
      if(authCtx.isAuthenticated || !authCtx.isRegistrationRequired){
        getData();
      }        
        navigation.setOptions({ headerTitle: "" });
      }, [authCtx.isAuthenticated,!authCtx.isRegistrationRequired, NestedListView]);
      if(authCtx.isAuthenticated || !authCtx.isRegistrationRequired){
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
                      {/* <TreeView data={courceData} onClick={(data) => 
                    navigation.navigate(RouteName.WATCH_TRAILER_SCREEN,{id:data.value,groupName:data.name})}/> */}
                    <NestedListView
                    data={courceData}
                    getChildrenName={getChildrenName}
                    renderNode={renderNode}
                  />
                                {/* <NestedListView
                      data={courceData}
                      getChildrenName={(node) => 'items'}
                      onNodePressed={(node) => alert('Selected node')}
                      renderNode={(node, level, isLastLevel) => (
                        <NestedRow
                          level={level}
                          style={styles.row}
                        >
                          <Text>{node.name}</Text>
                        </NestedRow>
                      )}
                    /> */}
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
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgb(255, 255, 255)', padding: 15 },
  node: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)',
  },
});