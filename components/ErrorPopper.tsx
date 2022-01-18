import * as React from 'react';

import {MotiView, popIn} from '../constants/Motified';
import {AnimatePresence} from 'moti';
import Icon from 'react-native-ionicons';
import {P, View} from 'dripsy';

export default function ErrorPopper({
  errorLabel,
  error = false,
}: {
  errorLabel: string;
  error?: boolean;
}) {
  return (
    <AnimatePresence>
      {error && (
        <MotiView
          {...popIn()}
          exit={{opacity: 0, scale: 0.9}}
          sx={{
            bg: 'white',
            borderRadius: 1,
            my: 4,
            width: ['80%', 17],
            flexDirection: 'row',
          }}>
          <View
            sx={{
              py: 4,
              alignItems: 'center',
              justifyContent: 'center',
              borderRightWidth: 1,
              borderColor: '#ccc',
              width: 11,
            }}>
            <Icon name="alert" size={28} color="red" />
          </View>
          <P sx={{color: '#555', px: 4}}>{errorLabel}</P>
        </MotiView>
      )}
    </AnimatePresence>
  );
}
