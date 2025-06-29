import { Component, OnInit } from "@angular/core";
import { DataService } from "../shared/data.service";

@Component({
  selector: "Browse",
  templateUrl: "./browse.component.html",
})
export class BrowseComponent {
  constructor(private _itemService: DataService) {}
  redLight = true;
  greenLight = false;
  isRunning = false;
  showClickText = true;

  private startTime: number = 0;
  reactionTimeMs: number | null = null;

  startSequence() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.redLight = true;
    this.greenLight = false;
    this.showClickText = true;
    this.reactionTimeMs = null;

    const delay = (Math.floor(Math.random() * 10) + 1) * 1000;

    setTimeout(() => {
      this.redLight = false;
      this.greenLight = true;
      this.isRunning = false;

      // Tallennetaan vihreän valon syttymishetki
      this.startTime = Date.now();
    }, delay);
  }

  handleClick() {
    if (this.greenLight && this.showClickText) {
      const endTime = Date.now();
      this.reactionTimeMs = endTime - this.startTime;
      this._itemService.postTime(this.reactionTimeMs);
    }

    this.showClickText = false;
  }
}
