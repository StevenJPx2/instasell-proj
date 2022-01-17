import * as React from 'react';

import {SignUpNavigationProps} from '../types';
import Background from '../components/Background';
import Spacer from '../components/Spacer';
import {
  MotiView,
  H1,
  H3,
  slideInFromBottom,
  slideInFromLeft,
  popIn,
  slideInFromRight,
} from '../constants/Motified';
import {AnimatePresence} from 'moti';
import {P, View, useSx} from 'dripsy';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {theme, TextInput, ButtonTinted} from '../constants/Theme';
import Icon from 'react-native-ionicons';

const Ionicons = Icon;

const useMutation = (_text: string) => [(_obj: unknown) => {}];

export default function SignUpScreen({
  navigation,
}: SignUpNavigationProps): JSX.Element {
  const [initialDelay, setInitialDelay] = useState(250);
  const [values, setValues] = useState({
    phoneNumber: {value: '', isValid: true},
    otp: {value: '', isValid: true},
    firstName: {value: '', isValid: true},
  });
  const [step, setStep] = useState<keyof typeof values>('phoneNumber');

  const sx = useSx();

  const [createNewUser] = useMutation(`
    mutation CreateUserMutation($phoneNumber: String!, $firstName: String!) {
      createUser(phoneNumber: $phoneNumber, firstName: $firstName) {
        firstName
        phoneNumber
      }
    }
  `);

  const createUser = () => {
    try {
      createNewUser({
        variables: {
          phoneNumber: values.phoneNumber.value,
          firstName: values.firstName.value,
        },
      });
      navigation.push('Swipe');
    } catch {
      setValues({
        ...values,
        firstName: {...values.firstName, isValid: false},
      });
    }
  };

  return (
    <Background sx={{alignItems: 'flex-start'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons
          name="chevron-back-circle"
          color="white"
          style={sx({fontSize: [4, 7]})}
        />
      </TouchableOpacity>
      <H1
        {...slideInFromBottom(100)}
        sx={{fontWeight: 'bold', fontSize: [4, 6]}}>
        Sign Up
      </H1>

      <Spacer />

      <AnimatePresence exitBeforeEnter>
        {step === 'phoneNumber' && (
          <AnimatePresence exitBeforeEnter>
            <MotiView
              {...slideInFromLeft(initialDelay)}
              onDidAnimate={() => setInitialDelay(0)}
              key="phone">
              <H3>Enter your number:</H3>
              <View sx={{flexDirection: 'row'}}>
                <P
                  sx={{
                    ...theme.styles.textInput,
                    borderRightWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    width: 11,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'rgba(255, 255, 255, 0.5)',
                    mt: 0,
                  }}>
                  +91
                </P>
                <TextInput
                  sx={{
                    flexGrow: 1,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  keyboardType="phone-pad"
                  value={values.phoneNumber.value}
                  onFocus={() =>
                    setValues({
                      ...values,
                      phoneNumber: {...values.phoneNumber, isValid: true},
                    })
                  }
                  onChangeText={value =>
                    setValues({
                      ...values,
                      phoneNumber: {...values.phoneNumber, value},
                    })
                  }
                  autoComplete="tel"
                  autoFocus={true}
                />
              </View>

              <AnimatePresence>
                {!values.phoneNumber.isValid && (
                  <MotiView
                    {...popIn()}
                    exit={{opacity: 0, scale: 0.9}}
                    sx={{
                      bg: 'white',
                      borderRadius: 1,
                      my: 4,
                      width: ['100%', 17],
                      flexDirection: 'row',
                    }}>
                    <View
                      sx={{
                        py: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRightWidth: 1,
                        borderColor: '#ccc',
                        width: '60px',
                      }}>
                      <Ionicons name="alert-circle" size={28} color="red" />
                    </View>
                    <P sx={{color: '#555', px: 4}}>
                      The phone you have given is not valid.
                    </P>
                  </MotiView>
                )}
              </AnimatePresence>
            </MotiView>
          </AnimatePresence>
        )}

        {step === 'otp' && (
          <AnimatePresence exitBeforeEnter>
            <MotiView {...slideInFromRight()} key="otp">
              <H3>Enter the OTP:</H3>
              <TextInput
                keyboardType="number-pad"
                value={values.otp.value}
                onFocus={() =>
                  setValues({
                    ...values,
                    otp: {...values.otp, isValid: true},
                  })
                }
                onChangeText={value =>
                  setValues({...values, otp: {...values.otp, value}})
                }
                autoFocus={true}
              />

              <AnimatePresence>
                {!values.otp.isValid && (
                  <MotiView
                    {...popIn()}
                    sx={{
                      bg: 'white',
                      borderRadius: 1,
                      my: 4,
                      width: '100%',
                      flexDirection: 'row',
                    }}>
                    <View
                      sx={{
                        py: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRightWidth: 1,
                        borderColor: '#ccc',
                        width: '60px',
                      }}>
                      <Ionicons name="alert-circle" size={28} color="red" />
                    </View>
                    <P sx={{color: '#555', px: 4}}>
                      The OTP you have given is not valid.
                    </P>
                  </MotiView>
                )}
              </AnimatePresence>
            </MotiView>
          </AnimatePresence>
        )}

        {step === 'firstName' && (
          <AnimatePresence exitBeforeEnter>
            <MotiView {...slideInFromRight()} key="firstName">
              <H3>Enter your first name:</H3>
              <TextInput
                keyboardType="number-pad"
                value={values.firstName.value}
                onFocus={() =>
                  setValues({
                    ...values,
                    firstName: {...values.firstName, isValid: true},
                  })
                }
                onChangeText={value =>
                  setValues({
                    ...values,
                    firstName: {...values.firstName, value},
                  })
                }
                autoFocus={true}
              />
            </MotiView>
          </AnimatePresence>
        )}
      </AnimatePresence>

      <View
        sx={{
          flexDirection: 'row',
          mt: 3,
          flexWrap: 'wrap',
          width: ['100%', '580px'],
        }}>
        <AnimatePresence>
          {(step === 'otp' || step === 'firstName') && (
            <MotiView {...popIn(550)}>
              <ButtonTinted
                sx={{
                  width: [9, 13],
                }}
                onPress={() => {
                  step === 'firstName'
                    ? setStep('otp')
                    : setStep('phoneNumber');
                }}>
                <Ionicons
                  name="arrow-back"
                  style={sx({fontSize: [2, 3]})}
                  color="white"
                />
              </ButtonTinted>
            </MotiView>
          )}
        </AnimatePresence>

        <MotiView {...popIn(350)} sx={{ml: 'auto'}}>
          <ButtonTinted
            sx={{
              px: '12px',
            }}
            onPress={() => {
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
            }}>
            <View sx={{flexDirection: 'row', justifyContent: 'center'}}>
              <P>Continue</P>
              <Ionicons
                name="arrow-forward"
                color="white"
                style={sx({fontSize: [2, 3], ml: 3})}
              />
            </View>
          </ButtonTinted>
        </MotiView>
      </View>
    </Background>
  );
}
