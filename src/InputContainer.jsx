import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  updateTaskTitle,
  addTask,
} from './todoSlice';

import Input from './Input';

export default function InputContainer() {
  const dispatch = useDispatch();

  const { taskTitle } = useSelector((state) => ({
    taskTitle: state.taskTitle,
  }));

  function handleChangeTitle(event) {
    dispatch(updateTaskTitle({ taskTitle: event.target.value }));
  }

  function handleClickAddTask() {
    dispatch(addTask());
  }

  return (
    <Input
      value={taskTitle}
      onChange={handleChangeTitle}
      onClick={handleClickAddTask}
    />
  );
}
