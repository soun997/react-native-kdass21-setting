import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { setHeight } from '../GlobalVariables';
import { BlankArea, styles_setting } from '../styles';
import TimePicker from './TimePicker';
import { LabeledSwitch } from './Labeled';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// ***props 정보
// labels: 각 LabeledSwitch의 라벨값, LabeledSwitch의 children으로 넘겨줌
// addressTypes : 도로명? 지번?
// addresses : 주소정보
// disturbMode: 방해금지모드 전용 SwitchContainer인지
const SwitchContainer = props => {
    // index를 키값으로 준 이유는 key값이 존재하지 않는다는 경고를 피하기 위함, key를 사용하지는 않음
    // 마지막 컴포넌트를 렌더링할 때에는 BlankArea를 추가해주지 않음
    // list에는 JSX 컴포넌트들이 담김
    const list = props.labels.map((label, index) => (
        <View key={index}>
            <LabeledSwitch>{label}</LabeledSwitch>
            {index != props.labels.length - 1 ? <BlankArea height={4} /> : null}
        </View>
    ));


    let containerHeightValue = 4 + props.labels.length * 9; // 자주가는 위치의 개수는 유동적으로 변하므로 container의 높이 값도 유동적으로 변함
    containerHeightValue < 13 ? containerHeightValue = 4 + 3 * 9 : null;    // 자주가는 위치의 개수가 한 개 일때는 container의 높이 defaul값 적용
    containerHeightValue > 4 + 3 * 9 ? containerHeightValue = 4 + 3 * 9 : null;     // 자주가는 위치의 개수가 3개 이상일 때는 container의 높이 최댓값으로 fix

    const isDisturbMode = props.disturbMode;

    // Date-Picker Modal에 보여지는 초기 시간값 0으로 고정
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);

    const [isStartPicker, setIsStartPicker] = useState(true);   // 시작 시간 설정을 눌렀는지 종료 시간 설정을 눌렀는지
    const [isVisible, setIsVisible] = useState(false);  // Date-Picker의 렌더링 여부

    const [startPicker, setStartPicker] = useState({
        isAM: true, // AM? PM?
        hour: 0,    // 선택한 시
        minute: 0,  // 선택한 분
    });
    const [stopPicker, setStopPicker] = useState({
        isAM: true,
        hour: 0,
        minute: 0,
    });

    // Picker Modal 띄우는 메소드
    const showPicker = () => {
        console.warn('Picker ON');
        setIsVisible(true);
    };

    // Picker Modal 끄는 메소드
    const hidePicker = () => {
        setIsVisible(false);
    };

    // Picker Modal Confirm 누르면 -> Date 객체 반환(date), 객체에 접근하여 시간과 분을 얻어온다.
    const startPickerConfirm = date => {    
        const isAM = date.getHours() < 12 ? true : false;
        const hour = date.getHours();
        const minute = date.getMinutes();
        setStartPicker({ isAM: isAM, hour: hour, minute: minute });
        hidePicker();
    };

    const stopPickerConfirm = date => {
        const isAM = date.getHours() < 12 ? true : false;
        const hour = date.getHours();
        const minute = date.getMinutes();
        setStopPicker({ isAM: isAM, hour: hour, minute: minute });
        hidePicker();
    };

    // props.isDisturbMode의 bool값에 따라 다른 컴포넌트 렌더링
    return isDisturbMode ? (
        // 방해 금지 시간대 설정
        <View style={styles_setting.labeled_switch_container}>
            <View style={styles_setting.labeled_switch_contents}>
                {list}
                <View style={styles_setting.line} />
                <BlankArea height={3} />
                <View style={styles_setting.timepicker_container}>
                    <TimePicker
                        onPress={() => {
                            setIsStartPicker(true);
                            showPicker();
                        }}
                        isAM={startPicker['isAM']}
                        hour={startPicker['hour']}
                        minute={startPicker['minute']}
                        title="시작"
                        marginLeft={2}
                    ></TimePicker>
                    {/*시작 timepicker와 거리 14 + 글씨 살짝 옆으로 2 -> marginLeft 16 줌*/}
                    <TimePicker
                        onPress={() => {
                            setIsStartPicker(false);
                            showPicker();
                        }}
                        isAM={stopPicker['isAM']}
                        hour={stopPicker['hour']}
                        minute={stopPicker['minute']}
                        title="종료"
                        marginLeft={16}
                    ></TimePicker>
                    <DateTimePickerModal
                        isVisible={isVisible}
                        mode="time"
                        display="spinner"
                        date={date}
                        onConfirm={
                            isStartPicker
                                ? startPickerConfirm
                                : stopPickerConfirm
                        }
                        onCancel={hidePicker}
                    />
                </View>
            </View>
        </View>
    ) : (
        // Default Switch Container
        <View
            style={[
                styles_setting.labeled_switch_container,
                { height: setHeight(containerHeightValue) },
            ]}
        >
            <ScrollView
                contentContainerStyle={styles_setting.labeled_switch_contents}
            >
                {list}
                <BlankArea height={7}/>
            </ScrollView>
        </View>
    );
};

export default SwitchContainer;
