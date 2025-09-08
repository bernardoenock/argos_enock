import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonComponent } from '../../../shared/components/atoms/button/button.component';
import { LoadingSpinnerComponent } from '../../../shared/components/atoms/loading-spinner/loading-spinner.component';
import { AppState } from '../../../core/state/app.state';
import { selectAllPosts, selectPostsLoading, selectPostsError, selectCurrentPage } from '../../../core/state/app.selectors';
import { loadPosts, clearPostsError } from '../../../core/state/posts/posts.actions';
import { Post } from '../../../core/models/api.models';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts$: Observable<Post[]>;
  postsLoading$: Observable<boolean | null>;
  postsError$: Observable<string | null>;
  currentPage$: Observable<number>;

  private destroy$ = new Subject<void>();
  private postsPerPage = 10;

  constructor(private store: Store<AppState>) {
    this.posts$ = this.store.select(selectAllPosts);
    this.postsLoading$ = this.store.select(selectPostsLoading);
    this.postsError$ = this.store.select(selectPostsError);
    this.currentPage$ = this.store.select(selectCurrentPage);
  }

  ngOnInit(): void {
    this.loadPosts(1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPosts(page: number): void {
    this.store.dispatch(loadPosts({ page, limit: this.postsPerPage }));
  }

  loadMorePosts(): void {
    this.currentPage$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(currentPage => {
      this.loadPosts(currentPage + 1);
    });
  }

  clearError(): void {
    this.store.dispatch(clearPostsError());
  }

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }
}
