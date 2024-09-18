import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios'

const Todo = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchPostDetail = async () => {
        if (!id || isNaN(parseInt(id))) {
          setError('Invalid post ID');
          setLoading(false);
          return;
        }
  
        try {
          setLoading(true);
          const response = await api.get(`/posts/${id}`);
          setPost(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching post detail:', error);
          setError('Failed to fetch post details. Please try again.');
          setLoading(false);
        }
      };
  
      fetchPostDetail();
    }, [id]);
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="p-4">
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Back to Posts
          </Button>
        </div>
      );
    }
  
    if (!post) {
      return (
        <div className="p-4">
          <Typography variant="h6" gutterBottom>
            Post not found
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Back to Posts
          </Button>
        </div>
      );
    }
  
    return (
      <div className="p-4">
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {post.body}
            </Typography>
          </CardContent>
        </Card>
        <Button variant="contained" onClick={() => navigate('/')} className="mt-4">
          Back to Posts
        </Button>
      </div>
    );
  };

export default Todo;