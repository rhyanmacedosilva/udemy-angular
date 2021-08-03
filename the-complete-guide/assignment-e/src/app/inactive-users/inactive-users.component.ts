import { UsersService } from './../shared/users.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {

  @Input() user: { name: string, id: number };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

  }

  onEnableUser(user: { name: string, id: number }) {
    this.usersService.enable(user);
  }

}
