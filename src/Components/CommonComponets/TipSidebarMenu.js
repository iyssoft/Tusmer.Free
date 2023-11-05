import React, { useState,useContext } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Sidemenu } from '../../style';
import { RouteName } from '../../routes';
import { ConfirmationAlert, Container, VectorIcons } from '../../Components';
import { Colors, SF } from '../../Utiles';
import { useTranslation } from "react-i18next";
import { TipSidebarMenuData } from '../../services/datas';
import { AuthContext } from '../../store/auth-context';


const TipSidebarMenu = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  var alertdata = {
    'logout': t("Are_You_Sure_logout"),
  }
  const authCtx= useContext(AuthContext);
  const onoknutton = () => {
    authCtx.logout();
    //navigation.navigate(RouteName.LOGIN_SCREEN);
  }
  const Onpressfunction = (e,id) => {
    navigation.toggleDrawer();
    navigation.navigate(e,{id:id})
  };
  const menuList =  TipSidebarMenuData.map((menu) => {
    return(
    <TouchableOpacity style={Sidemenu.flexrowset} onPress={
        () => Onpressfunction(menu.screen, menu.id)
     }>
        <Text style={Sidemenu.hometextstyle}>{menu.title}</Text>
    </TouchableOpacity>)
});
  return (
    <Container>
      <View style={Sidemenu.setheightview}>
        <ScrollView>
          <View style={Sidemenu.customslidebarmenu}>
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.HOME_TAB)
            }>
              {/* <VectorIcons
                icon="Feather"
                size={SF(19)}
                name="home"
                color={Colors.theme_backgound}
              /> */}
              <Text style={Sidemenu.hometextstyle}>Anasayfa</Text>
            </TouchableOpacity>
            
        {menuList}
            <View style={Sidemenu.settingandlogout}>
              <TouchableOpacity style={Sidemenu.flexrowset} onPress={() => {
                setAlertVisible(true);
                setAlertMessage(alertdata.logout);
              }}>
                <VectorIcons
                  icon="Entypo" name="log-out" color={Colors.theme_backgound} size={SF(23)} />
                <Text style={Sidemenu.hometextstyle}>Çıkış Yap</Text>
              </TouchableOpacity>
            </View>
            <ConfirmationAlert
              message={alertMessage}
              modalVisible={alertVisible}
              setModalVisible={setAlertVisible}
              onPressCancel={() => setAlertVisible(!alertVisible)}
              onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
              cancelButtonText={t("Cancel_Button")}
              buttonText={t("Ok_Text")}
            />
          </View>
        </ScrollView>
      </View>
    </Container>

  );
};
export default TipSidebarMenu;

