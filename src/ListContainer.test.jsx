import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    tasks: [
      { id: 1, title: '아무 것도 안하기 #1' },
      { id: 3, title: '아무 것도 안하기 #3' },
    ],
  }));

  function renderTodoList() {
    return render((
      <ListContainer />
    ));
  }

  it('renders todo list', () => {
    const { container } = renderTodoList();

    expect(container).toHaveTextContent('아무 것도 안하기 #1');
  });

  it('listens click event', () => {
    const { getAllByText } = renderTodoList();

    expect(getAllByText(/완료/)).not.toBeNull();

    fireEvent.click(getAllByText(/완료/)[0]);

    expect(useDispatch).toBeCalled();
  });
});
