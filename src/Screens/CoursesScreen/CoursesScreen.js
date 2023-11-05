import React, { useMemo,useEffect, useState,useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, FlatList, ActivityIndicator } from 'react-native';
import { Style, CoursesStyle } from '../../style';
import { Container, CoursesView, AppHeader } from '../../Components';
import { CoursesDataview } from '../../Utiles';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import { getProducts } from "../../services/api";
import { AuthContext } from '../../store/auth-context';


const CoursesScreen = (props) => {
  const { route, navigation } = props;
  const { categoryId } = route.params;
  const { Colors } = useTheme();
  const { t } = useTranslation();
  const[courceData, setCourceData]= useState(null);
  const CoursesStyles = useMemo(() => CoursesStyle(Colors), [Colors]);
  const authCtx= useContext(AuthContext);
  async function getData() {
    try{
      console.log("Category Is: "+categoryId);
      console.log(authCtx.token);
      setCourceData(await getProducts(categoryId,authCtx.token));
      console.log(courceData)
    }catch(error)
    {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
      getData();
    }, []);
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
                <FlatList
                  data={courceData}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (<CoursesView
                    item={item}
                    onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN, {product: item})}
                  />)}
                  keyExtractor={item => item.id}
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
};

export default CoursesScreen;
