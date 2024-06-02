import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import {test, expect} from '@jest/globals';

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
