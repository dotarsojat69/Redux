import { Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../api/axios'

const Todo = () => {

    const { id } = useParams();
    const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Todo;