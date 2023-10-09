import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import {
    AccessChapter,
    AccessChapterContent,
    BuyMethod,
    BuyMethodMidtrans,
    CompletePersonal,
    Detail,
    ForgotPassword,
    History,
    ListCertificate,
    ListHistory,
    Login,
    MyCertificate,
    MyLearning,
    MyLearningBootcamp,
    MyLearningCourse,
    Notification,
    Onboarding1,
    Onboarding2,
    Onboarding3,
    Profile,
    Register,
    ResetPassword,
    TermsAndConditions,
    UpdateProfile,
    Verification,
} from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkIfFirstLaunch = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched')
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true')
                    setIsFirstLaunch(true)
                } else {
                    setIsFirstLaunch(false)
                }
            } catch (error) {
                setIsFirstLaunch(false)
            }
            setIsLoading(false) // Set loading state to false once the check is complete
        }

        checkIfFirstLaunch()
    }, [])

    if (isLoading) {
        return null // Render a loader or any other loading state component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Login'}
            >
                {/* <Stack.Screen
                    name="Onboarding1"
                    component={Onboarding1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding2"
                    component={Onboarding2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding3"
                    component={Onboarding3}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="Main"
                    component={BottomTabNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AccessChapter"
                    component={AccessChapter}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BuyMethod"
                    component={BuyMethod}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BuyMethodMidtrans"
                    component={BuyMethodMidtrans}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CompletePersonal"
                    component={CompletePersonal}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="History"
                    component={History}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ListCertificate"
                    component={ListCertificate}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ListHistory"
                    component={ListHistory}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyCertificate"
                    component={MyCertificate}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyLearning"
                    component={MyLearning}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyLearningBootcamp"
                    component={MyLearningBootcamp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TermsAndConditions"
                    component={TermsAndConditions}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdateProfile"
                    component={UpdateProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Verification"
                    component={Verification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AccessChapterContent"
                    component={AccessChapterContent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyLearningCourse"
                    component={MyLearningCourse}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
