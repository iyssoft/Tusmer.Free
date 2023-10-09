import { TouchableOpacity, Text } from 'react-native'
import { COLORS } from '../constants'

const KeywordItem = ({ item, onPress, selected }) => {
    const itemStyle = {
        ...{
            padding: 14,
            marginHorizontal: 5,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: COLORS.gray,
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
        },
        backgroundColor: selected ? COLORS.primary : COLORS.white, // Change color based on selection
    }

    return (
        <TouchableOpacity style={itemStyle} onPress={() => onPress(item.id)}>
            <Text style={{ color: selected ? COLORS.white : COLORS.black }}>
                {item.keyword}
            </Text>
        </TouchableOpacity>
    )
}

export default KeywordItem
