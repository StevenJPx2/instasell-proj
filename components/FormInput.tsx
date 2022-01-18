import * as React from 'react';

import {
  MotiView,
  H3,
  slideInFromLeft,
  slideInFromRight,
} from '../constants/Motified';
import {AnimatePresence} from 'moti';
import {View, SxProp} from 'dripsy';
import {TextInput} from '../constants/Theme';
import ErrorPopper from './ErrorPopper';

export default function FormInput({
  delay = 0,
  leftOrRight = 'left',
  autoFocus = false,
  inputPrefix,
  error,
  animateFn,
  inputStyle,
  errorLabel,
  keyIn,
  focusFn,
  changeTextFn,
  inputValue,
  inputLabel,
}: {
  keyIn: string;
  inputLabel: string;
  delay?: number;
  leftOrRight?: 'left' | 'right';
  inputPrefix?: JSX.Element | null;
  error?: boolean;
  errorLabel?: string;
  animateFn?: () => void;
  focusFn?: () => void;
  changeTextFn?: (arg0: string) => void;
  inputStyle?: SxProp;
  inputValue?: string;
  autoFocus?: boolean;
}) {
  return (
    <AnimatePresence exitBeforeEnter>
      <MotiView
        {...(leftOrRight === 'left'
          ? slideInFromLeft(delay)
          : slideInFromRight(delay))}
        onDidAnimate={animateFn}
        key={keyIn}>
        <H3>{inputLabel}</H3>
        <View sx={{flexDirection: 'row'}}>
          {inputPrefix}
          <TextInput
            sx={inputStyle}
            keyboardType="phone-pad"
            value={inputValue}
            onFocus={focusFn}
            onChangeText={changeTextFn}
            autoComplete="tel"
            autoFocus={autoFocus}
          />
        </View>

        {error !== undefined && errorLabel !== undefined && (
          <ErrorPopper {...{errorLabel, error}} />
        )}
      </MotiView>
    </AnimatePresence>
  );
}
