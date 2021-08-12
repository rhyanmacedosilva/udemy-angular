import { PostsService } from './posts.service';
import { Post } from './post.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postService.error
      .subscribe((errorMessage) => {
        this.error = errorMessage;
      });

    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe((response) => {
        this.loadedPosts = response;
        this.isFetching = false;
      }, (error) => {
        this.error = error.message;
        this.isFetching = false;
      });
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe((response) => {
      this.loadedPosts = response;
      this.isFetching = false;
    });
  }

  onClearPosts() {
    this.postService.deletePost()
      .subscribe(() => {
        this.loadedPosts = [];
      }, (error) => {
        this.error = error.message;
        this.isFetching = false;
      });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
