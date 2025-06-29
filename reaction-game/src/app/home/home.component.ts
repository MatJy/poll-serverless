import { Component, OnInit } from "@angular/core";

import { DataService, DataItem } from "../shared/data.service";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  times: DataItem[] = [];

  constructor(private _itemService: DataService) {}

  ngOnInit(): void {
    this._itemService.getTimes((data) => {
      this.times = data;
    });
  }

  deleteTimes() {
    this._itemService.deleteTimes();
  }
}
