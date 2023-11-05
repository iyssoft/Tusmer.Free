import React, { useState,useContext } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Sidemenu } from '../../style';
import { RouteName } from '../../routes';
import { ConfirmationAlert, Container, VectorIcons } from '../../Components';
import { Colors, SF } from '../../Utiles';
import { useTranslation } from "react-i18next";
import { AuthContext } from '../../store/auth-context';
const CustomSidebarMenu = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const authCtx= useContext(AuthContext);
  var alertdata = {
    'logout': t("Are_You_Sure_logout"),
  }
  const onoknutton = () => {
    authCtx.logout();
  }
  const Onpressfunction = (e,r) => {
    navigation.toggleDrawer();
    navigation.navigate(e,r)
  };
  return (
    <Container>
      <View style={Sidemenu.setheightview}>
        <ScrollView>
          <View style={Sidemenu.customslidebarmenu}>
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.HOME_TAB)
            }>
              <VectorIcons
                icon="Feather"
                size={SF(19)}
                name="home"
                color={Colors.theme_backgound}
              />
              <Text style={Sidemenu.hometextstyle}>{t("Anasayfa")}</Text>
            </TouchableOpacity>
            {authCtx.isAuthenticated && 
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"universite_analizi"})
            }>
              <VectorIcons
                icon="FontAwesome5"
                size={SF(19)}
                name="university"
                color={Colors.theme_backgound}
              />
              <Text style={Sidemenu.hometextstyle}>{t("Fakültenizin Tus Başarısı")}</Text>
            </TouchableOpacity>}
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"temsilci_ol"})
            }>
              <VectorIcons
                icon="FontAwesome5"
                size={SF(19)}
                name="people-carry"
                color={Colors.theme_backgound}
              />
              <Text style={Sidemenu.hometextstyle}>{t("Temsilcimiz Olmak İstermisiniz")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"tus_puani_hesapla"})
            }>
              <VectorIcons icon="FontAwesome5" name="poll" style={Sidemenu.logoimage} color={Colors.theme_backgound} size={SF(20)} />
              <Text style={Sidemenu.hometextstyle}>{t("Tus Puanını Hesapla")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"kendi_fiyatini_olustur"})
            }>
              <VectorIcons icon="FontAwesome5" size={SF(19)} name="lira-sign" style={Sidemenu.logoimage} color={Colors.theme_backgound} />
              <Text style={Sidemenu.hometextstyle}>{t("Kendi Fiyatını Kendin Oluştur")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"isbirlikleri"})
            }>
              <VectorIcons icon="FontAwesome5" size={SF(19)} name="handshake" style={Sidemenu.logoimage} color={Colors.theme_backgound} />
              <Text style={Sidemenu.hometextstyle}>{t("İşbirliklerimiz")}</Text>
            </TouchableOpacity>         
            <View style={Sidemenu.settingandlogout}>  
            {authCtx.isAuthenticated &&            
              <TouchableOpacity style={Sidemenu.flexrowset} onPress={() => {
                setAlertVisible(true);
                setAlertMessage(alertdata.logout);
              }}>
                <VectorIcons
                  icon="Entypo" name="log-out" color={Colors.theme_backgound} size={SF(23)} />
                <Text style={Sidemenu.hometextstyle}>{t("Log_Out")}</Text>
              </TouchableOpacity>
              }
              {!authCtx.isAuthenticated && <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.LOGIN_SCREEN)
            }>
              <VectorIcons icon="Entypo" size={SF(19)} name="login" style={Sidemenu.logoimage} color={Colors.theme_backgound} />
              <Text style={Sidemenu.hometextstyle}>{t("Giriş Yap")}</Text>
            </TouchableOpacity>   

              }
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
export default CustomSidebarMenu;

