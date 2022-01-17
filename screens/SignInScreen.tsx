import * as React from 'react';

import {SignInNavigationProps} from '../types';
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
import {firstName, setFirstName} from '../constants/Store';
import {useStore} from '@nanostores/react';
import Icon from 'react-native-ionicons';

const Ionicons = Icon;

const useLazyQuery = (_text: string, _obj1: unknown) => [(_obj: unknown) => {}];

export default function SignInScreen({
  navigation,
}: SignInNavigationProps): JSX.Element {
  const [initialDelay, setInitialDelay] = useState(250);
  const [values, setValues] = useState({
    phoneNumber: {value: '', isValid: true},
    otp: {value: '', isValid: true},
  });
  const [step, setStep] = useState<keyof typeof values>('phoneNumber');
  const firstNameValue = useStore(firstName);

  const sx = useSx();

  const [signInUser] = useLazyQuery(
    `
      query SignIn($phoneNumber: String!) {
        user(phoneNumber: $phoneNumber) {
          firstName
        }
      }
    `,
    {
      onCompleted: ({firstName: grabbedFirstName}: {firstName: string}) => {
        setFirstName(grabbedFirstName);
        console.log(firstNameValue);
        navigation.push('Swipe');
      },
    },
  );

  const signIn = () => {
    signInUser({
      variables: {
        phoneNumber: values.phoneNumber.value,
      },
    });
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
        Sign In
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
                      backgroundColor: 'white',
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
                        borderColor: '#cccccc',
                        width: '60px',
                      }}>
                      <Ionicons name="alert-circle" size={28} color="red" />
                    </View>
                    <P sx={{color: '#555555', px: 4}}>
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
      </AnimatePresence>

      <View
        sx={{
          flexDirection: 'row',
          mt: 3,
          flexWrap: 'wrap',
          width: ['100%', '580px'],
        }}>
        <AnimatePresence>
          {step === 'otp' && (
            <MotiView {...popIn(550)}>
              <ButtonTinted
                sx={{
                  width: [9, 13],
                }}
                onPress={() => {
                  setStep('phoneNumber');
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
              px: 4,
            }}
            onPress={() => {
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
            }}>
            <View
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <P>Continue</P>
              <Ionicons
                name="arrow-forward"
                color="white"
                style={sx({fontSize: [1, 4], ml: 3})}
              />
            </View>
          </ButtonTinted>
        </MotiView>
      </View>
    </Background>
  );
}
