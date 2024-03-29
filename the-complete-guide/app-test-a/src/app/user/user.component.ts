import { Component, Input, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User = {} as User;

  constructor() { }

  ngOnInit(): void {

  }

  getUserInfo() {
    return this.user.id + ' / ' + this.user.name + ' / ' + this.user.level;
  }

}
