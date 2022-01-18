import {P, View} from 'dripsy';
import * as React from 'react';
import {ThemeType} from '../constants/Theme';
import FormInput from './FormInput';

export default function OTPNumberForm({
  step,
  theme,
  initialDelay,
  setInitialDelay,
  values,
  setValues,
  leftOrRight,
}: {
  step: string;
  theme: ThemeType;
  initialDelay: number;
  setInitialDelay: React.Dispatch<React.SetStateAction<number>>;
  values: any;
  setValues: React.Dispatch<React.SetStateAction<any>>;
  leftOrRight: 'left' | 'right';
}) {
  return (
    <View>
      {step === 'phoneNumber' && (
        <FormInput
          keyIn={step}
          delay={initialDelay}
          inputPrefix={
            <P
              sx={{
                ...theme.styles.textInput,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                width: 11,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
                mt: 0,
              }}>
              +91
            </P>
          }
          error={!values[step].isValid}
          leftOrRight="left"
          animateFn={() => setInitialDelay(0)}
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
          inputLabel="Enter your number:"
          inputValue={values[step].value}
          inputStyle={{
            width: ['77%', 17],
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          errorLabel="The phone you have given is not valid."
        />
      )}

      {step === 'otp' && (
        <FormInput
          keyIn={step}
          error={!values[step].isValid}
          leftOrRight={leftOrRight}
          focusFn={() =>
            setValues({
              ...values,
              [step]: {...values[step], isValid: true},
            })
          }
          changeTextFn={value =>
            setValues({...values, [step]: {...values[step], value}})
          }
          inputLabel="Enter your OTP:"
          inputValue={values[step].value}
          errorLabel="The OTP you have given is not valid."
        />
      )}
    </View>
  );
}
