import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import * as PostsActions from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      exhaustMap(({ page, limit }) =>
        this.apiService.getPosts(page, limit).pipe(
          map(posts => PostsActions.loadPostsSuccess({ posts, page })),
          catchError(error => of(PostsActions.loadPostsFailure({ error: error.message })))
        )
      )
    )
  );

  loadPostComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPostComments),
      exhaustMap(({ postId }) =>
        this.apiService.getPostComments(postId).pipe(
          map(comments => PostsActions.loadPostCommentsSuccess({ comments })),
          catchError(error => of(PostsActions.loadPostCommentsFailure({ error: error.message })))
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.addComment),
      exhaustMap(({ postId, comment }) =>
        this.apiService.addComment(postId, comment).pipe(
          map(newComment => PostsActions.addCommentSuccess({ comment: newComment })),
          catchError(error => of(PostsActions.addCommentFailure({ error: error.message })))
        )
      )
    )
  );
}
