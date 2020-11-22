import reducer from './reducer';

import {
  updateTaskTitle,
  addTask,
  deleteTask,
} from './actions';

describe('reducer', () => {
  context('with exsited action', () => {
    describe('updateTaskTitle', () => {
      it('changes task title', () => {
        const state = reducer({
          taskTitle: '',
        }, updateTaskTitle('New title'));

        expect(state.taskTitle).toBe('New title');
      });
    });

    describe('addTask', () => {
      function reduceAddTask(taskTitle) {
        return reducer({
          newId: 100,
          taskTitle,
          tasks: [],
        }, addTask());
      }

      context('with task title', () => {
        it('appends a new task into tasks', () => {
          const state = reduceAddTask('New task');

          expect(state.tasks).toHaveLength(1);
          expect(state.tasks[0].id).not.toBeUndefined();
          expect(state.tasks[0].title).toBe('New task');
        });

        it('clears tasks', () => {
          const state = reduceAddTask('New task');

          expect(state.taskTitle).toBe('');
        });
      });

      context('without task title', () => {
        it('doen\'t work', () => {
          const state = reduceAddTask('');

          expect(state.tasks).toHaveLength(0);
        });
      });
    });

    describe('deleteTask', () => {
      context('with existed task ID', () => {
        it('removes the task from tasks', () => {
          const state = reducer({
            tasks: [
              { id: 1, title: 'Task' },
            ],
          }, deleteTask(1));

          expect(state.tasks).toHaveLength(0);
        });
      });

      context('without existed task ID', () => {
        it('doesn\'t work', () => {
          const state = reducer({
            tasks: [
              { id: 1, title: 'Task' },
            ],
          }, deleteTask(100));

          expect(state.tasks).toHaveLength(1);
        });
      });
    });
  });

  context('without existed action', () => {
    it('returns previous state', () => {
      const initialState = {
        tasks: [
          { id: 1, title: 'Task' },
        ],
      };

      const state = reducer(initialState, {
        type: 'NotExistedAction',
      });

      expect(state).toBe(initialState);
    });
  });
});
