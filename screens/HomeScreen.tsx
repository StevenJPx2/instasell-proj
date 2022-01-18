import * as React from 'react';

import {View, P} from 'dripsy';
import {
  H1,
  MotiView,
  popIn,
  slideInFromBottom,
  Button,
  ButtonTinted,
} from '../constants/Motified';
import Background from '../components/Background';
import Spacer from '../components/Spacer';
import {RootNavigationProps} from '../types';

export default function HomeScreen({
  navigation,
}: RootNavigationProps): JSX.Element {
  return (
    <Background>
      <H1 {...popIn()} sx={{textAlign: 'center'}}>
        {' '}
        Welcome to
      </H1>
      <H1 {...popIn(150)} sx={{fontWeight: '800', textAlign: 'center'}}>
        Instasell Test!
      </H1>
      <Spacer />
      <View sx={{flexDirection: [null, 'row']}}>
        <MotiView {...slideInFromBottom(250)}>
          <Button
            onPress={() => {
              navigation.push('SignUp');
            }}>
            <P sx={{color: 'black', my: 0}}>Sign Up</P>
          </Button>
        </MotiView>

        <MotiView {...slideInFromBottom(350)}>
          <ButtonTinted
            sx={{mt: [3, 0], ml: [0, 4]}}
            onPress={() => {
              navigation.push('SignIn');
            }}>
            <P sx={{my: 0}}>Sign In</P>
          </ButtonTinted>
        </MotiView>
      </View>
    </Background>
  );
}
