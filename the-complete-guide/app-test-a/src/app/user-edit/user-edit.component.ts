import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../user/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  userName: string = '';
  userLevel: string = 'Default';

  @Output() userAdded = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onAddUser() {
    this.userAdded.emit(new User(0, this.userName, this.userLevel));
    this.resetUserForm();
  }

  userIsValid() {
    return this.userName != '';
  }
  
  resetUserForm() {
    this.userName = '';
    this.userLevel = 'Default';
  }

}
