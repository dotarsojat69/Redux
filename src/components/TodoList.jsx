import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, createPost, updatePost, deletePost } from '../slice/todoSlice';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  TextField, 
  Typography,
  Pagination
} from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.list);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleCreatePost = () => {
    dispatch(createPost(newPost));
    setNewPost({ title: '', body: '' });
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      dispatch(updatePost({ id: editingPost.id, postData: editingPost }));
      setEditingPost(null);
    }
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  return (
    <div className="p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        TodoApp
      </Typography>
      
      <div className="mb-4">
        <TextField
          label="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Button variant="contained" color="primary" onClick={handleCreatePost}>
          Create Post
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? posts.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              : posts
            ).map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body.substring(0, 100)}...</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => setEditingPost(post)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </Button>
                  <Link to={`/post/${post.id}`}>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(posts.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        className="mt-4 flex justify-center"
      />

      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <TextField
              label="Title"
              value={editingPost.title}
              onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Body"
              value={editingPost.body}
              onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
            <Button variant="contained" color="primary" onClick={handleUpdatePost}>
              Update Post
            </Button>
            <Button variant="outlined" onClick={() => setEditingPost(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;