import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {

  title: string;
  difficulty: string;
  description: string;
  status: string;

  constructor() { }

  ngOnInit(): void {
  }

  addBug() {
    // ADD FUNCTIONALITY TO THE PROJECTS SERVICE TO SEND THIS INFO TO THE DB
    console.log(this.title);
    console.log(this.difficulty);
    console.log(this.description);
    console.log(this.status);
    
    // Clear input data after new bug is added
    this.title = '';
    this.difficulty = ''; // may need to set options to ull
    this.description = '';
    this.status = '';
    

  }
}
