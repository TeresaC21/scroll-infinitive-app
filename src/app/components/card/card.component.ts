import { Component, OnInit } from "@angular/core";
import * as faker from "faker";

interface Entry {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  assigness: string;
  workflow: string;
}

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  numOfEntries: number = 10;
  entries: Entry[] = [];
  showLoading = false;
  constructor() {}

  // Simulated data with a promise and the function addItems()
  addItems(startIndex: number, endIndex: number) {
    for (let i = startIndex; i < endIndex; i++) {
      this.entries.push({
        id: i + 1,
        title: faker.company.catchPhrase(),
        author: faker.name.firstName(),
        imageUrl: faker.image.image(),
        assigness: faker.company.companySuffix(),
        workflow: faker.company.catchPhraseNoun(),
      });
    }
  }

  fakeFetch = (): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = this.numOfEntries;
        this.numOfEntries += 10;
        this.addItems(startIndex, this.numOfEntries);
        resolve();
      }, 1000);
    });

  ngOnInit() {
    this.addItems(0, this.numOfEntries);
  }

  // ng infinite scroll function
  async onScrollDown() {
    console.log("Scroll down");

    this.showLoading = true;
    await this.fakeFetch();
    this.showLoading = false;
  }
}
