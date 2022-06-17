import { createStore } from 'redux';
import {
  ActionTypes,
  ADD_TODO,
  REMOVE_TODO,
  SET_NEW_TODO,
  SET_TODOS,
  TOGGLE_TODO,
  UPDATE_TODO,
} from './actions';
import { Store, Todo } from './types';

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id)) + 1),
    text,
    done: false,
  },
];

const todoReducer = (
  state: Store = {
    todos: [],
    newTodo: '',
  },
  action: ActionTypes
) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todo: action.payload,
      };
    case SET_NEW_TODO:
      return {
        ...state,
        newTodo: action.payload,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: updateTodo(state.todos, action.payload.id, action.payload.text),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: toggleTodo(state.todos, action.payload),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: removeTodo(state.todos, action.payload),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: addTodo(state.todos, state.newTodo),
      };
    default:
      return state;
  }
};

/**
 * Creates a store using react-redux library.
 * IMPORTANT:
 * createStore has been deprecated, to remove deprecation visual indicator, use legacy_createStore
 * or use the configureStore which is part of the redux-toolkit. redux-toolkit is now the recommended
 * library for managing state with Redux.
 * https://redux-toolkit.js.org/
 */
const store = createStore(todoReducer);

export default store;
