import React from 'react';
import { Image, TouchableOpacity, View, ScrollView, Text } from 'react-native';
import { styles_common, styles_home } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { GlobalVar, setHeight, setWidth } from './GlobalVariables';

// 음원 이미지 및 아래 텍스트 커스텀 컴포넌트
const RecommendedSoundSource = () => {
    return (
        <TouchableOpacity
            style={
                ([styles_home.TouchableOpacity_Image],
                {
                    marginHorizontal: setWidth(2),
                    marginVertical: '1.5%',
                })
            }
        >
            <Image
                resizeMode="center"
                style={[
                    styles_home.Image_32,
                    {
                        width: setWidth(33),
                        height: setWidth(33),
                        backgroundColor: '#E9E9E9',
                        borderRadius: 10,
                        tintColor: '#939393',
                    },
                ]}
                source={require('../../assets/images/icon/LockLine.png')}
            />
            <Text
                style={[
                    styles_common.text,
                    {
                        fontSize: RFValue(
                            12 * GlobalVar.ValueMultiplied,
                            GlobalVar.ScreenHeight
                        ),
                        color: '#646464',
                        marginTop: setHeight(2),
                    },
                ]}
            >
                봄 맞이 명상 음악
            </Text>
        </TouchableOpacity>
    );
};

export const RecomenedContent = () => {
    return (
        <View
            style={[
                styles_common.container,
                {
                    height: setHeight(50),
                },
            ]}
        >
            <ScrollView
                style={[styles_home.scrollView]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <RecommendedSoundSource />
                <RecommendedSoundSource />
                <RecommendedSoundSource />
                <RecommendedSoundSource />
            </ScrollView>
        </View>
    );
};
