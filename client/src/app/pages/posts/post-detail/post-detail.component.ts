import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, switchMap } from 'rxjs/operators';
import { ButtonComponent } from '../../../shared/components/atoms/button/button.component';
import { InputComponent } from '../../../shared/components/atoms/input/input.component';
import { LoadingSpinnerComponent } from '../../../shared/components/atoms/loading-spinner/loading-spinner.component';
import { AppState } from '../../../core/state/app.state';
import {
  selectSelectedPost,
  selectPostComments,
  selectPostsLoading,
  selectPostsError
} from '../../../core/state/app.selectors';
import {
  selectPost,
  loadPostComments,
  addComment,
  clearPostsError
} from '../../../core/state/posts/posts.actions';
import { Post, Comment } from '../../../core/models/api.models';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  selectedPost$: Observable<Post | null>;
  comments$: Observable<Comment[]>;
  postsLoading$: Observable<boolean>;
  postsError$: Observable<string | null>;

  commentForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.selectedPost$ = this.store.select(selectSelectedPost);
    this.comments$ = this.store.select(selectPostComments);
    this.postsLoading$ = this.store.select(selectPostsLoading);
    this.postsError$ = this.store.select(selectPostsError);

    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      filter(params => params['id']),
      switchMap(params => {
        const postId = +params['id'];
        this.store.dispatch(selectPost({ postId }));
        this.store.dispatch(loadPostComments({ postId }));
        return [];
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitComment(): void {
    if (this.commentForm.valid) {
      this.selectedPost$.pipe(
        filter(post => !!post),
        takeUntil(this.destroy$)
      ).subscribe(post => {
        if (post) {
          const comment = { ...this.commentForm.value, postId: post.id };
          this.store.dispatch(addComment({ postId: post.id, comment }));
          this.commentForm.reset();
        }
      });
    }
  }

  clearError(): void {
    this.store.dispatch(clearPostsError());
  }

  getFieldError(fieldName: string): string {
    const field = this.commentForm.get(fieldName);

    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength']['requiredLength'];
        return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      body: 'Comment'
    };
    return labels[fieldName] || fieldName;
  }

  trackByCommentId(index: number, comment: Comment): number {
    return comment.id;
  }
}
