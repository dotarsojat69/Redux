import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.get('/posts');
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, postData }) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await api.delete(`/posts/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.list.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter((post) => post.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;