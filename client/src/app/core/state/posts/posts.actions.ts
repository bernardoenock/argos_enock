import { createAction, props } from '@ngrx/store';
import { Post, Comment } from '../../models/api.models';

export const loadPosts = createAction(
  '[Posts] Load Posts',
  props<{ page: number; limit: number }>()
);
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[]; page: number }>()
);
export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>()
);
export const selectPost = createAction(
  '[Posts] Select Post',
  props<{ postId: number }>()
);
export const loadPostComments = createAction(
  '[Posts] Load Post Comments',
  props<{ postId: number }>()
);
export const loadPostCommentsSuccess = createAction(
  '[Posts] Load Post Comments Success',
  props<{ comments: Comment[] }>()
);
export const loadPostCommentsFailure = createAction(
  '[Posts] Load Post Comments Failure',
  props<{ error: string }>()
);
export const addComment = createAction(
  '[Posts] Add Comment',
  props<{ postId: number; comment: Partial<Comment> }>()
);
export const addCommentSuccess = createAction(
  '[Posts] Add Comment Success',
  props<{ comment: Comment }>()
);
export const addCommentFailure = createAction(
  '[Posts] Add Comment Failure',
  props<{ error: string }>()
);

export const clearPostsError = createAction('[Posts] Clear Error');
