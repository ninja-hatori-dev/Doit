import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: JSON.parse(localStorage.getItem('todos') || '[]'),
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    updateTodoPriority: (state, action: PayloadAction<{ id: string; priority: Todo['priority'] }>) => {
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.priority = action.payload.priority;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodoPriority } = todosSlice.actions;
export default todosSlice.reducer;