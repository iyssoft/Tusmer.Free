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
            {!authCtx.IsHideMenuItem && <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.DELEGATE_SCREEN,{type: 1})
            }>
              <VectorIcons
                icon="FontAwesome5"
                size={SF(19)}
                name="phone"
                color={Colors.theme_backgound}
              />
              <Text style={Sidemenu.hometextstyle}>{t("Aranmak İstermisiniz")}</Text>
            </TouchableOpacity>
}
{!authCtx.IsHideMenuItem &&  <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.DELEGATE_SCREEN,{type: 2})
            }>
              <VectorIcons
                icon="FontAwesome5"
                size={SF(19)}
                name="people-carry"
                color={Colors.theme_backgound}
              />
              <Text style={Sidemenu.hometextstyle}>{t("Temsilcimiz Olmak İstermisiniz")}</Text>
            </TouchableOpacity>}
{/* 
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"temsilci_ol"})
            }>
              <VectorIcons
                icon="FontAwesome5"
                size={SF(19)}
                name="people-carry"
                color={Colors.theme_backgound}
              />
              <Text style={Sidemenu.hometextstyle}>{t("Kayıt Olmak İsterim")}</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"temsilci_ol"})
            }>
              <VectorIcons
                icon="FontAwesome5"
                size={SF(19)}
                name="people-carry"
                color={Colors.theme_backgound}
              />
              <Text style={Sidemenu.hometextstyle}>{t("Danışmana Ulaş")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"temsilci_ol"})
            }>
              <VectorIcons
                icon="FontAwesome5"
                size={SF(19)}
                name="people-carry"
                color={Colors.theme_backgound}
              />
              <Text style={Sidemenu.hometextstyle}>{t("Beni Ara")}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"tus_puani_hesapla"})
            }>
              <VectorIcons icon="FontAwesome5" name="poll" style={Sidemenu.logoimage} color={Colors.theme_backgound} size={SF(20)} />
              <Text style={Sidemenu.hometextstyle}>{t("Tus Puanını Hesapla")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Sidemenu.flexrowset} onPress={
              () => Onpressfunction(RouteName.TOPIC_SCREEN,{topicSystemName:"isbirlikleri"})
            }>
              <VectorIcons icon="FontAwesome5" size={SF(19)} name="handshake" style={Sidemenu.logoimage} color={Colors.theme_backgound} />
              <Text style={Sidemenu.hometextstyle}>{t("İşbirliklerimiz")}</Text>
            </TouchableOpacity>         
            <View style={Sidemenu.settingandlogout}>             
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

