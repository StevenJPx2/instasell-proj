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
  delay?: number;
  inputPrefix?: JSX.Element | null;
  error?: boolean;
  leftOrRight?: 'left' | 'right';
  animateFn?: () => void;
  inputStyle?: SxProp;
  keyIn: string;
  focusFn: () => void;
  changeTextFn: (arg0: string) => void;
  inputValue: string;
  inputLabel: string;
  errorLabel?: string;
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
            autoFocus={true}
          />
        </View>

        {(error !== undefined && errorLabel !== undefined) && <ErrorPopper {...{errorLabel, error}} />}
      </MotiView>
    </AnimatePresence>
  );
}
