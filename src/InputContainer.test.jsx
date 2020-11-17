import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import InputContainer from './InputContainer';

import {
  addTask,
  updateTaskTitle,
} from './todoSlice';

describe('InputContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    taskTitle: 'New title',
  }));

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('listens click event', () => {
    const { getByText, getByDisplayValue } = render((
      <InputContainer />
    ));

    expect(getByText(/추가/)).not.toBeNull();
    expect(getByDisplayValue('New title')).not.toBeNull();

    fireEvent.click(getByText(/추가/));

    expect(dispatch).toBeCalledWith(addTask());
  });

  it('listens change event', () => {
    const { getByLabelText } = render((
      <InputContainer />
    ));

    fireEvent.change(getByLabelText('할 일'), {
      target: { value: 'New title2' },
    });

    expect(dispatch).toBeCalledWith(updateTaskTitle({
      taskTitle: 'New title2',
    }));
  });
});
