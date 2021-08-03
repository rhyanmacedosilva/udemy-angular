import { UsersService } from './shared/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent implements OnInit {
  title: string = 'Panel Control - Users Status';
  activeUsers: { name: string, id: number }[] = [];
  inactiveUsers: { name: string, id: number }[] = [];

  constructor(private usersService: UsersService) {

  }

  ngOnInit() {
    this.activeUsers = this.usersService.activeUsers;
    this.inactiveUsers = this.usersService.inactiveUsers;
  }
}
