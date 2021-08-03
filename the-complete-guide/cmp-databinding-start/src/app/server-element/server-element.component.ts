import { 
  Component, 
  Input, 
  OnInit, 
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ContentChild,
  ElementRef,
  AfterContentInit
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges, AfterContentInit {

  @Input('srvElement') element: any = {}
  @ContentChild('contentParagraph') paragraph!: ElementRef;

  constructor() { 
    console.log('constructor called!')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!', changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
  }

  ngAfterContentInit() {
    console.log('@ContentChild', this.paragraph);
  }

}
