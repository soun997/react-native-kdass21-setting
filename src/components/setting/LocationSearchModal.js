import React, { useState } from 'react';
import { Modal, View, Image, TextInput, Pressable } from 'react-native';
import { BlankArea, styles_common, styles_setting } from '../styles';
import { GlobalVar, setHeight, setWidth } from '../GlobalVariables';
import CenteredText from './CenteredText';
import { RFValue } from 'react-native-responsive-fontsize';
import Postcode from '@actbase/react-daum-postcode';

// 다음 주소정보검색 서비스 이용
const LocationSearchModal = props => {
    return (
        <Modal visible={props.visible} transparent onRequestClose={props.hide}>
            <View style={styles_setting.modal_container}>
                <View style={[styles_setting.modal, {paddingLeft: 0, paddingRight: 0}]}>
                    {/**/}
                    <Postcode
                        style={{ width: setWidth(86), height: setHeight(80)}}
                        jsOptions={{ animation: true }}
                        onSelected={data => alert(JSON.stringify(data))}
                    ></Postcode>
                </View>
            </View>
        </Modal>
    );
}

export default LocationSearchModal;