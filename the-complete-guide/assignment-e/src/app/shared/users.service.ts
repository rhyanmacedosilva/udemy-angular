import { ApplicationControllerService } from './application-controller.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  activeUsers: { name: string, id: number }[] = [
    { name: 'Admin', id: 0 },
    { name: 'Pippo', id: 1 }
  ];

  inactiveUsers: { name: string, id: number }[] = [
    { name: 'Wanda', id: 2 },
    { name: 'Peter', id: 3 }
  ];

  constructor(private applicationControllerService: ApplicationControllerService) { }

  disable(user: { name: string, id: number }) {
    this.activeUsers.forEach((u, i) => {
      if (user.id == u.id) {
        this.activeUsers.splice(i, 1);
        this.inactiveUsers.push(user);
        this.applicationControllerService.updateAppCounter();
      }
    });
  }

  enable(user: { name: string, id: number }) {
    this.inactiveUsers.forEach((u, i) => {
      if (user.id == u.id) {
        this.inactiveUsers.splice(i, 1);
        this.activeUsers.push(user);
        this.applicationControllerService.updateAppCounter();
      }
    });
  }
}
