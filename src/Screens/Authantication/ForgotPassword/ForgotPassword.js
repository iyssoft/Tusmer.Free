import React, { useState, useMemo } from "react";
import { useTheme } from '@react-navigation/native';
import { Text, View, ScrollView, TouchableOpacity,ActivityIndicator } from "react-native";
import { Login, Style } from '../../../style';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { Button, ConfirmationAlert, Spacing, AppHeader, Input, Container, } from '../../../Components';
import { SH, SF } from '../../../Utiles';
import { useTranslation } from "react-i18next";
import { RouteName } from "../../../routes";
import { sendSmsForForgetPassword } from "../../../services/api";
const ForgotPassword = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const [email, setEmailValidError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { Colors } = useTheme();
  const Logins = useMemo(() => Login(Colors), [Colors]);

  var alertdata = {
    'logout': t("Kayıtlı telefonunuza SMS gönderildi"),
  }
  const onoknutton = () => {
    navigation.navigate(RouteName.LOGIN_SCREEN)
  }
  async function sendSms(){
    try{
      setIsLoading(true);
      console.log(email);
      await sendSmsForForgetPassword(email)
      setIsLoading(false);
      setAlertVisible(true);
      setAlertMessage(alertdata.logout);

  }catch(error)
  {
    console.log(error);
      console.log(error.response.data.Message);
      //Alert.alert(error.response.data)
  }
  }
  return (
    <Container>
      <View style={Logins.ForgetPasswordView}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <AppHeader onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} Iconname={true} headerTitle={t("Forget_Password")} />
          <View style={Logins.TabMinView}>
            <View>
              <View style={Logins.TabMinViewChild}>
                <View style={Logins.BorderWidth}>
                  <TouchableOpacity style={Logins.WidthSet}>
                    <Input
                      placeholder={t("Telefon numaranızı giriniz")}
                      inputStyle={Logins.SearchInputBorder}
                      onChangeText={(e) => setEmailValidError(e)}
                      keyboardType={'numeric'}
                      value={email}
                      maxLength={10}
                      leftIcon={<IconM style={Logins.Marginright} name="phone" size={SF(25)} />}
                    />
                  </TouchableOpacity>
                </View>
                <Spacing space={SH(20)} />
                <Text style={Logins.SeTextStyleForget}><Text style={Logins.StarColor}> * </Text> {t("We_Well_Sand_Message")}</Text>
                <Spacing space={SH(20)} />
                {isLoading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator  color="#46c1bd" />   
                                    </View>) : (
                                        <View>
                                        <Button onPress={() => {
                                          sendSms();
                                          
                                        }} title={t("Şifremi Gönder")} />
                                    </View>
                                    )}
                <ConfirmationAlert
                  message={alertMessage}
                  buttonminview={Logins.CenterButton}
                  modalVisible={alertVisible}
                  setModalVisible={setAlertVisible}
                  onPressCancel={() => setAlertVisible(!alertVisible)}
                  onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
                  iconVisible={true}
                  buttonText={t("Tamam")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};
export default ForgotPassword;
