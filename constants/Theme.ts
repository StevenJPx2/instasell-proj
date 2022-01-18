import {styled, Theme, makeTheme} from 'dripsy';
import {TextInput as NativeTextInput, TouchableOpacity} from 'react-native';

const tintColorDark = '#222';

export const theme = makeTheme({
  colors: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    gradientStart: '#FF512F',
    gradientEnd: '#DD2476',
    shadows: ['0 0 20px rgba(255, 255, 255, 0.4)'],
  },
  fonts: {
    root: 'Inter-Regular',
  },
  customFonts: {
    inter: {
      default: 'Inter-Regular',
      normal: 'Inter-Regular',
      400: 'Inter-Regular',
      500: 'Inter-Medium',
      600: 'Inter-SemiBold',
      700: 'Inter-Bold',
      800: 'Inter-ExtraBold',
      900: 'Inter-Black',
    },
  },
  space: [0, 2, 4, 8, 16, 32, 64, 72, 80, 128, 256, 512],
  fontSizes: [16, 20, 24, 32, 36, 40, 48, 52],
  sizes: [
    0, 2, 4, 8, 16, 18, 20, 32, 48, 52, 64, 72, 80, 90, 128, 200, 256, 512,
  ],
  radii: [0, 4, 16, 32, 9999],
  styles: {
    button: {
      color: 'background',
      fontWeight: 'medium',
      fontSize: [0, 2],
      backgroundColor: 'text',
      height: [9, 13],
      width: [15, 16],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      boxShadow: '0 2px 15px rgba(255, 255, 255, 0.2)',
    },
    buttonTinted: {
      color: 'text',
      fontWeight: 'medium',
      fontSize: [0, 2],
      height: [9, 13],
      backgroundColor: 'tint',
      width: [15, 16],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      boxShadow: '0 2px 15px rgba(255, 255, 255, 0.2)',
    },
    textInput: {
      width: ['80%', 17],
      color: 'text',
      fontWeight: 'bold',
      fontSize: [1, 2],
      height: [8, 10],
      borderRadius: 1,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      py: 3,
      px: 4,
    },
  },
  text: {
    h1: {
      color: 'text',
      fontWeight: '500',
      fontSize: [3, null, 6],
      my: 1,
    },
    h3: {
      color: 'text',
      fontWeight: '500',
      fontSize: [1, null, 3],
      mb: 3,
    },
    h6: {
      color: 'text',
      fontWeight: '500',
      fontSize: [0, 2],
      my: ['18px', 5],
    },
    p: {
      color: 'text',
      fontSize: 0,
    },
  },
});

export type ThemeType = typeof theme & Theme;

export const Button = styled(TouchableOpacity)(theme.styles.button);
export const ButtonTinted = styled(TouchableOpacity)(theme.styles.buttonTinted);
export const TextInput = styled(NativeTextInput)(theme.styles.textInput);
