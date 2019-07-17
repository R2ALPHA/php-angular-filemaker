import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent implements OnInit {

  people;
  constructor() {
    this.people = Array(100)
    .fill(1)
    .map(_=> {
      return {
        // name: faker.name.findName(),
        // bio:faker.hacker.phrase(),
      }
    })

  }
   ngOnInit() {
  }
}
