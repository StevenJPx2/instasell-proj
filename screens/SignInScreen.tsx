import * as React from 'react';

import {AnimatePresence} from 'moti';
import {useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {user, User} from '../constants/Store';

import {SignInNavigationProps} from '../types';
import Background from '../components/Background';
import Spacer from '../components/Spacer';
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
  const [authConfirm, setAuthConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const confirmPhoneNumber = () => {
    if (values.phoneNumber.value.length !== 10) {
      setValues({
        ...values,
        phoneNumber: {...values.phoneNumber, isValid: false},
      });
    } else {
      firestore()
        .collection('users')
        .doc(values.phoneNumber.value)
        .get()
        .then(({exists}) => {
          if (exists) {
            auth()
              .signInWithPhoneNumber('+91' + values.phoneNumber.value)
              .then(confirm => {
                setAuthConfirm(confirm);
                setStep('otp');
              })
              .catch(err => {
                console.error(err);
              });
          } else {
            setValues({
              ...values,
              phoneNumber: {...values.phoneNumber, isValid: false},
            });
          }
        });
    }
  };

  const confirmOTP = () => {
    authConfirm!
      .confirm(values.otp.value)
      .then(() => signIn())
      .catch(() =>
        setValues({
          ...values,
          otp: {...values.otp, isValid: false},
        }),
      );
  };

  const signIn = () => {
    firestore()
      .collection('users')
      .doc(values.phoneNumber.value)
      .get()
      .then(u => {
        user.set(u.data() as User);
        navigation.push('User');
      });
  };

  const validate = () => {
    step === 'phoneNumber'
      ? confirmPhoneNumber()
      : step === 'otp' && confirmOTP();
  };

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
