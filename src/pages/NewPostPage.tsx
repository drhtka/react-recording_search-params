import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PostForm } from '../components/PostForm';
import { useUsers } from '../store/UsersContext';
import { PostsContext } from '../store/PostsContext';
import { Post } from '../types';

export const NewPostPage = () => {
  const { addPost } = useContext(PostsContext);
  const users = useUsers();
  const navigate = useNavigate();

  const handleSubmit = async ({ title, userId, body }: Omit<Post, 'id'>) => {
    await addPost({ title, userId, body });

    navigate('..');
  }

  return <>
    <h1 className="title">Write a post</h1>

    <PostForm
      users={users}
      fixedUserId={11}
      onSubmit={handleSubmit}
      onReset={() => navigate('..')}
    />
  </>;
}