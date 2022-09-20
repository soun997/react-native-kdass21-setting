import React, { useState } from 'react';
import { Modal, View, Image, TextInput, Pressable } from 'react-native';
import { BlankArea, styles_common, styles_setting } from '../styles';
import { GlobalVar, setHeight, setWidth } from '../GlobalVariables';
import CenteredText from './CenteredText';
import { RFValue } from 'react-native-responsive-fontsize';

// TextInput을 수정한 커스텀 컴포넌트, LocationInfo의 Label 입력창
// ***props 정보
// style : 적용할 스타일
// fontSize : 폰트 크기, color: 폰트 색
const LabelInput = props => {
    const [savedLabel, setSavedLabel] = useState(props.value);

    return (
        <TextInput
            value={savedLabel}
            onChangeText={text => setSavedLabel(text)}
            onSubmitEditing={() => props.onSubmit(savedLabel)}
            placeholder="나만의 장소에 이름을 설정해주세요."
            placeholderTextColor='#aaaaaa'
            style={[
                styles_common.text,
                props.style,
                {
                    fontSize: RFValue(
                        props.fontSize * GlobalVar.ValueMultiplied,
                        GlobalVar.FigmaScreenHeight
                    ),
                    color: props.color,
                },
            ]}
        ></TextInput>
    );
};

LabelInput.defaultProps = {
    fontSize: 12,
    color: '#aaaaaa',
};

export default LabelInput;
