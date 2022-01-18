import * as React from 'react';

import {AnimatePresence} from 'moti';
import {useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {user} from '../constants/Store';
import {SignUpNavigationProps} from '../types';
import Background from '../components/Background';
import Spacer from '../components/Spacer';
import {theme} from '../constants/Theme';
import FormInput from '../components/FormInput';
import FormButtons from '../components/FormButtons';
import Header from '../components/Header';
import OTPNumberForm from '../components/OTPNumberForm';

export default function SignUpScreen({
  navigation,
}: SignUpNavigationProps): JSX.Element {
  const [initialDelay, setInitialDelay] = useState(250);
  const steps = ['phoneNumber', 'otp', 'firstName', 'address'] as const;
  const [values, setValues] = useState<{
    [K in typeof steps[number]]: {value: string; isValid: boolean};
  }>({
    phoneNumber: {value: '', isValid: true},
    otp: {value: '', isValid: true},
    firstName: {value: '', isValid: true},
    address: {value: '', isValid: true},
  });
  const [leftOrRight, setLeftOrRight] = useState<'left' | 'right'>('right');
  const [step, setStep] = useState<typeof steps[number]>('phoneNumber');

  const [authConfirm, setAuthConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const confirmPhoneNumber = () => {
    if (values.phoneNumber.value.length !== 10) {
      setValues({
        ...values,
        phoneNumber: {...values.phoneNumber, isValid: false},
      });
    } else {
      auth()
        .signInWithPhoneNumber('+91' + values.phoneNumber.value)
        .then(confirm => {
          setAuthConfirm(confirm);
          setStep('otp');
        });
    }
  };

  const confirmOTP = () => {
    authConfirm!
      .confirm(values.otp.value)
      .then(() => setStep('firstName'))
      .catch(() =>
        setValues({
          ...values,
          otp: {...values.otp, isValid: false},
        }),
      );
  };

  const createUser = () => {
    user.set({
      firstName: values.firstName.value,
      phoneNumber: values.phoneNumber.value,
      address: values.address.value,
    });
    firestore()
      .collection('users')
      .doc(values.phoneNumber.value)
      .set(user.get()!)
      .then(() => {
        navigation.push('User');
      })
      .catch(err => console.error(err));
  };

  const validate = () => {
    step === 'phoneNumber'
      ? confirmPhoneNumber()
      : step === 'otp'
      ? confirmOTP()
      : step === 'firstName'
      ? setStep('address')
      : step === 'address' && createUser();
  };

  return (
    <Background sx={{alignItems: 'flex-start'}}>
      <Header text="Sign Up" {...{navigation}} />

      <Spacer />

      <AnimatePresence exitBeforeEnter>
        {steps.slice(undefined, 2).includes(step) && (
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
        )}

        {step === 'firstName' && (
          <FormInput
            keyIn={step}
            leftOrRight={leftOrRight}
            focusFn={() =>
              setValues({
                ...values,
                [step]: {...values[step], isValid: true},
              })
            }
            changeTextFn={value =>
              setValues({
                ...values,
                [step]: {...values[step], value},
              })
            }
            inputLabel="Enter your first name:"
            inputValue={values[step].value}
          />
        )}

        {step === 'address' && (
          <FormInput
            keyIn={step}
            leftOrRight="right"
            focusFn={() =>
              setValues({
                ...values,
                [step]: {...values[step], isValid: true},
              })
            }
            changeTextFn={value =>
              setValues({
                ...values,
                [step]: {...values[step], value},
              })
            }
            inputLabel="Enter your address:"
            inputValue={values[step].value}
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
