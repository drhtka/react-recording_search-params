import { Link } from 'react-router-dom';
import React, { useContext } from 'react';

import { PostList } from '../components/PostList';
import { PostsContext } from '../store/PostsContext';
import { PostFilter } from '../components/PostFilter';

export const PostsPage: React.FC = () => {
  const { posts } = useContext(PostsContext);
  const visiblePosts = posts;

  return (
    <div>
      {posts.length > 0 ? <>
        <PostFilter />
        <PostList posts={visiblePosts} />
      </> : (
        <p>There are no posts yet</p>
      )}

      <Link to="new" className="button is-info">
        Create a post
      </Link>
    </div>
  );
};
