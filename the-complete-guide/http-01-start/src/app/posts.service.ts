import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private urlBase: string = 'https://angular-complete-guide-43a49-default-rtdb.firebaseio.com/posts.json';
  error: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(post: Post) {
    // Send Http request
    this.http.post<{ name: string }>(this.urlBase,
      post).subscribe((responseData) => {
        console.log(responseData);
      }, (error) => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(this.urlBase)
      .pipe(map((responseData) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key) == true) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }), catchError((errorRes) => {
        return throwError(errorRes);
      }));
  }

  deletePost() {
    return this.http.delete(this.urlBase);
  }
}
