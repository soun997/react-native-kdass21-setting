import React, { useState } from 'react';
import { View, Switch, Pressable, Image } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { setHeight, setWidth } from '../GlobalVariables';
import { styles_setting, BlankArea } from '../styles';
import CenteredText from './CenteredText';
import LocationModal from './LocationModal';

// ***props 정보
// haveButton : 나의 자주가는 위치 렌더링(버튼이 같이 있는 Label) -> else 그냥 글씨만 있는 Label
// children으로 받은 문자열을 CenteredText에서 렌더링함
export const Label = props => {
    const [isVisible, setIsVisible] = useState(false);

    const showLocationModal = () => {
        console.warn('Location Modal On');
        setIsVisible(true);
    };

    const hideLocationModal = () => {
        console.warn('Location Modal Off');
        setIsVisible(false);
    };

    function handleConfirm(message) {
        console.warn(message);
        hideLocationModal();
    }

    return props.haveButton ? (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <CenteredText
                    width={81}
                    height={5}
                    fontSize={14}
                    color="#646464"
                >
                    {props.children}
                </CenteredText>

                <MenuButton onAdd={showLocationModal}/>

                <LocationModal
                    isVisible={isVisible}
                    onCancel={hideLocationModal}
                    onConfirm={handleConfirm}
                    labels={props.labels}
                    addressTypes={props.addressTypes}
                    addresses={props.addresses}
                />
            </View>
            <BlankArea height={3} />
        </View>
    ) : (
        <View>
            <CenteredText width={86} height={5} fontSize={14} color="#646464">
                {props.children}
            </CenteredText>
            <BlankArea height={3} />
        </View>
    );
};

// ***props 정보
// children: LabeledSwitch의 라벨값
export const LabeledSwitch = props => {
    return (
        <View style={styles_setting.labeled_switch}>
            <CenteredText width={65} height={5} fontSize={12} color="#737373">
                {props.children}
            </CenteredText>
            <Switch
                style={[
                    Platform.OS === 'ios'
                        ? {
                              transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                          }
                        : { transform: [{ scaleX: 1 }, { scaleY: 1 }] },
                    {},
                ]}
            ></Switch>
        </View>
    );
};

// 나의 자주가는 위치 옆의 ...버튼 누르면 나오는 메뉴 -> 추가 / 수정 / 삭제 구현
// ***props 정보
// onAdd() : 
const MenuButton = props => {
    const [menuVisibility, setMenuVisible] = useState(false);
    const hideMenu = () => setMenuVisible(false);
    const showMenu = () => setMenuVisible(true);

    return (
        <Menu
            visible={menuVisibility}
            anchor={
                <Pressable
                    onPress={showMenu}
                    style={{
                        width: setWidth(5),
                        height: setHeight(5),
                    }}
                >
                    <Image
                        source={require('../../../assets/images/icon/More.png')}
                        style={{
                            width: setWidth(5),
                            height: setHeight(5),
                        }}
                    ></Image>
                </Pressable>
            }
            onRequestClose={hideMenu}
        >
            <MenuItem
                onPress={() => {
                    hideMenu();
                    // iOS의 경우 Menu를 닫는 과정이 Modal을 렌더링하는 것을 방해
                    // Menu를 닫은 뒤 잠깐의 시간지연을 준 후 Modal을 렌더링함
                    // 참고 : https://stackoverflow.com/questions/68478119/react-native-expo-modal-not-showing-when-visible-prop-is-true-on-ios
                    setTimeout(
                        () => props.onAdd(),
                        Platform.OS === 'ios' ? 350 : 0
                    );
                }}
            >
                추가/수정
            </MenuItem>
            <MenuItem
                onPress={() => {
                    {/*나의 자주가는 위치 삭제하는 로직 구현 필요*/}
                    hideMenu();
                }}
            >
                삭제
            </MenuItem>
            
        </Menu>
    );
};
