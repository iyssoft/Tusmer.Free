import React, { useState, useMemo, useContext, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,ActivityIndicator } from 'react-native';
import { Input, Button, CheckBox, Spacing, Countrycode, PasswordInput, Container, ModalTitle, VectorIcons } from '../../../Components';
import { SH, SF, TitleDropdownData, UniversityDropdownData, StudentClassDropdownData, SW, Fonts, Colors } from '../../../Utiles';
import { RouteName } from '../../../routes';
import { Login, Style, TitleStyles,theme_backgound } from '../../../style';
import { useTranslation } from "react-i18next";
import { userRegister, userLogin, fetchUniversities } from "../../../services/api";
import { AuthContext } from '../../../store/auth-context';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

const Register = (props) => {
    const { navigation } = props;
    const stateArray = {
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNumber: "",
        toggleCheckBox: false,
        password: "",
        rePassword: "",
        customerRoleId: 0,
        university: 0,
        studentClass: 0
    };
    const [state, setState] = useState(stateArray);
    const[universities, setUniversities] = useState([]);
    const [showUniversity, setShowUniversity] = useState(false);
    const [showStudentClass, setShowStudentClass] = useState(false);
    const { t } = useTranslation();
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const [isLoading, setIsLoading] = useState(false);
    let userType = t("Tıp Öğrencisi");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectLabel, setSelectLabel] = useState(userType);
    
    const { Colors } = useTheme();
    const Logins = useMemo(() => Login(Colors), [Colors]);
    const TitleStyle = useMemo(() => TitleStyles(Colors), [Colors]);
    const authCtx= useContext(AuthContext);
useEffect(() => {
    async function getUniversities(){
        const universitiesData = await fetchUniversities();
        setUniversities(universitiesData);
    }
    getUniversities();
},[]);
    const changeUserType = (e) => {
        console.log(e);
        //setSelectLabel(e);
        setShowUniversity(false);
        setShowStudentClass(false);
        if(e != null)
        {
            setState({ ...state, customerRoleId: e.id })
            if(e.id == 13)
            {
                setShowUniversity(true);
                setShowStudentClass(true);
            }
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
      const [isAuthenticating, setIsAuthenticating] = useState(false);
    async function registerUserHandler() {
        
        let {emailId, mobileNumber, password,rePassword, firstName, lastName, customerRoleId, university, studentClass} = state;
        console.log(state);
        emailId= emailId.trim();
        
        password = password.trim();
        // const emailIsValid = emailId.includes("@");
        const passwordIsValid= password.length > 5;
        const passwordsAreEqual= password === rePassword
        let valid= true;
        if(!passwordIsValid)
        {
            Alert.alert("Şifreniz en az 6 karekterden oluşmalı.")
        }else{
            if(
                // !emailIsValid ||
                !passwordsAreEqual ||
                firstName.length == 0 ||
                lastName.length == 0 ||
                mobileNumber.length < 10 ||
                customerRoleId == 0
            )
            {
                valid= false;            
            }
            if(customerRoleId == 13){
                if(university == 0 || studentClass == 0)
                {
                    valid= false;
                }
            
            }
            if(!valid)
            {
                Alert.alert("Tüm alanları eksiksiz ve doğru giriniz.")
            }
            else{
                setIsAuthenticating(true);
                setIsLoading(true);
                try{
                    await userRegister(state);
                    const token= await userLogin(mobileNumber, password)
                    console.log(token);
                    authCtx.authenticate(token);
                }catch(error){
                    console.log(error.response.data);
                    setIsLoading(false);
                    Alert.alert(error.response.data.Message)
                }
                setIsAuthenticating(false);
            }
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
                                <Text style={Logins.RegisterText}>{t("Register_Text")}</Text>
                            </View>
                            <Input
                                title={t("Enter_Your_FirstName")}
                                placeholder={t("Enter_Your_FirstName")}
                                onChangeText={(text) => setState({ ...state, firstName: text })}
                                value={state.firstName}
                            />
                            <Input
                                title={t("Enter_Your_LastName")}
                                placeholder={t("Enter_Your_LastName")}
                                onChangeText={(text) => setState({ ...state, lastName: text })}
                                value={state.lastName}
                            />
                            {/* <View style={Style.FlexRowPassword}>
                                <View style={Style.InputViewWidth}> */}
                                    {/* <View style={Style.CountryCodeIconCenter} >
                                        <Countrycode />
                                    </View> */}
                                    <Input
                                        title={"Telefon No(sisteme giriş yapmak için gerekli) "}
                                        placeholder={t("Mobile_Number")}
                                        onChangeText={(text) => setState({ ...state, mobileNumber: text })}
                                        value={state.mobileNumber}
                                        maxLength={10}
                                        inputType="numeric"
                                        placeholderTextColor={Colors.gray_text_color}
                                    />
                                {/* </View>
                            </View> */}
                            {/* <Input
                                title={t("Email_Text")}
                                placeholder={t("Email_Text")}
                                onChangeText={(text) => setState({ ...state, emailId: text })}
                                value={state.emailId}
                                placeholderTextColor={Colors.gray_text_color}
                            /> */}
                 
                                <Text style={TitleStyle.Label}>Ünvanınız</Text>
                                <View style={{marginLeft:15, marginRight:15}}>
                                <>
                                    <AutocompleteDropdown
                                        dataSet={TitleDropdownData}
                                        closeOnBlur={false}
                                        useFilter={false}
                                        clearOnFocus={false}
                                        textInputProps={{
                                        style: {
                                            backgroundColor: '#e8eefc',
                                          },
                                        }}
                                        onSelectItem={changeUserType}
                                        containerStyle={styles.input_style}
                                        //loading={loading}
                                        //onChangeText={getSuggestions}
                                        suggestionsListTextStyle={{
                                        color: '#8f3c96'
                                        }}
                                        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
                                    />
                                    </>
                                </View>                                
                     
                            <Spacing space={SH(30)} />
                             {showUniversity ? (
                                <View>
                                <Text style={TitleStyle.Label}>Üniversiteniz</Text>
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
                                              },
                                        }}
                                        onSelectItem={changeUniversity}
                                        containerStyle={styles.input_style}
                                        //loading={loading}
                                        //onChangeText={getSuggestions}
                                        suggestionsListTextStyle={{
                                        color: '#8f3c96'
                                        }}
                                        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
                                    />
                                    </>
                     </View>
                            <Spacing space={SH(30)} />
                             </View>) : null}  
                             {showStudentClass ? (
                                <View>
                                <Text style={TitleStyle.Label}>Sınıfınız</Text>
                                <View style={{marginLeft:15, marginRight:15}}>
                                <>
                                    <AutocompleteDropdown
                                        dataSet={StudentClassDropdownData}
                                        closeOnBlur={false}
                                        useFilter={false}
                                        clearOnFocus={false}
                                        textInputProps={{
                                            style: {
                                                backgroundColor: '#e8eefc',
                                              },
                                        }}
                                        onSelectItem={changeStudentClass}
                                        containerStyle={styles.input_style}
                                        //loading={loading}
                                        //onChangeText={getSuggestions}
                                        suggestionsListTextStyle={{
                                        color: '#8f3c96'
                                        }}
                                        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
                                    />
                                    </>
                     </View>
                            <Spacing space={SH(30)} />
                             </View>) : null}                   
                            <PasswordInput label={t("Password_Text")}
                                placeholder={t("Password_Text")}
                                onChangeTextMain={(text) => setState({ ...state, password: text })}
                                value={state.password}
                            />
                            <Spacing space={SH(20)} />
                            <PasswordInput label={t("Confirm_Password_Text")}
                                placeholder={t("Confirm_Password_Text")}
                                onChangeTextMain={(text) => setState({ ...state, rePassword: text })}
                                value={state.rePassword}
                            />            
                            {/* <View style={Logins.FlexRowChekBox}>
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
                                <Text style={Logins.SimpleTextStyle}>{t("I_Agree_Text")} <Text style={Logins.borderbottomTwo}><Text style={Logins.bluecolor} onPress={() => Linking.openURL('https://myaccount.google.com/')}> {t("Terms_Of_Service")}  </Text></Text>{t("And_text")}  <Text onPress={() => Linking.openURL('https://myaccount.google.com/')} style={Logins.bluecolor}>{t("Privacy_Policy")}</Text></Text>
                            </View> */}
                            <Spacing space={SH(10)} />
                            {isLoading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator  color="#46c1bd" />   
                                    </View>) : (
                                        <View style={Logins.ButtonView}>
                                        <Button
                                            title={t("Register_Text")}
                                            //onPress={() => navigation.navigate(RouteName.REGISTER_SUCCESSFULLY)}
                                            onPress={registerUserHandler}
                                        />
                                    </View>
                                    )}
                            
                            <Spacing space={SH(20)} />
                            <View style={Logins.TopSpace}>
                                <View style={Logins.AlredyAndLoginBox}>
                                    <Text style={Logins.MemberTextStyle}>{t("Already_Member")}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}>
                                        <Text style={Logins.LoginScreenText}>{t("Login_Text")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Container>
        </AutocompleteDropdownContextProvider>
    );
};
export default Register;
