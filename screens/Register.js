import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native'
import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import {
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Feather,
} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Input from '../components/Input'
import Button from '../components/Button'
import SocialButton from '../components/SocialButton'
import ToastItem from '../components/ToastItem'
import DropDownPicker from 'react-native-dropdown-picker';


const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
    },
    formIsValid: false,
}

const Register = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isSuccess, setIsSuccess] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(8);
    const [items, setItems] = useState([
      {label: 'Tıp Öğrencisi', value: 8},
      {label: 'Pratisyen Doktor', value: 9},
      {label: 'Asistan Doktor', value: 10},
      {label: 'Uzman Doktor', value: 11}
    ]);

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar hidden />
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                {isSuccess && (
                    <ToastItem
                        toastBackground="rgba(5, 156, 106, .2)"
                        icon={icons.success}
                        iconColor={COLORS.green}
                        description="Your account is successfully registered"
                        descriptionColor={COLORS.green}
                    />
                )}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Ücretsiz Hesap Oluştur</Text>
                    <Text style={styles.subtitle}>
                    Tıp öğrencileri için ÜCRETSİZ bilgileri içeren, tıp öğrencilerinin bilgi ve başarı seviyelerini yükseltmeyi hedefleyen öğrenci dostu bir bilgi paylaşım platformudur.
TUSMERFREE ÜCRETSİZ OLACAK VE ÜCRETSİZ KALACAKTIR.
                    </Text>
                </View>

                <View>
                    <Input
                        id="name"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['name']}
                        placeholder="Adınız"
                        placeholderTextColor={COLORS.black}
                        iconPack={FontAwesome5}
                        icon="user"
                    />
                    <Input
                        id="surname"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['surname']}
                        placeholder="Soyadınız"
                        placeholderTextColor={COLORS.black}
                        iconPack={FontAwesome5}
                        icon="user"
                    />
                    <Input
                        id="email"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        placeholder="Email Adresiniz"
                        placeholderTextColor={COLORS.black}
                        keyboardType="email-address"
                        iconPack={MaterialCommunityIcons}
                        icon="email-outline"
                    />
                    <Input
                        id="phone"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['phone']}
                        placeholder="Telefonunuz"
                        placeholderTextColor={COLORS.black}
                        keyboardType="email-address"
                        iconPack={MaterialCommunityIcons}
                        icon="phone"
                    />
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        autoCapitalize="none"
                        id="password"
                        placeholder="Şifre"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                        iconPack={Feather}
                        icon="lock"
                    />
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['passwordConfirm']}
                        autoCapitalize="none"
                        id="passwordConfirm"
                        placeholder="Şifre Tekrar"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                        iconPack={Feather}
                        icon="lock"
                    />
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}                     
                        />
                    <Button
                        title="Hesap Oluştur"
                        isLoading={isLoading}
                        filled
                        onPress={() => {
                            setIsSuccess(true)
                            navigation.navigate('Verification')
                        }}
                        style={{ marginVertical: 10 }}
                    />
                    <Text style={styles.policy}>
                    Kayıt olarak kullanım koşullarını kabul etmiş ve iletişim izni vermiş olursunuz.

                    </Text>
                    {/* <View style={styles.separateLine} />
                    <SocialButton
                        name="Google"
                        icon={icons.google}
                        onPress={() => console.log('Login with google')}
                    /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        bckgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
    headerContainer: {
        marginVertical: 22,
    },
    title: {
        fontSize: SIZES.h3,
        fontFamily: 'bold',
        textAlign: 'center',
        color: COLORS.black,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'regular',
        textAlign: 'center',
        color: COLORS.black,
    },
    policy: {
        fontSize: 12,
        fontFamily: 'regular',
        textAlign: 'center',
        color: COLORS.black,
    },
    separateLine: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 0.3,
        marginVertical: 16,
    },
})

export default Register
