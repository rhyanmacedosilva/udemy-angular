import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [
    new User(0, 'Pippo', 'Admin'),
    new User(1, 'Rhyan', 'Default')
  ];

  constructor() { }

  ngOnInit(): void {

  }

  onUserAdded(newUser: User) {
    newUser.id = this.generateUserId();
    this.users.push(newUser);
  }

  generateUserId() {
    return this.users.length;
  }

}
