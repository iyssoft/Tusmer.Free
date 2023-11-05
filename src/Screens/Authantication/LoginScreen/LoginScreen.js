import React, { useState, useMemo, useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, ScrollView, Image, ActivityIndicator,Alert } from 'react-native';
import { Button, Container, Input, Spacing, PasswordInput, ConfirmationAlert } from '../../../Components';
import { RouteName } from '../../../routes';
import { Style, Login } from '../../../style';
import { SH } from '../../../Utiles';
import images from '../../../index';
import { useTranslation } from "react-i18next";
import { userLogin } from "../../../services/api";
import { AuthContext } from '../../../store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Loginscreen = (props) => {
    const { navigation } = props;
    const [mobileNumber, setMobileNumber] = useState('');
    const { t } = useTranslation();
    const OnRegisterPress = () => {
        navigation.navigate(RouteName.REGISTER_SCREEN);
    }
    const { Colors } = useTheme();
    const Logins = useMemo(() => Login(Colors), [Colors]);
    const[userName, setUserName] = useState("");
    const[password, setpassword] = useState("");
    const authCtx= useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

async function userLoginHandler(){
    try{
        setIsLoading(true);
        const result= await userLogin(userName, password)
        if(result.isSuccess)
        {
            const userData = result.data;
            authCtx.authenticate(userData);
            saveDataToStorage(userData.loginkey,userData.id);
            navigation.navigate(RouteName.HOME_SCREEN)
        }
        else{
            setIsLoading(false);
            //Alert.alert(result.message)
        }

    }catch(error)
    {
        setIsLoading(false);
        setAlertMessage(error.response.data.Message);
        console.log(error.response.data.Message);
        setAlertVisible(true);
        //Alert.alert(error.response.data)
    }
    
}
const saveDataToStorage = (secret, userId) => {
    AsyncStorage.setItem(
      'userLoginData',
      JSON.stringify({
        secret: secret,
        userId: userId,
      })
    );
  };
    return (
        <Container>
            <View style={Logins.MinViewScreen}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={Style.scrollviewstyles}>
                    <View style={Logins.Container}>
                        <View style={Style.MinViewContent}>
                            <View style={Logins.ManViewLogin}>
                                <Image style={Logins.ImageSet} resizeMode='contain' source={images.User_Images} />
                            </View>
                            <Spacing space={SH(30)} />
                            <Text style={Logins.LoginText}>{t("Login_Text")}</Text>
                            <Spacing space={SH(20)} />
                            <View style={Logins.InputSpaceView}>
                                <Input
                                    title={t("Mobile_Number")}
                                    placeholder={t("Mobile_Number")}
                                    onChangeText={(value) => setUserName(value)}
                                    value={userName}ß
                                    inputType="numeric"
                                    maxLength={10}
                                    placeholderTextColor={Colors.gray_text_color}
                                />
                            </View>
                            <PasswordInput label={t("Password_Text")}
                                placeholder={t("Password_Text")}
                                onChangeTextMain={(value) => setpassword(value)}
                                value={password}
                            />
                            <View style={Logins.ViewTextStyle}>
                                <Text style={Logins.TextStyle}>{t("Dont_Have_Account")} <Text style={Logins.registerTextStyle} onPress={() => OnRegisterPress()}> {t("Register_Text")}</Text></Text>
                            </View>
                            <Spacing space={SH(40)} />
                            {isLoading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator  color="#46c1bd" />   
                                    </View>) : (
                                        <View style={Logins.LoginButton}>
                                        <Button
                                            title={t("Login_Text")}
                                            onPress={userLoginHandler}
                                        />
                                    </View>
                                    )}
                            <ConfirmationAlert
                                message={alertMessage}
                                modalVisible={alertVisible}
                                setModalVisible={setAlertVisible}
                                onPress={() => setAlertVisible(!alertVisible)}
                                cancelButtonText={t("Kapat")}
                                buttonText={t("Tamam")}
                                onPressCancel={() => setAlertVisible(!alertVisible)}
                            />
                            {/* <Spacing space={SH(10)} />
                            <TouchableOpacity onPress={() => navigation.navigate(RouteName.FORGET_PASSWORD_SCREEN)}>
                                <Text style={Logins.ForgetPasswordStyles}>{t("Forgot_Password")}</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Container>
    );
}
export default Loginscreen;