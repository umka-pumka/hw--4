import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleImportant, editTask, saveTask, cancelEdit } from './redux/tasksSlice';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState({});
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (input.trim()) {
      dispatch(addTask(input));
      setInput('');
    }
  };

  const handleEditChange = (id, text) => {
    setEditInput({ ...editInput, [id]: text });
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
         
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.isImportant ? 'important' : ''}>
            {task.isEditing ? (
              <div>
                <input
                  type="text"
                  value={editInput[task.id] || task.text}
                  onChange={(e) => handleEditChange(task.id, e.target.value)}
                />
                <button onClick={() => dispatch(saveTask({ id: task.id, text: editInput[task.id] || task.text }))}>save</button>
                <button onClick={() => dispatch(cancelEdit(task.id))}>cancel</button>
              </div>
            ) : (
              <div>
                <span>{task.text}</span>
                <button onClick={() => dispatch(toggleImportant(task.id))}>important</button>
                <button onClick={() => dispatch(editTask(task.id))}>edit</button>
                <button onClick={() => dispatch(deleteTask(task.id))}>delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
