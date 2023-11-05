import React, { useState, useEffect, useContext } from 'react';
import  Style  from '../style';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteName, SideNavigator } from '../routes';
import { useSelector } from "react-redux";

import {
  SplashScreen, Swiperscreen, LoginScreen, RegisterScreen,
  ForgotPassword, OtpVeryfiveScreen, RegistrationSuccessful,
  SelectExamScreen, ExamQustionScreen,
  Downloadcertyficate, ExamMarkSheetNumberScreen, CoursesScreen, CategoriesScreen,
  PaymentScreen, CreditCardScreen, WatchTrailerScreen, VideoCallScreen,
  CoursesDetailesScreen, CongrejulationScreen
  , InstructorsDetaileScreen,
  BuyCourses,
  SearchPopularTagScreen,
  EndCallScreen,
  InstructorsProfiledcreen,
  TranslationScreen,
  Checkoutscreen,
  ReviewsScreen,
  TopicScreen
} from '../Screens';
import { AppHeader, ColorPicker } from '../Components';
import { Colors } from '../Utiles';
import { AuthContext } from '../store/auth-context';

const Stack = createStackNavigator();
const App = (props) => {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors
  };
  const [colorValue, setColorValue] = useState(MyTheme)
  useEffect(() => {
    if (Colors.length != 0 && colorrdata != "") {
      Colors.theme_backgound = colorrdata;
      const MyThemeNew = {
        ...DefaultTheme,
        Colors: Colors
      };
      setColorValue(MyThemeNew)
    }
  }, [colorrdata, Colors])
  const authCtx= useContext(AuthContext);
  const HeaderArray = {
    headerShown: true,
    headerTintColor: Colors.theme_backgound,
    headerShadowVisible: false,

  };
  return (
    <NavigationContainer theme={colorValue}>
      <AuthenticatedStack props={props}/>
      {/* {!authCtx.isAuthenticated && <AuthStack HeaderArray={HeaderArray}/>}
      {authCtx.isAuthenticated && <AuthenticatedStack props={props}/>} */}
    </NavigationContainer>
  );
};

function AuthenticatedStack(HeaderArray,props){
  return(
<Stack.Navigator>
        {/* <Stack.Screen
          name={RouteName.SELECT_EXAM_SCREEN}
          component={SelectExamScreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_1"} />,
          }}
        />
        <Stack.Screen
          name={RouteName.EXAM_QUESTION_SCREEN}
          component={ExamQustionScreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_2"} />,
          }}
        />
        <Stack.Screen
          name={RouteName.DOWNLOAD_CERTIFICATE}
          component={Downloadcertyficate}
          options={{
            title: null,
            ...HeaderArray,
          }}
        />
        <Stack.Screen
          name={RouteName.EXAM_MARKSHEET_NUMBER}
          component={ExamMarkSheetNumberScreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_3"} />,
          }}
        />         */}
        <Stack.Screen
          name={RouteName.HOME_SCREEN}
          component={SideNavigator}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
          name={RouteName.LANGUAGE_SCREEN}
          component={TranslationScreen}
          options={{ headerShown: false }}
        /> */}
              <Stack.Screen
          name={RouteName.TOPIC_SCREEN}
          component={TopicScreen}
          options={{ headerShown: true,headerBackTitle:"Geri",title:"" }}
        />
        <Stack.Screen
          name={RouteName.CATEGORIES_SCREEN}
          component={CategoriesScreen}
          options={{
             ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Kategoriler"} />,
          }}
        />
        {/* <Stack.Screen
          name={RouteName.COURSES_SCREEN}
          component={CoursesScreen}
          options={{
             ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Dersler"} />,
          }}
        /> */}

        {/* <Stack.Screen
          name={RouteName.BUY_COURSES_SCREEN}
          component={BuyCourses}
          options={{ headerShown: false, }}
        /> */}
        <Stack.Screen
          name={RouteName.WATCH_TRAILER_SCREEN}
          component={WatchTrailerScreen}
          options={{ headerShown: true ,headerBackTitle:"Geri",title:"" }}
        />
        <Stack.Screen
          name={RouteName.LOGIN_SCREEN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteName.REGISTER_SCREEN}
          component={RegisterScreen}
          options={{ title: null, headerShown: false, }}
        />
        {/* <Stack.Screen
          name={RouteName.COURSES_DETAILS_SCREEN}
          component={CoursesDetailesScreen}
          options={{ headerShown: false, }}
        /> */}
        {/* <Stack.Screen
          name={RouteName.SEARCH_POPULARTAG_SCREEN}
          component={SearchPopularTagScreen}
          options={{ headerShown: false, }}
        />
        <Stack.Screen
          name={RouteName.REVIEWS_SCREEN}
          component={ReviewsScreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_5"} />,
          }}
        />
        <Stack.Screen
          name={RouteName.CONGREJULATION_SCREEN}
          component={CongrejulationScreen}
          options={{
            ...HeaderArray,
            title: null,
          }}
        />
        <Stack.Screen
          name={RouteName.CHECKOUT_SCREEN}
          component={Checkoutscreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_6"} />,
            headerRight: () => {
              return (
                <ColorPicker />
              );
            }
          }}
        />
        <Stack.Screen
          name={RouteName.PAYMENTS_SCREEN}
          component={PaymentScreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_7"} />,
          }}
        />
        <Stack.Screen
          name={RouteName.VIDEO_CALL_SCREEN}
          component={VideoCallScreen}
          options={{ headerShown: false, }}
        />
        <Stack.Screen
          name={RouteName.END_CALL_SCREEN}
          component={EndCallScreen}
          options={{ headerShown: false, }}
        />
        <Stack.Screen
          name={RouteName.INTRUDUCTION_PROFILE_SCREEN}
          component={InstructorsProfiledcreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_8"} />,
          }}
        />
        <Stack.Screen
          name={RouteName.INSTRUCTOR_DETAILS_SCREEN}
          component={InstructorsDetaileScreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_9"} />,
          }}
        />
        <Stack.Screen
          name={RouteName.CRIDITCARD_SCREEN}
          component={CreditCardScreen}
          options={{
            ...HeaderArray,
            headerTitle: () => <AppHeader {...props} headerTitle={"Customesidebar_title_10"} />,
          }}
        /> */}
      </Stack.Navigator>
  );
}

function AuthStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
          name={RouteName.LOGIN_SCREEN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name={RouteName.SPLASH_SCREEN}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteName.SWIPER_SCREEN}
          component={Swiperscreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name={RouteName.REGISTER_SCREEN}
          component={RegisterScreen}
          options={{ title: null, headerShown: false, }}
        />
        {/* <Stack.Screen
          name={RouteName.OTP_SCREEN}
          component={OtpVeryfiveScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteName.REGISTER_SUCCESSFULLY}
          component={RegistrationSuccessful}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteName.FORGET_PASSWORD_SCREEN}
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        /> */}
    </Stack.Navigator>
  );
}
export default App;

