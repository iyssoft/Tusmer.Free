import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { SF } from '../../Utiles';
import { VectorIcons } from '../../Components';
import { TitleStyles } from '../../style';
import { useTranslation } from 'react-i18next';

const TitleSelectFlat = (props) => {
    const { t, i18n } = useTranslation();
    const { Colors } = useTheme();
    const TitleStyle = useMemo(() => TitleStyles(Colors), [Colors]);
    const { onPress, setSelectTitle, item, index, IconChange, setIsFocus, SetIconChange } = props;
    return (
        <TouchableOpacity style={TitleStyle.TitleMinView} onPress={() => {
            setSelectTitle(item.value);
            SetIconChange(index); onPress();
        }}>
            <View>
                <Text style={TitleStyle.TextStyle}>{t(item.label)}</Text>
            </View>
            <View>
                <VectorIcons icon="Fontisto" name={IconChange == index ? 'radio-btn-active' : 'radio-btn-passive'} color={Colors.theme_backgound} size={SF(25)} />
            </View>
        </TouchableOpacity>
    )
}
export default TitleSelectFlat;