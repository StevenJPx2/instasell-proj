import * as React from 'react';

import {UserNavigationProps} from '../types';
import {user} from '../constants/Store';
import Background from '../components/Background';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import firestore from '@react-native-firebase/firestore';
import {H3, MotiView, popIn, ButtonTinted} from '../constants/Motified';
import {P} from 'dripsy';
import Spacer from '../components/Spacer';
import {useState} from 'react';
import {theme} from '../constants/Theme';

export default function UserScreen({
  navigation,
}: UserNavigationProps): JSX.Element {
  const userInfo = user.get()!;
  const [adminNumber, setAdminNumber] = useState<string>();
  const [madeAdmin, setMadeAdmin] = useState(false);
  const [error, setError] = useState(false);

  const makeAdmin = () => {
    firestore()
      .collection('users')
      .doc(adminNumber!)
      .set(userInfo)
      .then(() => setMadeAdmin(true));
  };

  return (
    <Background sx={{alignItems: 'flex-start'}}>
      <Header text="Welcome!" {...{navigation}} />
      <Spacer />
      <H3 {...popIn()}>Your details:</H3>
      <MotiView {...popIn(150)}>
        <P sx={{mb: 0}}>First Name: {userInfo.firstName}</P>
        <P sx={{mb: 0}}>Phone Number: {userInfo.phoneNumber}</P>
        <P>Address: {userInfo.address}</P>
      </MotiView>
      <Spacer />
      <FormInput
        delay={200}
        autoFocus={false}
        keyIn="adminNumber"
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
        inputStyle={{
          width: ['77%', 17],
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        inputValue={adminNumber}
        inputLabel="Enter the person you want to make admin:"
        changeTextFn={val => setAdminNumber(val)}
        error={error}
        errorLabel="The phone you have given is not valid."
      />
      <ButtonTinted
        {...popIn(250)}
        sx={{mt: 4, ml: 'auto'}}
        onPress={() => {
          if (adminNumber?.length !== 10) {
            setError(true);
          } else {
            makeAdmin();
          }
        }}
        disabled={madeAdmin}>
        {madeAdmin ? <P>Done!</P> : <P>Make Admin</P>}
      </ButtonTinted>
    </Background>
  );
}
