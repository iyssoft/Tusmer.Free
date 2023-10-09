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
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Input from '../components/Input'
import Button from '../components/Button'
import SocialButton from '../components/SocialButton'
import ToastItem from '../components/ToastItem'

const isTestMode = true

const initialState = {
    inputValues: {
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const Login = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isSuccess, setIsSuccess] = useState(false)

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

                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Hoşgeldiniz</Text>
                    <Text style={styles.subtitle}>
                    Tıp öğrencileri için ÜCRETSİZ bilgileri içeren, tıp öğrencilerinin bilgi ve başarı seviyelerini yükseltmeyi hedefleyen öğrenci dostu bir bilgi paylaşım platformudur.
TUSMERFREE ÜCRETSİZ OLACAK VE ÜCRETSİZ KALACAKTIR.
                    </Text>
                </View>

                <View>
                    <Input
                        id="email"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        placeholder="Email adresiniz"
                        placeholderTextColor={COLORS.black}
                        keyboardType="email-address"
                        iconPack={MaterialCommunityIcons}
                        icon="email-outline"
                    />
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        autoCapitalize="none"
                        id="password"
                        placeholder="Şifreniz"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                        iconPack={Feather}
                        icon="lock"
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotPassword}>
                            Şifremi unuttum!
                        </Text>
                    </TouchableOpacity>
                    <Button
                        title="Giriş Yap"
                        isLoading={isLoading}
                        filled
                        onPress={() => {
                            setIsSuccess(true)
                            // navigation.navigate('Main')
                        }}
                        style={{ marginTop: 10, marginBottom: 2 }}
                    />
                    <Button
                        title="Hesap Oluştur"
                        isLoading={isLoading}
                        onPress={() => navigation.navigate('Register')}
                        style={{ marginVertical: 10 }}
                    />
                    {/* <Text style={styles.policy}>
                        Kayıt olarak kullanım koşullarını kabul etmiş ve iletişim izni vermiş olursunuz.
                    </Text> */}
                    {/* <View style={styles.separateLine} /> */}
                    {/* <SocialButton
                        name="Google"
                        icon={icons.google}
                        onPress={() => console.log('Login with google')}
                    /> */}
                    {isSuccess && (
                    <ToastItem
                        toastBackground="rgba(5, 156, 106, .2)"
                        icon={icons.error}
                        iconColor={COLORS.red}
                        description="Kayıtlı bir hesap bulunamadı"
                        descriptionColor={COLORS.red}
                    />
                )}
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
    forgotPassword: {
        fontSize: 13,
        fontFamily: 'medium',
        color: COLORS.primary,
        textAlign: 'right',
        marginVertical: 6,
    },
})

export default Login
