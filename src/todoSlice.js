import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newId: 100,
  taskTitle: '',
  tasks: [],
};

const { actions, reducer } = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    updateTaskTitle(state, { payload: { taskTitle } }) {
      return {
        ...state,
        taskTitle,
      };
    },
    addTask(state) {
      const { newId, tasks, taskTitle } = state;

      if (!taskTitle) {
        return state;
      }

      return {
        ...state,
        newId: newId + 1,
        taskTitle: '',
        tasks: [...tasks, {
          id: newId,
          title: taskTitle,
        }],
      };
    },
    deleteTask(state, { payload: { id } }) {
      const { tasks } = state;
      return {
        ...state,
        tasks: tasks.filter((task) => task.id !== id),
      };
    },
  },
});

export const {
  updateTaskTitle,
  addTask,
  deleteTask,
} = actions;

export default reducer;
