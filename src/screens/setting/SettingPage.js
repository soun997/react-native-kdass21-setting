import React, { useState } from 'react';
import { SafeAreaView, View, ImageBackground, StatusBar } from 'react-native';
import {
    styles_common,
    styles_setting,
    BlankArea,
} from '../../components/styles';
import { Label } from '../../components/setting/Labeled';
import CenteredText from '../../components/setting/CenteredText';
import SwitchContainer from '../../components/setting/SwitchContainer';

// 이 아래 변수를 /src/navigations/Tab.js에서 import한 후, <Tab.Screen> </Tab.Screen> 안의 컴포넌트로 사용함
export const Setting = () => {
    // 얘네를 한 번에 묶어서 props로 전달하고 싶음... 너무 길기 때문!
    let labels = ['우리집', '학교', '집', '긱사', '본가'];
    let addressTypes = ['도로명', '지번', '도로명', '도로명', '지번'];
    let addresses = ['경기도 시흥시 산기대학로 237', '경기도 시흥시 정왕동 2121-1', 'ㅁㅇㄴㄹ', 'ㅂㄷㅈㄱ', '냥냥늉'];

    return (
        <ImageBackground
            style={{ width: '100%', height: '100%' }}
            source={require('../../../assets/images/background/back.png')}
            resizeMode="cover"
        >
            <View
                style={[
                    styles_common.container_background,
                    { backgroundColor: 'transparent' },
                ]}
            >
                <SafeAreaView />
                <StatusBar barStyle="dark-content" />
                {/*헤더 부분*/}
                <View style={styles_setting.header}>
                    <CenteredText
                        width={100}
                        height={7}
                        fontSize={14}
                        textAlign="center"
                        color="#3e3e3e"
                    >
                        설정
                    </CenteredText>
                </View>

                <BlankArea height={6} />

                <Label
                    labels={labels}
                    addressTypes={addressTypes}
                    addresses={addresses}
                >
                    이 날 나의 감정
                </Label>
                <SwitchContainer
                    num={1}
                    labels={['방해금지 시간대 설정']}
                    disturbMode={true}
                />
                <BlankArea height={8} />

                <Label>혜택 이벤트 알림</Label>
                <SwitchContainer labels={['앱푸시']} />
                <BlankArea height={8} />

                <Label
                    haveButton
                    labels={labels}
                    addressTypes={addressTypes}
                    addresses={addresses}
                >
                    나의 자주가는 위치
                </Label>
                <SwitchContainer labels={labels} />
                <BlankArea height={37} />
            </View>
        </ImageBackground>
    );
};
