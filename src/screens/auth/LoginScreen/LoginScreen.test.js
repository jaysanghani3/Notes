import AddNoteScreen from './index';
import React from 'react';
import renderer from 'react-test-renderer';
import {test, expect} from '@jest/globals';

test('renders correctly', () => {
  const tree = renderer.create(<AddNoteScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
