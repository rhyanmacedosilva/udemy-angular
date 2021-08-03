import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<any>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<any>();

  newElementName: String = '';
  newElementContent: String = '';
  @ViewChild('serverContentInput') serverContentInput!: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      name: nameInput.value, 
      content: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      name: this.newElementName, 
      content: this.newElementContent
    });
  }

}
