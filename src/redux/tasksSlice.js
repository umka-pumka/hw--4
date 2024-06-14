import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, isImportant: false, isEditing: false });
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    toggleImportant: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    },
    editTask: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.isEditing = true;
      }
    },
    saveTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
        task.isEditing = false;
      }
    },
    cancelEdit: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.isEditing = false;
      }
    },
  },
});

export const { addTask, deleteTask, toggleImportant, editTask, saveTask, cancelEdit } = tasksSlice.actions;
export default tasksSlice.reducer;
