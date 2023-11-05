import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
    'DMSans-Bold': require('../../assets/fonts/DMSans-Bold.ttf'),
    'DMSans-BoldItalic': require('../../assets/fonts/DMSans-BoldItalic.ttf'),
    'DMSans-Italic': require('../../assets/fonts/DMSans-Italic.ttf'),
    'DMSans-Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
    'DMSans-MediumItalic': require('../../assets/fonts/DMSans-MediumItalic.ttf'),
    'DMSans-Regular': require('../../assets/fonts/DMSans-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins_BoldItalic': require('../../assets/fonts/Poppins_BoldItalic.ttf'),
    'Poppins-Italic': require('../../assets/fonts/Poppins-Italic.ttf'),
    'Poppins-MediumItalic': require('../../assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf')
    });
};