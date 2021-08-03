import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationControllerService {

  appCounter: number = 0;

  constructor() { }

  updateAppCounter() {
    this.appCounter++;
    console.log('User has made ' + this.appCounter + ' operation(s).');
  }
}
