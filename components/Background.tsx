import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Container from './Container';

export default function Background(
  props: React.ComponentProps<typeof Container>,
): JSX.Element {
  return (
    <LinearGradient colors={['#FF512F', '#DD2476']} style={{flex: 1}}>
      <Container {...props} />
    </LinearGradient>
  );
}
