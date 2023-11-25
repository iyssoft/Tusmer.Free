import React, { useState, useEffect, useMemo, useContext } from "react";
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, Modal, ScrollView,KeyboardAvoidingView,Dimensions } from "react-native";
import { ProfileTabStyles, Style, CongratulationStyle } from '../../../style';
import { Button, Spacing, Input, VectorIcons, ConfirmationAlert, Container } from '../../../Components';
import { SH, SF } from '../../../Utiles';
import images from "../../../index";
import { RouteName } from "../../../routes";
import { useTranslation } from "react-i18next";
import { AuthContext } from '../../../store/auth-context';
import { color } from "react-native-elements/dist/helpers";

const ProfileTab = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalcontent, setmodalcontent] = useState(0);
  const [passwordVisibilityold, setpasswordVisibilityold] = useState(true);
  const [passwordVisibilitynew, setpasswordVisibilitynew] = useState(true);
  const [passwordVisibilityconfirm, setPasswordVisibilityconfirm] = useState(true);
  const { Colors } = useTheme();
  const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);
  const authCtx= useContext(AuthContext);
  const CongratulationStyles = useMemo(() => CongratulationStyle(Colors), [Colors]);
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;
  const stateArray = {
    Oldpassword: "",
    Newpassword: "",
    email: "",
    Confirmpassword: "",
    number: null,
  };
  const [state, setState] = useState(stateArray);
  const onChangeText = (text) => {
    if (text === 'Oldpassword') setpasswordVisibilityold(!passwordVisibilityold);
    if (text === 'Newpassword') setpasswordVisibilitynew(!passwordVisibilitynew);
    if (text === 'Confirmpassword') setPasswordVisibilityconfirm(!passwordVisibilityconfirm);
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      setModalVisible(false);
      setmodalcontent(0);
    });
  }, [navigation]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    'logout': t("Are_You_Sure_logout"),
    "delete": "Hesabınızı Silmek İstediğinize emin misini?"
  }
  const onoknutton = () => {
    authCtx.logout(); }
    const deleteAccount = () => {
      authCtx.logout();}
      if(authCtx.isAuthenticated){
  return (
    <Container>
      <ScrollView>
        <View style={ProfileTabStyle.BackgroundWhite}>
          <View style={ProfileTabStyle.whilistminbody}>
            {/* <View style={ProfileTabStyle.ImagCenter}>
              <View>
                <Image style={ProfileTabStyle.ImageStyles} resizeMode='cover' source={images.User_image_one_profile} />
                <Text style={ProfileTabStyle.UserName}>{t("Allison_Perry_Name")}</Text>
              </View>
            </View> */}
            <View style={ProfileTabStyle.ProfileDetailesMinview}>
              {/* <Text style={ProfileTabStyle.EditProFile}>
                {t("Edit_Profile")}
              </Text>
              <View style={ProfileTabStyle.PhoneNumberAndIcon}>
                <View style={ProfileTabStyle.BgWhiteShadow}>
                  <View>
                    <Text style={ProfileTabStyle.PhoneNumberText}>{t("Phone_Number_Text")}</Text>
                    <Text style={ProfileTabStyle.DigitNumberText}>96034 56878</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => { setModalVisible(true); setmodalcontent(1) }} >
                      <View>
                        <VectorIcons
                          icon="EvilIcons"
                          size={SF(30)}
                          name="pencil"
                          color={Colors.gray_text_color}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => { setModalVisible(!modalVisible) }}
                >
                  <View style={ProfileTabStyle.CenteredView}>
                    <View style={ProfileTabStyle.ModalView}>
                      <View style={ProfileTabStyle.ShadowStyleModalTwo}>
                        <View style={ProfileTabStyle.AllPaddingModal}>
                          <TouchableOpacity style={ProfileTabStyle.IconClose} onPress={() => setModalVisible(!modalVisible)}>
                            <VectorIcons
                              icon="AntDesign"
                              size={SF(25)}
                              name="close"
                              color={Colors.black_text_color}
                            />
                          </TouchableOpacity>
                          {modalcontent === 1 ?
                            <View>
                              <Text style={ProfileTabStyle.ModalText}>{t("Change_Phone_Number")}</Text>
                              <Spacing space={SH(10)} />
                              <Input
                                style={ProfileTabStyle.input}
                                onChangeText={(text) => setState({ ...state, number: text })}
                                value={state.number}
                                placeholder="9603456878"
                                placeholderTextColor={Colors.gray_text_color}
                                keyboardType="numeric"
                              />
                            </View>
                            :
                            modalcontent === 2 ?
                              <View>
                                <Text style={ProfileTabStyle.ModalText}>{t("Change_Email")}</Text>
                                <Spacing space={SH(10)} />
                                <View>
                                  <Input
                                    style={ProfileTabStyle.BgWhiteShadowInputModal}
                                    onChangeText={(text) => setState({ ...state, email: text })}
                                    value={state.email}
                                    placeholder={t("Exam_Email_Text")}
                                    placeholderTextColor={Colors.gray_text_color}
                                  />
                                </View>
                              </View>
                              :
                              modalcontent === 3 ?
                                <View>
                                  <Text style={ProfileTabStyle.ModalText}>{t("change_Your_Password_Text")}</Text>
                                  <Spacing space={SH(10)} />
                                  <View style={Style.FlexRowPassword}>
                                    <View style={Style.InputViewWidth}>
                                      <Spacing space={SH(35)} />
                                      <Input
                                        name="password"
                                        placeholder={t("Old_Password")}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={passwordVisibilityold}
                                        onChangeText={(text) => setState({ ...state, Oldpassword: text })}
                                        value={state.Oldpassword}
                                        enablesReturnKeyAutomatically
                                        placeholderTextColor={Colors.gray_text_color}
                                      />
                                      <TouchableOpacity style={Style.IconPostionAboluteTwo} onPress={() => { onChangeText("Oldpassword") }}>
                                        <VectorIcons icon="Ionicons" name={passwordVisibilityold ? 'eye-off' : 'eye'} size={SF(25)} style={ProfileTabStyle.eyeiconset} />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                  <Spacing space={SH(20)} />
                                  <View style={Style.FlexRowPassword}>
                                    <View style={Style.InputViewWidth}>
                                      <Spacing space={SH(35)} />
                                      <Input
                                        inputStyle={Style.InputStyles}
                                        name="password"
                                        placeholder={t("New_Password")}
                                        autoCapitalize="none"
                                        placeholderTextColor={'gray'}
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={passwordVisibilitynew}
                                        onChangeText={(text) => setState({ ...state, Newpassword: text })}
                                        value={state.Newpassword}
                                        enablesReturnKeyAutomatically
                                      />
                                      <TouchableOpacity style={Style.IconPostionAboluteTwo} onPress={() => { onChangeText("Newpassword") }}>
                                        <VectorIcons icon="Ionicons" name={passwordVisibilitynew ? 'eye-off' : 'eye'} size={SF(25)} style={ProfileTabStyle.eyeiconset} />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                  <Spacing space={SH(20)} />
                                  <View style={Style.FlexRowPassword}>
                                    <View style={Style.InputViewWidth}>
                                      <Spacing space={SH(35)} />
                                      <Input
                                        inputStyle={Style.InputStyles}
                                        name="Confirm New Password"
                                        placeholder={t("Conform_Password")}
                                        placeholderTextColor={Colors.gray_text_color}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={passwordVisibilityconfirm}
                                        onChangeText={(text) => setState({ ...state, Confirmpassword: text })}
                                        value={state.Confirmpassword}
                                        enablesReturnKeyAutomatically
                                      />
                                      <TouchableOpacity style={Style.IconPostionAboluteTwo} onPress={() => { onChangeText("Confirmpassword") }}>
                                        <VectorIcons icon="Ionicons" name={passwordVisibilityconfirm ? 'eye-off' : 'eye'} size={SF(25)} style={ProfileTabStyle.eyeiconset} />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                  <Spacing space={SH(30)} />
                                </View>
                                :
                                modalcontent === 4 ?
                                  <Text style={ProfileTabStyle.ModalText}>{t("Are_You_Sure")}</Text>
                                  :
                                  null}
                          {modalcontent === 1 || modalcontent === 2 || modalcontent === 3 ?
                            <View style={ProfileTabStyle.ButtonsetModleTwoButton}>
                              <View style={ProfileTabStyle.Marginright}>
                                <Button onPress={() => setModalVisible(!modalVisible)}
                                  buttonTextStyle={{ color: Colors.white_text_color }}
                                  title={t("Ok_Text")} />
                              </View>
                              <View style={ProfileTabStyle.Marginright}>
                                <Button buttonStyle={ProfileTabStyle.SingleButtonStyles} buttonTextStyle={ProfileTabStyle.SingleButtonText} title={t("Cancel_Button")} onPress={() => setModalVisible(!modalVisible)} />
                              </View>
                            </View>
                            :
                            <View style={ProfileTabStyle.ButtonsetModleTwoButton}>
                              <View style={ProfileTabStyle.MarginRightView}>
                                <Button title={t("Log_Out")} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} />
                              </View>
                              <View style={ProfileTabStyle.MarginRightView}>
                                <Button title={t("Cancel_Button")} onPress={() => setModalVisible(!modalVisible)} buttonStyle={ProfileTabStyle.SingleButtonStyles} buttonTextStyle={ProfileTabStyle.SingleButtonText}
                                />
                              </View>
                            </View>
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={ProfileTabStyle.PhoneNumberAndIcon}>
                <View style={ProfileTabStyle.BgWhiteShadow}>
                  <View style={ProfileTabStyle.setpadiingtext}>
                    <Text style={ProfileTabStyle.PhoneNumberText}>{t("Email_Text")}</Text>
                    <Text style={ProfileTabStyle.DigitNumberText}>{t("Testemail")}</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => { setModalVisible(true); setmodalcontent(2) }}>
                      <View>
                        <VectorIcons
                          icon="EvilIcons"
                          size={SF(30)}
                          name="pencil"
                          color={Colors.gray_text_color}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={ProfileTabStyle.PhoneNumberAndIcon}>
                <View style={ProfileTabStyle.BgWhiteShadow}>
                  <View>
                    <Text style={ProfileTabStyle.PhoneNumberText}>{t("Password_Text")}</Text>
                    <Text style={ProfileTabStyle.DigitNumberText}>******</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => { setModalVisible(true); setmodalcontent(3) }}>
                      <View>
                        <VectorIcons
                          icon="EvilIcons"
                          size={SF(30)}
                          name="pencil"
                          color={Colors.gray_text_color}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Spacing space={SH(20)} /> */}
              <TouchableOpacity onPress={() => {
                setAlertVisible(true);
                setAlertMessage(alertdata.logout);
              }}>
                <View style={ProfileTabStyle.IconAndTextFlex}>
                  <View>
                    <Text style={ProfileTabStyle.LogOutView}>{t("Log_Out")}</Text>
                  </View>
                  <View>
                    <VectorIcons
                      icon="AntDesign"
                      size={SF(27)}
                      name="arrowright"
                      color={Colors.black_text_color}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <ConfirmationAlert
                message={alertMessage}
                modalVisible={alertVisible}
                setModalVisible={setAlertVisible}
                onPressCancel={() => setAlertVisible(!alertVisible)}
                onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
                cancelButtonText={t("Cancel_Button")}
                buttonText={t("Ok_Text")}
              />
                <TouchableOpacity onPress={() => {
                setAlertVisible(true);
                setAlertMessage(alertdata.delete);
              }}>
                <View style={ProfileTabStyle.IconAndTextFlex}>
                  <View>
                    <Text style={ProfileTabStyle.LogOutViewRed}>{"Hesabımı Sil"}</Text>
                  </View>
                  <View>
                    <VectorIcons
                      icon="AntDesign"
                      size={SF(27)}
                      name="delete"
                      color={Colors.red_color_set}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <ConfirmationAlert
                message={alertMessage}
                modalVisible={alertVisible}
                setModalVisible={setAlertVisible}
                onPressCancel={() => setAlertVisible(!alertVisible)}
                onPress={() => { setAlertVisible(!alertVisible), deleteAccount() }}
                cancelButtonText={t("Cancel_Button")}
                buttonText={t("Ok_Text")}
              />
              {/* <TouchableOpacity onPress={() => navigation.navigate(RouteName.SETTINGS_SCREEN)}>
                <View style={ProfileTabStyle.IconAndTextFlex}>
                  <View>
                    <Text style={ProfileTabStyle.LogOutView}>{t("Setting_Text")}</Text>
                  </View>
                  <View>
                    <VectorIcons
                      icon="AntDesign"
                      size={SF(27)}
                      name="arrowright"
                      color={Colors.black_text_color}
                    />
                  </View>
                </View>
              </TouchableOpacity> */}
            </View>

          </View>
        </View>
      </ScrollView>
    </Container>
  );
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
export default ProfileTab;