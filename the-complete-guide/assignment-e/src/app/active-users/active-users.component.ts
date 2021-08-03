import { UsersService } from './../shared/users.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {

  @Input() user: { name: string, id: number };

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

  }

  onDisableUser(user: { name: string, id: number }) {
    this.usersService.disable(user);
  }

}
