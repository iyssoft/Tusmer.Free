import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, icons } from '../constants'
import { Home, MyLearning, Bookmark, Profile } from '../screens'

const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: COLORS.white,
    },
}

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={icons.home}
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.secondaryGray,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'regular',
                                        color: focused
                                            ? COLORS.primary
                                            : COLORS.secondaryGray,
                                    }}
                                >
                                    Home
                                </Text>
                            </View>
                        )
                    },
                }}
            />

            <Tab.Screen
                name="MyLearning"
                component={MyLearning}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={icons.file}
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.secondaryGray,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'regular',
                                        color: focused
                                            ? COLORS.primary
                                            : COLORS.secondaryGray,
                                    }}
                                >
                                    My Learning
                                </Text>
                            </View>
                        )
                    },
                }}
            />

            <Tab.Screen
                name="Bookmark"
                component={Bookmark}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={icons.bookmark}
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.secondaryGray,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'regular',
                                        color: focused
                                            ? COLORS.primary
                                            : COLORS.secondaryGray,
                                    }}
                                >
                                    Bookmark
                                </Text>
                            </View>
                        )
                    },
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={icons.user}
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.secondaryGray,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: 'regular',
                                        color: focused
                                            ? COLORS.primary
                                            : COLORS.secondaryGray,
                                    }}
                                >
                                    Profile
                                </Text>
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation