import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import { HomeStyles } from '../../style';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';

const PopularCoursesView = (props) => {
    const { t } = useTranslation();
    const { item, onPress } = props;
    const { Colors } = useTheme();
    const HomeStyle = useMemo(() => HomeStyles(Colors), [Colors]);

    return (
        <View style={HomeStyle.whiteshadowimgbottom}>
            <TouchableOpacity onPress={() => onPress()}>
                <Image style={HomeStyle.imagsetstylesetthreeslider} resizeMode='cover' source={{uri:item.imageUrl}} />
            </TouchableOpacity>
            <View style={HomeStyle.alltextleftset}>
                <Text style={HomeStyle.whitebodyimagetextstyletwo2}>
                    {t(item.title)}
                </Text>
                <Text style={HomeStyle.whitebodyimagetextstyles}>
                    {t(item.shortDescription)}
                </Text>
                <View style={HomeStyle.flexrowsettext}>
                    <View style={HomeStyle.flexsettileimgview}>
                        {item.rating}
                        <Text style={HomeStyle.whitebodyimagetextstyletwo}>
                            {t(item.blacktitledigit2)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default PopularCoursesView;