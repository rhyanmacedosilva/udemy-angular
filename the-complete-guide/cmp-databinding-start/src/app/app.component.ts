import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  serverElements: any = [{
    type: 'server', name: 'Test Server', content: 'Minecraft'
  }];

  onServerAdded(serverData: any) {
    this.serverElements.push({
      type: 'server',
      name: serverData.name,
      content: serverData.content
    });
  }

  onBlueprintAdded(blueprintData: any) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.name,
      content: blueprintData.content
    });
  }

}
