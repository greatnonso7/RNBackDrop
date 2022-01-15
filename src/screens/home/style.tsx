import { StyleSheet } from 'react-native';
import { Fonts } from '../../assets/fonts';
import { hp, wp } from '../../shared/responsive-dimension';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerText: {
        fontSize: hp(20),
        paddingHorizontal: wp(25),
        // fontFamily: Fonts.SFProDisplayBlack,
    }
});
