import Homescreen from './index';
import React from 'react';
import renderer from 'react-test-renderer';
test('renders correctly', () => {
  const tree = renderer
    .create(<Homescreen navigation={{navigate: jest.fn()}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
