import * as React from 'react';

import {ButtonTinted} from '../constants/Theme';
import {MotiView, popIn} from '../constants/Motified';
import {AnimatePresence} from 'moti';
import {P, View, useSx} from 'dripsy';
import Icon from 'react-native-ionicons';

export default function FormButtons({
  steps,
  step,
  setLeftOrRight,
  setStep,
  validate,
}: {
  steps: string[];
  step: typeof steps[number];
  setLeftOrRight: React.Dispatch<React.SetStateAction<'left' | 'right'>>;
  setStep: React.Dispatch<React.SetStateAction<typeof step>>;
  validate: () => void;
}) {
  const sx = useSx();
  return (
    <View
      sx={{
        flexDirection: 'row',
        mt: 3,
        flexWrap: 'wrap',
        width: ['100%', '580px'],
      }}>
      <AnimatePresence>
        {steps.slice(1, undefined).includes(step) && (
          <MotiView {...popIn(550)}>
            <ButtonTinted
              sx={{
                width: [9, 13],
              }}
              onPress={() => {
                setLeftOrRight('left');
                setStep(steps[steps.indexOf(step) - 1]);
              }}>
              <Icon
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
            setLeftOrRight('right');
            validate();
          }}>
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <P sx={{alignSelf: 'center'}}>Continue</P>
            <Icon
              name="arrow-round-forward"
              color="white"
              style={sx({fontSize: [1, 3], ml: 3})}
            />
          </View>
        </ButtonTinted>
      </MotiView>
    </View>
  );
}
