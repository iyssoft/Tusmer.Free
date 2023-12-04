import React, {useContext, useRef, useState} from 'react';
// import {PageContext} from '../../../App';
import {View, Text, TouchableOpacity, Image, TextInput, Alert, Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const dummyArr = [
    {
        text: 'Lorem Ipsum',
        value: 'lorem_ipsum',
    },
    {
        text: 'Lorem Ipsumm',
        value: 'lorem_ipsumm',
    },
];

export default function ({initial_value = 'Initial Value', data = dummyArr, onPress, border = true}) {
    const [visible, setVisible] = useState(false);
    const [arr, setArr] = useState(data);
    const [value, setValue] = useState(initial_value);

    const onPick = (item, idx) => {
        return () => {
            setValue(item.text);
            setVisible(false);
            return onPress(item);
        };
    };
    return (
        <View>

            <TouchableOpacity onPress={() => setVisible(true)}
                              style={{
                                  height: 30,
                                  borderWidth: border ? 1 : 0,
                                  borderRadius: border ? 0 : 0,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  paddingHorizontal: 0,
                              }}>
                <View>

                    <Text style={{color: '#DCDCDC', fontSize: 14, opacity: 0.7}}>{value}</Text>
                </View>

            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{
                    backgroundColor: 'rgba(52, 52, 52, 0.5)',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 2,
                    width:70
                }}>

                    <ScrollView style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 5, borderWidth: 0, borderColor: '#E0E0E0'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}/>
                            {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text>Oynatma Hızı</Text>
                            </View> */}
                            {/* <TouchableOpacity onPress={() => setVisible(false)} style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image style={{width: 15, height: 15}}
                                       source={require('../../../assets/icon/ic_close.png')}/>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{padding: 0}}>
                            {
                                arr.map((x, y) => {
                                    return (
                                        <TouchableOpacity onPress={onPick(x)} key={y} style={{
                                            height: 40,
                                            borderBottomWidth: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderBottomColor: '#E0E0E0',
                                        }}>
                                            <Text style={{color:"#D3D3D3"}}>{x.text}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}
