import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import todoReducer from './slice/todoSlice'
import Todo from './components/Todo'
import TodoList from './components/TodoList'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    posts: todoReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/post/:id" element={<Todo />} />
            
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App