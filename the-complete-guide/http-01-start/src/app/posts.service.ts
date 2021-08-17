import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
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
      post, { observe: 'response' }).subscribe((responseData) => {
        console.log(responseData);
      }, (error) => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(
        this.urlBase,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams
        })
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
    return this.http.delete(this.urlBase, {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap((event) => {
      console.log(event);
      if (event.type == HttpEventType.Sent) {
        console.log('Something');
      }
      if (event.type == HttpEventType.Response) {
        console.log('body', event.body);
      }
    }));
  }
}
