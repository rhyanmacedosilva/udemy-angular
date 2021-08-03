import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count: number) => {
    //   console.log(count);
    // });

    const custonIntervalObservable = new Observable((observer) => {
      let count: number = 0
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Counter is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription =
      custonIntervalObservable.pipe(
        filter((data: number) => {
          return data > 0;
        }), map((data: number) => {
          return 'Round ' + (data);
        })).subscribe((data: string) => {
          console.log(data);
        }, (error: Error) => {
          alert(error.message);
        }, () => {
          console.log('Completed!');
        });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
