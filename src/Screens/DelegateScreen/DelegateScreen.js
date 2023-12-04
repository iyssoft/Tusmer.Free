import React, { useState, useMemo,useEffect } from "react";
import { useTheme } from '@react-navigation/native';
import { Text, View, ScrollView, TouchableOpacity,ActivityIndicator , StyleSheet, Linking} from "react-native";
import { Login, Style, ReviewsStyle,TitleStyles} from '../../style';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { Button, ConfirmationAlert, Spacing, AppHeader, Input, Container, CheckBox} from '../../Components';
import { SH, SF, Fonts, SW ,StudentTermDropdownData, StudentClassDropdownData} from '../../Utiles';
import { useTranslation } from "react-i18next";
import { RouteName } from "../../routes";
import { fetchUniversities, becomeDelegate } from "../../services/api";
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
const DelegateScreen = (props) => {
  const { t } = useTranslation();
  const { route, navigation } = props;
  const {type} = route.params;
  const { Colors } = useTheme();
  const Logins = useMemo(() => Login(Colors), [Colors]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const ReviewsStyles = useMemo(() => ReviewsStyle(Colors), [Colors]);
  const TitleStyle = useMemo(() => TitleStyles(Colors), [Colors]);
  const stateArray = {
    name_surname: "",
    mobileNumber: "",
    message: "",
    toggleCheckBox: false,
    university: 0,
    studentClass: 0,
    type:type
};
const StudentTermDropdownData2 = [
  { title: "Dönem 1", id: 1 },
  { title: "Dönem 2", id: 2 },
  { title: "Dönem 3", id: 3 }
];
const [checked, setChecked] = React.useState(false);
const toggleCheckbox = () => setChecked(!checked);
const [state, setState] = useState(stateArray);
  const[universities, setUniversities] = useState([]);
  useEffect(() => {
    async function getUniversities(){
        const universitiesData = await fetchUniversities();
        setUniversities(universitiesData);
    }
    getUniversities();
},[]);
  var alertdata = {
    'error': t("Lütfen zorunlu alanları doldurunuz"),
    "success": "Kaydınız alındı. Yetkilimiz en kısa sürede sizinle irtibata geçecektir.",
    "privacy": "Kişisel Verileri Koruma Aydınlatma Metnini okudum ve kabul ediyorum'u seçiniz."
  }

  async function sendFormHandler(){
    try{
      setIsLoading(true);
      if(state.name_surname.length == 0 || state.mobileNumber.length == 0)
      {
        setIsLoading(false);
        setAlertVisible(true);
        setAlertMessage(alertdata.error);
      }
      else{
        if(state.toggleCheckBox)
        {
            await becomeDelegate(state)
            setIsLoading(false);
            setAlertMessage(alertdata.success);
        }
        else{
            setIsLoading(false);
            setAlertMessage(alertdata.privacy);
        }

      }
      
      
  }catch(error)
  {
        setAlertMessage(alertdata.success);
  }
  }
  const changeUniversity= (e) => {
    if(e != null)
    {
        console.log(e);
        setState({ ...state, university: e.id })
    }
    console.log(state);
  }

  const changeStudentClass= (e) => {
    if(e != null)
    {
        setState({ ...state, studentClass: e.id })
    }
  }
  const styles = useMemo(
    () =>
StyleSheet.create({
    input_style: {
      width: '100%',
      borderColor: Colors.black_text_color,
      fontSize: SF(20),
      fontWeight: '600',
      marginBottom: SH(0),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      ppaddingLeft:15,
      borderRadius: SH(7),
      borderWidth: SH(1),
      
    },
    labelStyle: {
      width: '100%',
      fontSize: SF(20),
      color: Colors.black_text_color,
      fontFamily: Fonts.Poppins_Medium,
      paddingHorizontal: SW(5),
      fontWeight: '500',
      paddingVertical: SH(2),
    },
    placeholderStyle: {
      fontSize: SF(19),
      color: Colors.black_text_color,
      fontFamily: Fonts.Poppins_Medium
    },
    errorStyle: {
      color: Colors.theme_backgound,
      fontFamily: Fonts.Poppins_Medium,
    },
  }),
[],
);
  return (
    <AutocompleteDropdownContextProvider>
    <Container>
        <View style={Logins.MinViewBgColor}>
            <ScrollView
                contentContainerStyle={Style.scrollviewstyles}>
                <View style={Logins.Container}>
                    <View style={Style.MinViewContent}>
                        <View style={Logins.TopSpaceRegister}>
                          {type == 1 &&<Text style={Logins.RegisterText}>{t("Sizi Arayalım")}</Text>}  
                          {type == 2 &&<Text style={Logins.RegisterText}>{t("Ekibimize Katılın")}</Text>}
                        </View>
                        <Input
                            title={t("Adınız Soyadınız *")}
                            placeholder={t("Enter_Your_FirstName")}
                            onChangeText={(text) => setState({ ...state, name_surname: text })}
                            value={state.name_surname}
                        />
                        <Input
                            title={t("Telefon Numaranız *")}
                            placeholder={t("Telefon Numaranız")}
                            onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                            value={state.mobileNumber}
                            maxLength={10}
                            inputType="numeric"
                            placeholderTextColor={Colors.gray_text_color}
                        />                                           
                            <Text style={TitleStyle.Label}>Okul / Fakülte</Text>
                            <View style={{marginLeft:15, marginRight:15}}>
                                <>
                                    <AutocompleteDropdown
                                        dataSet={universities}
                                        closeOnBlur={false}
                                        useFilter={false}
                                        clearOnFocus={false}
                                        textInputProps={{
                                            style: {
                                                backgroundColor: '#e8eefc',
                                                fontSize:20,
                                                fontWeight:"700"
                                            },
                                        }}
                                        onSelectItem={changeUniversity}
                                        containerStyle={styles.input_style}
                                        //loading={loading}
                                        //onChangeText={getSuggestions}
                                        suggestionsListTextStyle={{
                                        color: '#8f3c96',
                                        fontSize:20
                                        }}
                                        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
                                    />
                                </>
                         </View>
                            <Text style={TitleStyle.Label}>Dönem</Text>
                            <View style={{marginLeft:15, marginRight:15}}>
                                <>
                                    <AutocompleteDropdown
                                        dataSet={StudentTermDropdownData2}
                                        closeOnBlur={false}
                                        useFilter={false}
                                        clearOnFocus={false}
                                        textInputProps={{
                                            style: {
                                                backgroundColor: '#e8eefc',
                                                fontSize:20,
                                                fontWeight:"700"                                          
                                            },
                                        }}
                                        onSelectItem={changeStudentClass}
                                        containerStyle={styles.input_style}
                                        //loading={loading}
                                        //onChangeText={getSuggestions}
                                        suggestionsListTextStyle={{
                                            color: '#8f3c96',
                                            fontSize:20
                                        }}
                                        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
                                    />
                                </>
                            </View>
                        <Spacing space={SH(30)} />
                        {type == 2 && <View>
                            <Text style={TitleStyle.Label}>{t("İletiniz(tercihe bağlı)")}</Text>
                         <Input
                            inputStyle={ReviewsStyles.PositionStyleInput}
                            onChangeText={(text) => setState({ ...state, message: text })}
                            value={state.message}
                            numberOfLines={3}
                            placeholderTextColor={Colors.black_text_color}
                            />  
                          </View>}

                    
                        <Spacing space={SH(10)} />
                        <View style={Logins.FlexRowChekBox}>
                                <View style={Logins.CheckBoxView}>
                                    <CheckBox
                                        checked={checked}
                                        onPress={toggleCheckbox}
                                        iconType="material-community"
                                        checkedIcon="checkbox-marked"
                                        uncheckedIcon="checkbox-blank-outline"
                                        checkedColor={Colors.theme_backgound}
                                    />
                                </View>
                                <Text style={Logins.SimpleTextStyle}> <Text onPress={() => Linking.openURL('https://tusmer.com/kvkk-metni')} style={Logins.bluecolor}>{t("Kişisel Verileri Koruma Aydınlatma Metnini")}</Text>{t(" okudum ve kabul ediyorum")}</Text>
                            </View> 
                        {isLoading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator  color="#46c1bd" />   
                                </View>) : (
                                    <View style={Logins.ButtonView}>
                                    <Button
                                        title={t("Gönder")}
                                        //onPress={() => navigation.navigate(RouteName.REGISTER_SUCCESSFULLY)}
                                        onPress={sendFormHandler}
                                    />
                                </View>
                                )}
                    </View>
                    <ConfirmationAlert
              message={alertMessage}
              modalVisible={alertVisible}
              setModalVisible={setAlertVisible}
              onPress={() => { setAlertVisible(!alertVisible) }}
              buttonText={t("Tamam")}
            />
                </View>
            </ScrollView>
        </View>
    </Container>
    </AutocompleteDropdownContextProvider>
  );
};
export default DelegateScreen;
