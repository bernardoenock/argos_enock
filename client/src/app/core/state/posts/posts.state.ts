import { Post, Comment } from '../../models/api.models';

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  comments: Comment[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

export const initialPostsState: PostsState = {
  posts: [],
  selectedPost: null,
  comments: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null
};
