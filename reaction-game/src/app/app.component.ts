import { Component, OnInit } from "@angular/core";
import { firebase } from "@nativescript/firebase-core";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase()
      .initializeApp()
      .then(() => {
        console.log("Firebase initialized!");
      })
      .catch((err) => {
        console.error("Firebase init error:", err);
      });
  }
}
