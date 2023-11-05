import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExamTab, HomeTab, MyCourseTab, ProfileTab, WishlistTab, CategoriesScreen, WatchTrailerScreen, TopicScreen } from '../Screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Style } from '../style';
import { ColorPicker, CustomSidebarMenu, AsistanSidebarMenu, PratisyenSidebarMenu, UzmanSidebarMenu, HeaderLeftMenuIcon, VectorIcons, AppHeader, RightViewAll, HeaderRightIcon, ColorPickerandCheckoutIcon } from '../Components';
import { RouteName } from '../routes';
import { Colors, SH, SF } from '../Utiles';
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const customerGroupId= 8;
const HeaderArray = {
  headerShown: true,
  headerBackTitle:"Geri",
  headerTintColor: Colors.theme_backgound,
  headerShadowVisible: false,
  headerStyle: {backgroundColor: Colors.lavender_blush_colors,},
  headerTitleStyle: {
    color: Colors.theme_backgound,
    fontWeight: "700",
    fontSize: SF(22),
  },
};

function DrawerSidebarScreen(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <CustomSidebarMenu {...props} />
      {/* {customerGroupId == 8 ? <TipSidebarMenu {...props} /> : null}
      {customerGroupId == 9 ? <PratisyenSidebarMenu {...props} /> : null}
      {customerGroupId == 10 ? <AsistanSidebarMenu {...props} /> : null}
      {customerGroupId == 11 ? <UzmanSidebarMenu {...props} /> : null} */}
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeScsreenTabAll" drawerContent={props => <DrawerSidebarScreen {...props} />}>
      <Drawer.Screen name="HomeScsreenTabAll"
        options={{ headerShown: false }}
        component={HomeScsreenTabAll} />
    </Drawer.Navigator>
  );
}
function Root() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen name="Homese" component={HomeScsreenTabAll}
        options={{
          title: '',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
export default Root;

function HomeTabScreenStack(props) {
  const { t } = useTranslation();
  const { route, navigation } = props;
  return (
    <Stack.Navigator initialRouteName="HomeTab">
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Customesidebar_title_18")} />,
          ...HeaderArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          // headerRight: () => (
          //   <RightViewAll SearchOnpress={() => navigation.navigate(RouteName.SEARCH_POPULARTAG_SCREEN)}
          //     NotificationOnpress={() => navigation.navigate(RouteName.NOTIFICATION_SCREEN)}
          //     CheckOutOnPress={() => navigation.navigate(RouteName.CHECKOUT_SCREEN)} />
          // ),
        }}
      />
      <Stack.Screen
        name={RouteName.TOPIC_SCREEN}
        component={TopicScreen}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={""} />,
          ...HeaderArray,
          // headerLeft: () => (
          //   <HeaderLeftMenuIcon {...props} />
          // )
        }}
      /> 
    </Stack.Navigator>
  );
}
function MyCourseTabScreenStack(props) {
  const { t } = useTranslation();
  const { navigation } = props;
  return (
    <Stack.Navigator initialRouteName="MyCourseTab">
      <Stack.Screen
        name="MyCourseTab"
        component={CategoriesScreen}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Customesidebar_title_19")} />,
          ...HeaderArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          // headerRight: () => (
          //   <HeaderRightIcon
          //     OnlineClass={() => navigation.navigate(RouteName.ONLINE_CLASS_SCREEN)}
          //     ChatOnpress={() => navigation.navigate(RouteName.CHAT_SCREEN)}
          //     CheckOutOnPress={() => navigation.navigate(RouteName.CHECKOUT_SCREEN)} />
          // ),
        }}
      />
       <Stack.Screen
        name={RouteName.WATCH_TRAILER_SCREEN}
        component={WatchTrailerScreen}
        options={{
          tabBarVisible:false,
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={""} />,
          ...HeaderArray,
          // headerLeft: () => (
          //   <HeaderLeftMenuIcon {...props} />
          // )
        }}
      /> 
    </Stack.Navigator>
    
  );
}
function ExamTabScreenStack(props) {
  const { t } = useTranslation();
  const { navigation } = props;
  return (
    <Stack.Navigator initialRouteName="ExamTab">
      <Stack.Screen
        name="ExamTab"
        component={ExamTab}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Customesidebar_title_20")} />,
          ...HeaderArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          // headerRight: () => (
          //   <ColorPickerandCheckoutIcon onPress={() => navigation.navigate(RouteName.CHECKOUT_SCREEN)} />
          // ),
        }}
      />
    </Stack.Navigator>
  );
}
function WishlistTabScreenStack(props) {
  const { t } = useTranslation();
  const { navigation } = props;
  return (
    <Stack.Navigator initialRouteName="WishlistTab">
      <Stack.Screen
        name="WishlistTab"
        component={WishlistTab}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Customesidebar_title_21")} />,
          ...HeaderArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          // headerRight: () => (
          //   <ColorPickerandCheckoutIcon onPress={() => navigation.navigate(RouteName.CHECKOUT_SCREEN)} />
          // ),
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="ProfileTab">
      <Stack.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          headerTitle: (props) => <AppHeader rightView={Style.RemoveBgColor} {...props} headerTitle={t("Customesidebar_title_22")} />,
          ...HeaderArray,
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
export function HomeScsreenTabAll() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="Homes"
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: Colors.theme_backgound,
        inactiveTintColor: Colors.gray_text_color,
        labeled: true,
        labelStyle: {
        },
        tabStyle: {
          height: SH(49),
          backgroundColor: Colors.white_text_color,
          paddingTop: SH(0),
        },
      }}
    >
      <Tab.Screen
        name={RouteName.HOME_TAB}
        component={HomeTabScreenStack}
        options={{
          tabBarLabel: t("Customesidebar_title_18"),
          tabBarIcon: ({ focused }) => (
            <VectorIcons
              color={focused ? Colors.theme_backgound : Colors.gray_text_color}
              name="home"
              icon="Feather"
              size={SF(20)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.CATEGORIES_SCREEN}
        component={MyCourseTabScreenStack}
        options={{
          tabBarLabel: t("Customesidebar_title_19"),
          tabBarIcon: ({ focused }) => (
            <VectorIcons
              color={focused ? Colors.theme_backgound : Colors.gray_text_color}
              name="copy1"
              icon="AntDesign"
              size={SF(20)}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name={RouteName.EXAM_TAB}
        component={ExamTabScreenStack}
        options={{
          tabBarLabel: t("Customesidebar_title_20"),
          tabBarIcon: ({ focused }) => (
            <VectorIcons
              color={focused ? Colors.theme_backgound : Colors.gray_text_color}
              name="open-book"
              icon="Entypo"
              size={SF(20)}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name={RouteName.WHISHILIST_TAB}
        component={WishlistTabScreenStack}
        options={{
          tabBarLabel: t("Customesidebar_title_21"),
          tabBarIcon: ({ focused }) => (
            <VectorIcons
              color={focused ? Colors.theme_backgound : Colors.gray_text_color}
              name="hearto"
              icon="AntDesign"
              size={SF(20)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.PROFILE_TAB}
        component={ProfileScreenStack}
        options={{
          tabBarLabel: t("Customesidebar_title_22"),
          tabBarIcon: ({ focused }) => (
            <VectorIcons
              color={focused ? Colors.theme_backgound : Colors.gray_text_color}
              name="user-circle"
              icon="FontAwesome"
              size={SF(20)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
