import React, { useState, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Modal, VectorIcons, TitleSelectFlat, } from '../../Components';
import { TitleStyles } from '../../style';
import { SF, TitleDropdownData } from '../../Utiles';

const ModalTitle = (props) => {
    const { modalVisible, setModalVisible, close, changeUserType } = props;
    const { t, i18n } = useTranslation();
    const [isFocus, setIsFocus] = useState(false);
    const [IconChange, SetIconChange] = useState('');
    const [selectTitle, setSelectTitle] = useState('8');
    const [selectLabel, setSelectLabel] = useState('');
    const { Colors } = useTheme();
    const TitleStyle = useMemo(() => TitleStyles(Colors), [Colors]);

    return (
        <View>
            <Modal
                modalVisible={modalVisible}
                setModalVisible={() => setModalVisible()}
                close={() => close()}>
                <View style={TitleStyle.TitleViewStyleModal}>
                    <View style={TitleStyle.FlexViewStyle}>
                        <TouchableOpacity style={TitleStyle.CloseButtonStyle} onPress={() => {
                            setModalVisible(false);
                        }}>
                            <VectorIcons name="window-close" icon="FontAwesome" size={SF(35)} color={Colors.theme_backgound} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={TitleDropdownData}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (< TitleSelectFlat item={item} index={index} setIsFocus={setIsFocus}
                            IconChange={IconChange}
                            selectTitle={selectTitle}
                            selectLabel={selectLabel}
                            setSelectTitle={setSelectTitle}
                            SetIconChange={SetIconChange}
                            onPress={() => {
                                setSelectTitle(item.value);
                                setSelectLabel(item.label);
                                SetIconChange(index);
                                setModalVisible(false);
                                changeUserType(item.label,item.value)
                            }}
                        />)}
                        keyExtractor={item => item.id}
                    />
                </View>
            </Modal>
        </View>
    )
}
export default ModalTitle;