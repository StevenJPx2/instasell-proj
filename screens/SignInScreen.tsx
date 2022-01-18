import * as React from 'react';

import {SignInNavigationProps} from '../types';
import Background from '../components/Background';
import Spacer from '../components/Spacer';
import {AnimatePresence} from 'moti';
import {useState} from 'react';
import {theme} from '../constants/Theme';
import FormButtons from '../components/FormButtons';
import Header from '../components/Header';
import OTPNumberForm from '../components/OTPNumberForm';

export default function SignInScreen({
  navigation,
}: SignInNavigationProps): JSX.Element {
  const [initialDelay, setInitialDelay] = useState(250);
  const steps = ['phoneNumber', 'otp'] as const;
  const [values, setValues] = useState({
    phoneNumber: {value: '', isValid: true},
    otp: {value: '', isValid: true},
  });
  const [leftOrRight, setLeftOrRight] = useState<'left' | 'right'>('right');
  const [step, setStep] = useState<keyof typeof values>('phoneNumber');

  const validate = () => {
    step === 'phoneNumber'
      ? values.phoneNumber.value.length !== 10
        ? setValues({
            ...values,
            phoneNumber: {...values.phoneNumber, isValid: false},
          })
        : setStep('otp')
      : step === 'otp' && values.otp.value !== '0000'
      ? setValues({
          ...values,
          otp: {...values.otp, isValid: false},
        })
      : signIn();
  };

  const signIn = () => {};

  return (
    <Background sx={{alignItems: 'flex-start'}}>
      <Header text="Sign In" {...{navigation}} />

      <Spacer />

      <AnimatePresence exitBeforeEnter>
        <OTPNumberForm
          {...{
            step,
            theme,
            initialDelay,
            setInitialDelay,
            values,
            setValues,
            leftOrRight,
          }}
        />
      </AnimatePresence>

      <FormButtons
        steps={steps as unknown as string[]}
        setStep={setStep as React.Dispatch<React.SetStateAction<string>>}
        {...{step, setLeftOrRight, validate}}
      />
    </Background>
  );
}
