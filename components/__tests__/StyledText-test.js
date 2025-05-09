import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { MonoText } from '../StyledText';

it('renders correctly', () => {
  let tree;
  act(() => {
    // renderer.create() を act() 内で呼ぶ
    tree = renderer.create(<MonoText>Snapshot test!</MonoText>);
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
