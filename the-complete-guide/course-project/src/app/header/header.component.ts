import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {

  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
}
