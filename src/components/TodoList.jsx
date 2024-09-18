import { Button, Card, CardContent, Grid2, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TodoList = () => {

      const dispatch = useDispatch();
      const posts = useSelector((state) => state.posts.list);
      const status = useSelector((state) => state.posts.status);
      const error = useSelector((state) => state.posts.error);
    
      const [newPost, setNewPost] = useState({ title: '', body: '' });
      const [editingPost, setEditingPost] = useState(null);
    
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
    
      if (status === 'loading') {
        return <div>Loading...</div>;
      }
    
      if (status === 'failed') {
        return <div>Error: {error}</div>;
      }
    
      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Posts</h1>
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
          <Grid2 container spacing={2}>
            {posts.map((post) => (
              <Grid2 item xs={12} sm={6} md={4} key={post.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.body}
                    </Typography>
                    <div className="mt-2">
                      <Button
                        size="small"
                        onClick={() => setEditingPost(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
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