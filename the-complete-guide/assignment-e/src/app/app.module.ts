import { ApplicationControllerService } from './shared/application-controller.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';

@NgModule({
  declarations: [
    AppComponent,
    InactiveUsersComponent,
    ActiveUsersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ApplicationControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
