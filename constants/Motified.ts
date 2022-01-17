import React from 'react';
import {View, styled} from 'dripsy';
import {MotiText, motify} from 'moti';
import {Easing} from 'react-native-reanimated';
import {
  theme,
  TextInput as ThemedTextInput,
  Button as ThemedButton,
  ButtonTinted as ThemedButtonTinted,
} from './Theme';

export const H1 = styled(MotiText)(theme.text.h1);
export const H3 = styled(MotiText)(theme.text.h3);
export const H6 = styled(MotiText)(theme.text.h6);
export const TextInput = motify(ThemedTextInput)();
export const Button = motify(ThemedButton)();
export const ButtonTinted = motify(ThemedButtonTinted)();
export const MotiView = motify(View)();

export const popIn = (delay = 0): React.ComponentProps<typeof H1> => ({
  from: {scale: 0.9, opacity: 0},
  animate: {scale: 1, opacity: 1},
  transition: {
    type: 'timing',
    duration: 500,
    easing: Easing.in(Easing.elastic(1.3)),
    delay,
  },
});

export const slideInFromBottom = (
  delay = 0,
): React.ComponentProps<typeof H1> => ({
  from: {translateY: 4, opacity: 0},
  animate: {translateY: 0, opacity: 1},
  exit: {translateY: 4, opacity: 0},
  transition: {
    type: 'timing',
    duration: 500,
    easing: Easing.in(Easing.elastic(1.3)),
    delay,
  },
});

export const slideInFromTop = (delay = 0): React.ComponentProps<typeof H1> => ({
  from: {translateY: -4, opacity: 0},
  animate: {translateY: 0, opacity: 1},
  exit: {translateY: -4, opacity: 0},
  transition: {
    type: 'timing',
    duration: 500,
    easing: Easing.in(Easing.elastic(1.3)),
    delay,
  },
});

export const slideInFromLeft = (
  delay = 0,
): React.ComponentProps<typeof H1> => ({
  from: {translateX: -10, opacity: 0},
  animate: {translateX: 0, opacity: 1},
  exit: {translateX: -10, opacity: 0},
  transition: {
    type: 'timing',
    duration: 500,
    easing: Easing.in(Easing.elastic(1.3)),
    delay,
  },
});

export const slideInFromRight = (
  delay = 0,
): React.ComponentProps<typeof H1> => ({
  from: {translateX: 10, opacity: 0},
  animate: {translateX: 0, opacity: 1},
  exit: {translateX: 10, opacity: 0},
  transition: {
    type: 'timing',
    duration: 500,
    easing: Easing.in(Easing.elastic(1.3)),
    delay,
  },
});
