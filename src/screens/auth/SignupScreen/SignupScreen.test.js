import SignupScreen from './index';
import React from 'react';
import renderer from 'react-test-renderer';
import {test, expect} from '@jest/globals';

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const tree = renderer.create(<SignupScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
