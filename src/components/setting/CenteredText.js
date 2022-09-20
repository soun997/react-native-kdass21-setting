import { Text, View } from 'react-native';
import { styles_common } from '../styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { GlobalVar, setHeight, setWidth } from '../GlobalVariables';

// iOS에서는 textAlignVertical이 동작하지 않음 -> 이를 개선하기 위한 커스텀 컴포넌트 Centered
// 상위의 View 컴포넌트에 justifyContent: 'center'를 주었기 때문에 글자는 가운데로 정렬됨
// ***props 정보
// width: 너비 / height: 높이
// alignItems, justifyContent
// fontSize: 폰트 크기, textAlign: 글씨 위치
// color: 폰트 색
// children으로 받은 문자열을 렌더링
const CenteredText = props => {
    return (
        <View
            style={{
                width: setWidth(props.width),
                height: setHeight(props.height),
                alignItems: props.alignItems,
                justifyContent: "center",
                //backgroundColor: "#33333311"
            }}
        >
            <Text
                style={[
                    styles_common.text,
                    {
                        fontSize: RFValue(
                            props.fontSize * GlobalVar.ValueMultiplied,
                            GlobalVar.FigmaScreenHeight
                        ),
                        textAlign: props.textAlign,
                        color: props.color,
                    },
                ]}
            >
                {props.children}
            </Text>
        </View>
    );
};

CenteredText.defaultProps = {
    width: 'auto',
    height: 'auto',
    alignItems: 'stretch',
    justifyContent: 'center',
    fontSize: 12,
    color: "#aaaaaa"
};

export default CenteredText;
