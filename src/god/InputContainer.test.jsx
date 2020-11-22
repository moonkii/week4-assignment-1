import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import InputContainer from './InputContainer';

jest.mock('react-redux');

test('InputContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    taskTitle: '',
  }));

  const { getByText, getByLabelText } = render((
    <InputContainer />
  ));

  fireEvent.change(getByLabelText('할 일'), {
    target: { value: 'New title' },
  });

  expect(dispatch).toBeCalledWith({
    type: 'updateTaskTitle',
    payload: { taskTitle: 'New title' },
  });

  expect(getByText(/추가/)).not.toBeNull();

  fireEvent.click((getByText(/추가/)));

  expect(dispatch).toBeCalledWith({ type: 'addTask' });
});
