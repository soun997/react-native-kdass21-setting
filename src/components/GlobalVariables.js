import { Dimensions, Platform } from 'react-native';
import { styles_common } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

export const GlobalVar = {
    FigmaScreenHeight: 844,
    ScreenHeight: Dimensions.get('screen').height,
    ScreenWidth: Dimensions.get('screen').width,
    FlexHeight: 211,
    FlexWidth: 100,
    ValueMultiplied: 1.1,
};

export function setHeight(ratio) {
    const height = GlobalVar.ScreenHeight / (GlobalVar.FlexHeight / ratio);
    // console.log('GlobalVar.ScreenHeight : ' + GlobalVar.ScreenHeight);
    // console.log("height : " + height)
    return height;
}

export function setWidth(ratio) {
    const width = GlobalVar.ScreenWidth / (GlobalVar.FlexWidth / ratio);
    // console.log('GlobalVar.ScreenWidth : ' + GlobalVar.ScreenWidth);
    // console.log("width : " + width)
    return width;
}

