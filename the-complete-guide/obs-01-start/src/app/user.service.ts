import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activatedEmitter: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
