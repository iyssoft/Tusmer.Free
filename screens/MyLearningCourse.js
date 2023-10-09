import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, icons } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { AntDesign, Feather } from '@expo/vector-icons'
import { MyLearningCourses } from '../data/utils'
import MyLearningCard from '../components/MyLearningCard'

const MyLearningCourse = ({ navigation }) => {
    /**
     * Render header
     */
    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 22,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrowleft"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 15,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    My Learning Course
                </Text>
                <TouchableOpacity>
                    <Feather
                        name="more-horizontal"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Render content
     */

    const renderContent = () => {
        const [search, setSearch] = useState('')
        const [filteredCourses, setFilteredCourses] =
            useState(MyLearningCourses)

        const handleSearch = (text) => {
            setSearch(text)
            const filteredData = MyLearningCourses.filter((course) =>
                course.name.toLowerCase().includes(text.toLowerCase())
            )
            setFilteredCourses(filteredData)
        }

        return (
            <View>
                <View
                    style={{
                        height: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: COLORS.tertiary,
                        flexDirection: 'row',
                        borderRadius: 8,
                        marginBottom: 16,
                        borderColor: COLORS.gray6,
                        borderWidth: 1,
                        borderRadius: 8,
                        shadowColor: 'rgba(255, 255, 255, 0.1)',
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                        elevation: 1, // This is for Android shadow
                    }}
                >
                    <TextInput
                        placeholder="Search course here..."
                        placeholderTextColor={COLORS.secondary}
                        value={search}
                        onChangeText={handleSearch}
                        style={{
                            fontSize: 14,
                            paddingHorizontal: 12,
                            flex: 1,
                        }}
                    />
                    <TouchableOpacity onPress={() => console.log('Search')}>
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                height: 24,
                                height: 24,
                                tintColor: COLORS.secondary,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredCourses} // Render only the first three elements
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MyLearningCard
                            image={item.image}
                            type={item.type}
                            chapter={item.chapter}
                            name={item.name}
                            description={item.description}
                            onPress={() => navigation.navigate('Detail')}
                        />
                    )}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
})
export default MyLearningCourse
