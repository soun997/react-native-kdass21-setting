import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { setHeight, setWidth } from '../GlobalVariables';
import { styles_setting } from '../styles';
import CenteredText from './CenteredText';

const TimePicker = props => {
    const hour = props.hour < 10 ? '0' + props.hour : props.hour;
    const minute = props.minute < 10 ? '0' + props.minute : props.minute; 

    return (
        <View style={styles_setting.timepicker}>
            <Pressable
                style={{
                    width: setWidth(32),
                    height: setHeight(10),
                    marginLeft: setWidth(props.marginLeft),
                }}
                onPress={() => {props.onPress()}}
            >
                <CenteredText width={30} height={5} fontSize={12} color="#ababab">
                    {props.title}
                </CenteredText>
                <View style={{flexDirection: "row"}}>
                    <CenteredText width={25} height={5} fontSize={12} color="#737373">
                        {props.isAM ? "AM" : "PM"} {hour}:{minute}
                    </CenteredText>
                    <Image
                        source={require('../../../assets/images/icon/TimePicker.png')}
                        style={{width: setWidth(5), height: setHeight(5)}}
                    ></Image>
                </View>
            </Pressable>
        </View>
    );
};

export default TimePicker;
