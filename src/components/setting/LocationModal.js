import React, { useState } from 'react';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import { BlankArea, styles_common, styles_setting } from '../styles';
import { GlobalVar, setHeight, setWidth } from '../GlobalVariables';
import CenteredText from './CenteredText';
import LabelInput from './LabelInput';
import LocationSearchModal from './LocationSearchModal';

// 나의 자주가는 위치 -> 추가를 누르면 뜨는 Modal 컴포넌트
// ***props 정보
// isVisible : Modal을 보일지 말지 여부
// onCancel : 닫기 버튼을 눌렀을 때 호출되는 메소드
// onConfirm : 저장 버튼을 눌렀을 때 호출되는 메소드
// labels, addressTypes, addresses
const LocationModal = props => {
    const list = props.labels.map((label, index) => (
        <LocationInfo
            key={index}
            label={label}
            addressType={props.addressTypes[index]}
            address={props.addresses[index]}
            handleSubmit={handleSubmit}
        />
    ));

    const [isSearchModalVisible, setSearchModalVisible] = useState(false);

    const showLocationSearchModal = () => {
        setSearchModalVisible(true);
    };
    const hideLocationSearchModal = () => {
        setSearchModalVisible(false);
    };

    let savedLocation = '';

    const handleSubmit = message => {
        savedLocation = message;
        console.warn(savedLocation);
    };

    return (
        <Modal
            visible={props.isVisible}
            transparent
            onRequestClose={props.onCancel}
        >
            <View style={styles_setting.modal_container}>
                <View style={styles_setting.modal}>
                    {/* 나만의 장소 저장 Title*/}
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <CenteredText
                            width={80}
                            height={13}
                            fontSize={14}
                            alignItems="center"
                            color="#3e3e3e"
                        >
                            나만의 장소 저장
                        </CenteredText>
                        {/*X모양 버튼*/}
                        <Pressable
                            style={{ marginLeft: -setWidth(3) }}
                            onPress={props.onCancel}
                        >
                            <Image
                                source={require('../../../assets/images/icon/Cancel.png')}
                                style={{
                                    width: setWidth(3),
                                    height: setHeight(3),
                                }}
                            ></Image>
                        </Pressable>
                    </View>

                    {/*지번, 도로명, 건물명으로 검색 -> Pressable로 터치 시 카카오 위치 검색 띄움*/}
                    <View style={styles_setting.location_input}>
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                marginLeft: setWidth(2),
                                marginRight: setWidth(1),
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                showLocationSearchModal();
                            }}
                        >
                            <Image
                                source={require('../../../assets/images/icon/Search.png')}
                                resizeMode="contain"
                                style={{
                                    width: setWidth(4.5),
                                    height: setHeight(4.5),
                                    marginRight: setWidth(1),
                                }}
                            ></Image>
                            <CenteredText
                                width={65}
                                height={8}
                                fontSize={12}
                                color="#aaaaaa"
                            >
                                지번, 도로명, 건물명으로 검색
                            </CenteredText>
                        </Pressable>

                        <LocationSearchModal
                            visible={isSearchModalVisible}
                            hide={hideLocationSearchModal}
                        />

                        {/*내 현재 위치를 가져오는 Pressable*/}
                        <Pressable
                            style={{
                                marginRight: setWidth(2),
                            }}
                            onPress={() => {
                                console.warn('버튼 눌림!');
                            }}
                        >
                            <Image
                                source={require('../../../assets/images/icon/MyLocation.png')}
                                resizeMode="contain"
                                style={{
                                    width: setWidth(5.5),
                                    height: setHeight(5.5),
                                }}
                            ></Image>
                        </Pressable>
                    </View>

                    <BlankArea height={2} />
                    {/*회색 선*/}
                    <View
                        style={{
                            marginLeft: -setWidth(3), // Modal에 전체적으로 준 paddingLeft: setWidth(3)을 무시하기 위함
                            width: setWidth(86),
                            height: setHeight(1),
                            backgroundColor: '#f0f0f0',
                        }}
                    ></View>

                    {/*사용자가 저장해둔 장소 정보 -> 저장해둔 장소의 개수만큼 렌더링 하도록 수정 필요*/}
                    {/*SwitchContainer의 list변수 부분 참고해서 수정*/}
                    <ScrollView>{list}</ScrollView>
                    <Pressable
                        style={{
                            height: setHeight(10),
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            // 저장을 누르면 실행될 메소드 작성 필요
                            props.onConfirm('');
                        }}
                    >
                        <CenteredText
                            width={80}
                            height={4}
                            fontSize={10}
                            textAlign="center"
                            color="#38b7ff"
                        >
                            저장
                        </CenteredText>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

// 나만의 장소 저장 Modal에서 아래에 보이는 저장된 장소 목록
// addressType : 지번? 도로명?
// address : 주소 정보
const LocationInfo = props => {

    return (
        <View
            style={{
                height: setHeight(18),
                marginLeft: setWidth(3),
                marginRight: setWidth(3),
                //backgroundColor: '#33333311',
            }}
        >
            <BlankArea height={3} />
            <View
                style={{
                    height: setHeight(7),
                    justifyContent: 'center',
                    borderRadius: 4,
                    backgroundColor: '#33333311',
                }}
            >
                <LabelInput
                    onSubmit={() => {
                        props.handleSubmit(props.label);
                    }}
                    style={{
                        marginLeft: setWidth(2)
                    }}
                    fontSize={12}
                    color="#6f6f6f"
                    value={props.label}
                ></LabelInput>
            </View>

            <BlankArea height={2} />
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        borderRadius: 4,
                        marginRight: setWidth(2),
                        backgroundColor: '#f0f0f0',
                    }}
                >
                    <CenteredText
                        width={7}
                        height={4}
                        fontSize={8}
                        textAlign="center"
                    >
                        {props.addressType}
                    </CenteredText>
                </View>
                <CenteredText width={49} height={4} fontSize={10}>
                    {props.address}
                </CenteredText>
            </View>
            <BlankArea height={2} />
            <View
                style={{
                    height: setHeight(0.5),
                    marginLeft: -setWidth(3), // 최상위 View에 준 marginLeft, Right값을 무시하기 위함
                    marginRight: -setWidth(3),
                    backgroundColor: '#f0f0f0',
                }}
            />
        </View>
    );
};

export default LocationModal;
