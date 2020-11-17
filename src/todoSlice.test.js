import reducer, {
  updateTaskTitle,
  addTask,
  deleteTask,
} from './todoSlice';

describe('reducer', () => {
  describe('updateTaskTitle', () => {
    it('changes task title', () => {
      const state = reducer({
        taskTitle: '',
      }, updateTaskTitle({ taskTitle: 'New Title' }));

      expect(state.taskTitle).toBe('New Title');
    });
  });

  describe('addTask', () => {
    function reducerAddTask(taskTitle) {
      return reducer({
        newId: 0,
        taskTitle,
        tasks: [],
      }, addTask());
    }

    it('appends a new task into tasks', () => {
      const state = reducerAddTask('New title');

      expect(state.tasks).toHaveLength(1);
      expect(state.tasks[0].title).toBe('New title');
    });

    it('clears task title', () => {
      const state = reducerAddTask('New title');

      expect(state.taskTitle).toBe('');
    });

    context('without task title', () => {
      it('doesn\'t work', () => {
        const state = reducerAddTask('');

        expect(state.tasks).toHaveLength(0);
      });
    });
  });

  describe('deleteTask', () => {
    context('with existed task ID', () => {
      it('remove the task from tasks', () => {
        const state = reducer({
          tasks: [
            { id: 1, title: 'Task' },
          ],
        }, deleteTask({ id: 1 }));

        expect(state.tasks).toHaveLength(0);
      });
    });

    context('without existed task ID', () => {
      it('remove the task from tasks', () => {
        const state = reducer({
          tasks: [
            { id: 1, title: 'Task' },
          ],
        }, deleteTask(2));

        expect(state.tasks).toHaveLength(1);
      });
    });
  });
});
