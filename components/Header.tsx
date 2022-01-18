import * as React from 'react';

import {View} from 'dripsy';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';
import {useSx} from 'dripsy';

import {H1, slideInFromBottom} from '../constants/Motified';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

export default function Header({
  navigation,
  text,
}: {
  navigation: Pick<
    NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>,
    'navigation'
  >[keyof Pick<
    NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>,
    'navigation'
  >];
  text: string;
}) {
  const sx = useSx();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          name="arrow-dropleft-circle"
          color="white"
          style={sx({fontSize: [4, 7]})}
        />
      </TouchableOpacity>
      <H1
        {...slideInFromBottom(100)}
        sx={{fontWeight: 'bold', fontSize: [4, 6]}}>
        {text}
      </H1>
    </View>
  );
}
