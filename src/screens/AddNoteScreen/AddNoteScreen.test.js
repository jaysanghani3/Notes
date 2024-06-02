import React from 'react';
import renderer from 'react-test-renderer';
import {test, expect} from '@jest/globals';
import AddNoteScreen from './index';

test('renders correctly', () => {
  const mockRoute = {
    params: {
      screen: 'test',
      noteTitle: 'test',
      noteDetails: 'test',
      noteId: 'test',
    },
  };

  const tree = renderer
    .create(
      <AddNoteScreen navigation={{navigate: jest.fn()}} route={mockRoute} />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
