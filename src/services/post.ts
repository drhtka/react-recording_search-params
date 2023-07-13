import { Post } from '../types';
import { client } from '../utils/httpClient';

export function getUserPosts(userId: number) {
  let url = '/posts';

  if (userId) {
    url += `?userId=${userId}`;
  }

  return client.get<Post[]>(url);
}

export function getPost(postId: number) {
  return client.get<Post>(`/posts/${postId}`)
}

export function deletePost(postId: number) {
  return client.delete<number>(`/posts/${postId}`)
}

export function createPost({ title, body, userId }: Omit<Post, 'id'>) {
  return client.post<Post>('/posts', { title, body, userId })
}

export function updatePost({ id, title, body, userId }: Post) {
  return client.patch<Post>(`/posts/${id}`, { title, body, userId })
}
