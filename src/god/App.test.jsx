import React from 'react';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import App from './App';

jest.mock('react-redux');

test('App', () => {
  useSelector.mockImplementation((selector) => selector({
    taskTitle: '',
    tasks: [
      { id: 1, title: '아무 것도 하지 않기#1' },
    ],
  }));

  const { getByText } = render((
    <App />
  ));

  expect(getByText(/아무 것도 하지 않기#1/)).not.toBeNull();
});
