import { createReducer, on } from '@ngrx/store';
import { PostsState, initialPostsState } from './posts.state';
import * as PostsActions from './posts.actions';

export const postsReducer = createReducer(
  initialPostsState,

  on(PostsActions.loadPosts, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(PostsActions.loadPostsSuccess, (state, { posts, page }) => ({
    ...state,
    posts: page === 1 ? posts : [...state.posts, ...posts],
    currentPage: page,
    isLoading: false,
    error: null
  })),

  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(PostsActions.selectPost, (state, { postId }) => ({
    ...state,
    selectedPost: state.posts.find(post => post.id === postId) || null
  })),

  on(PostsActions.loadPostComments, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(PostsActions.loadPostCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments,
    isLoading: false,
    error: null
  })),

  on(PostsActions.loadPostCommentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(PostsActions.addComment, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(PostsActions.addCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: [...state.comments, comment],
    isLoading: false,
    error: null
  })),

  on(PostsActions.addCommentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(PostsActions.clearPostsError, (state) => ({
    ...state,
    error: null
  }))
);
