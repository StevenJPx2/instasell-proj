import * as React from 'react';

import {SignUpNavigationProps} from '../types';
import Background from '../components/Background';
import Spacer from '../components/Spacer';
import {AnimatePresence} from 'moti';
import {useState} from 'react';
import {theme} from '../constants/Theme';
import FormInput from '../components/FormInput';
import FormButtons from '../components/FormButtons';
import Header from '../components/Header';
import OTPNumberForm from '../components/OTPNumberForm';

export default function SignUpScreen({
  navigation,
}: SignUpNavigationProps): JSX.Element {
  const [initialDelay, setInitialDelay] = useState(250);
  const steps = ['phoneNumber', 'otp', 'firstName'] as const;
  const [values, setValues] = useState<{
    [K in typeof steps[number]]: {value: string; isValid: boolean};
  }>({
    phoneNumber: {value: '', isValid: true},
    otp: {value: '', isValid: true},
    firstName: {value: '', isValid: true},
  });
  const [leftOrRight, setLeftOrRight] = useState<'left' | 'right'>('right');
  const [step, setStep] = useState<typeof steps[number]>('phoneNumber');

  const validate = () => {
    step === 'phoneNumber'
      ? values.phoneNumber.value.length !== 10
        ? setValues({
            ...values,
            phoneNumber: {...values.phoneNumber, isValid: false},
          })
        : setStep('otp')
      : step === 'otp'
      ? values.otp.value !== '0000'
        ? setValues({
            ...values,
            otp: {...values.otp, isValid: false},
          })
        : setStep('firstName')
      : step === 'firstName' && createUser();
  };

  const createUser = () => {};

  return (
    <Background sx={{alignItems: 'flex-start'}}>
      <Header text="Sign Up" {...{navigation}} />

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
        {step === 'firstName' && (
          <FormInput
            keyIn={step}
            leftOrRight="right"
            focusFn={() =>
              setValues({
                ...values,
                firstName: {...values.firstName, isValid: true},
              })
            }
            changeTextFn={value =>
              setValues({
                ...values,
                firstName: {...values.firstName, value},
              })
            }
            inputLabel="Enter your first name:"
            inputValue={values.firstName.value}
          />
        )}
      </AnimatePresence>

      <FormButtons
        steps={steps as unknown as string[]}
        setStep={setStep as React.Dispatch<React.SetStateAction<string>>}
        {...{step, setLeftOrRight, validate}}
      />
    </Background>
  );
}
