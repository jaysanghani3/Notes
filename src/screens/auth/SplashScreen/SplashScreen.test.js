import React from 'react';
import renderer from 'react-test-renderer';
import SplashScreen from './index';
import {test, expect} from '@jest/globals';

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const tree = renderer.create(<SplashScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
