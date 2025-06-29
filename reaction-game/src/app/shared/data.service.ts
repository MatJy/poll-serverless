import { Injectable } from "@angular/core";
import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-firestore";

export interface DataItem {
  time: number;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  db = firebase().firestore();

  getTimes(callback: (items: DataItem[]) => void): void {
    this.db
      .collection("times")
      .orderBy("time", "asc") // voit muuttaa lajittelua
      .onSnapshot((snapshot) => {
        const times: DataItem[] = [];
        snapshot.forEach((doc) => {
          times.push(doc.data() as DataItem);
        });
        callback(times);
      });
  }

  postTime(time): void {
    this.db
      .collection("times")
      .add({
        time: time,
      })
      .then(() => {
        console.log("Time added!");
      });
  }

  async deleteTimes(): Promise<void> {
    try {
      const usersQuerySnapshot = await this.db.collection("times").get();

      // Luodaan batch operaatio
      const batch = this.db.batch();

      // Käydään läpi kaikki dokumentit ja lisätään poistaminen batchiin
      usersQuerySnapshot.forEach((documentSnapshot) => {
        batch.delete(documentSnapshot.ref);
      });

      // Suoritetaan batchin toimenpiteet
      await batch.commit();
      console.log("All documents deleted successfully.");
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  }
}
